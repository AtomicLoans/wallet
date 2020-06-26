import {combineReducers} from 'redux';
import navigation from './navigation/reducers';
import wallet from './wallet/reducers';
import encrypted from './encrypted/reducers';
import balances from './balances/reducers';
import network from './network/reducers';
import animating from './animating/reducers';
import initialized from './initialized/reducers';
import loading from './loading/reducers';

export default function createRootReducer() {
  return combineReducers({
    navigation,
    wallet,
    encrypted,
    balances,
    network,
    animating,
    initialized,
    loading,
  });
}

export function createRehydrateReducer() {
  return state => {
    console.log('YO', state);
    if (!state) return {};
    return state;
  };
}
