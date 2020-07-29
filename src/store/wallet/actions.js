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
    const updatedBalances = dispatch(updateBalances());
    return [loadMnemonic];
  };
}

export function updateMnemonic(mnemonic) {
  return {
    type: 'UPDATE_MNEMONIC',
    mnemonic,
  };
}
