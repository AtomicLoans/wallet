import {updateAnimating} from './animating/actions';
import {updateBalances, updateBalance} from './balances/actions';
import {updateMnemonic} from './wallet/actions';
import {updatePage} from './navigation/actions';
import {updateNetwork} from './network/actions';
import {getMnemonic} from './encrypted/actions';

const actions = {
  updateAnimating,
  updateBalances,
  updateMnemonic,
  updateBalance,
  updatePage,
  updateNetwork,
  getMnemonic,
};

export default actions;
