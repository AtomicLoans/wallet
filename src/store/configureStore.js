import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation', 'wallet'],
};

import createRootReducer from '../reducers';
import thunkWithGetters from '../middlewares/thunkWithGetters';

const rootReducer = createRootReducer();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunkWithGetters));
store.subscribe(() => console.log('dispatched', store.getState()));
const persistor = persistStore(store);

export {store, persistor};
