import {getMnemonic} from '../encrypted/actions';
import {updateBalances} from '../balances/actions';

export function unlockWallet() {
  return async function(dispatch, getState, getters) {
    const {network} = getState();
    const loadMnemonic = dispatch(getMnemonic());

    getters.client(network, 'BTC');

    const updatedBalances = dispatch(updateBalances());
    return [loadMnemonic, updatedBalances];
  };
}

export function updateMnemonic(mnemonic) {
  return {
    type: 'UPDATE_MNEMONIC',
    mnemonic,
  };
}
