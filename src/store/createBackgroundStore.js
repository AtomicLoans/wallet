import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import createRootReducer from './reducer';
import thunkWithGetters from '../middlewares/thunkWithGetters';
import sendToForeground from '../middlewares/sendToForeground';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation', 'wallet'],
};

const rootReducer = createRootReducer();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(sendToForeground, thunkWithGetters),
);

export {store};
// store.subscribe(() => console.log('dispatched', store.getState()));

// export {store, persistor};
