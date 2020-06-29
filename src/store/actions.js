import {updateAnimating} from './animating/actions';
import {updateBalances, updateBalance} from './balances/actions';
import {updateMnemonic, unlockWallet} from './wallet/actions';
import {updatePage} from './navigation/actions';
import {updateNetwork} from './network/actions';
import {getMnemonic} from './encrypted/actions';
import {updateUnusedAddress} from './addresses/actions';
import {createLoan, updateHistory} from './history/actions';
import {getMatchedFunds} from './loan/actions';

const actions = {
  updateAnimating,
  updateBalances,
  updateMnemonic,
  updateBalance,
  updatePage,
  updateNetwork,
  getMnemonic,
  updateUnusedAddress,
  unlockWallet,
  getMatchedFunds,
  createLoan,
  updateHistory,
};

export default actions;
