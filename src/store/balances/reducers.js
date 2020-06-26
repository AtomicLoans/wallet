import {getReducerFunction} from '../getReducerFunction';

const initialState = {};

function updateBalance(state, {asset, balance}) {
  return {
    ...state,
    [asset]: balance,
  };
}

const reducers = {
  UPDATE_BALANCE: updateBalance,
};

const balanceReducer = getReducerFunction(reducers, initialState);

export default balanceReducer;
