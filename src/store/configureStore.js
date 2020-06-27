import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import createRootReducer, {createRehydrateReducer} from './reducer';
import thunkWithGetters from '../middlewares/thunkWithGetters';
import sendToBackground from '../middlewares/sendToBackground';
import {postMessage, bgEmitter} from '../broker/foreground';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation', 'wallet'],
};

const store = createStore((state, action) => {
  if (!state) return {};
  return {...action.newStore, initialized: true};
}, applyMiddleware(sendToBackground));

const rehydrateStore = () => {
  const id = `${Date.now()}.${Math.random()}`;

  bgEmitter.once(id, newStore => {
    store.dispatch({type: 'REHYDRATE', newStore}).then(() => {
      store.replaceReducer(createRootReducer());

      bgEmitter.on('REDUCE', action => {
        store.dispatch(action);
      });
    });
  });

  postMessage({
    id,
    type: 'REHYDRATE_STATE',
  });
};

rehydrateStore();

export {store};
store.subscribe(() => console.log('dispatched', store.getState()));
