import {getReducerFunction} from '..';

const initialState = {
  mnemonic: '',
};

function updateMnemonic(state, {mnemonic}) {
  return {
    ...state,
    mnemonic,
  };
}

const reducers = {
  UPDATE_MNEMONIC: updateMnemonic,
};

const walletReducer = getReducerFunction(reducers, initialState);

export default walletReducer;
