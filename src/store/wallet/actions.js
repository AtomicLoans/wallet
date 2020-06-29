import {getMnemonic} from '../encrypted/actions';
import {updateBalances} from '../balances/actions';

export function initWallet() {
  return function(dispatch, getState, getters) {
    const {network} = getState();

    getters.client(network, 'BTC');
  };
}

export function unlockWallet() {
  return async function(dispatch, getState, getters) {
    const {network} = getState();
    const loadMnemonic = await dispatch(getMnemonic());
    dispatch(initWallet());

    return [loadMnemonic];
  };
}

export function updateMnemonic(mnemonic) {
  return {
    type: 'UPDATE_MNEMONIC',
    mnemonic,
  };
}
