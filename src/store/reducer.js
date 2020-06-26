import {combineReducers} from 'redux';
import navigation from './navigation/reducers';
import wallet from './wallet/reducers';
import encrypted from './encrypted/reducers';
import balances from './balances/reducers';
import network from './network/reducers';
import animating from './animating/reducers';

export default function createRootReducer() {
  return combineReducers({
    navigation,
    wallet,
    encrypted,
    balances,
    network,
    animating,
  });
}
