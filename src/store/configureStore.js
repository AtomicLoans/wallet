import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation'],
};

import thunk from 'redux-thunk';
import createRootReducer from '../reducers';

const rootReducer = createRootReducer();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
store.subscribe(() => console.log('dispatched', store.getState()));
const persistor = persistStore(store);

export {store, persistor};
