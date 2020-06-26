import {getReducerFunction} from '../getReducerFunction';

const initialState = {
  encryptedWallet: {},
};

function updateEncryptedWallet(state, {encryptedWallet}) {
  return {
    ...state,
    encryptedWallet,
  };
}

const reducers = {
  UPDATE_ENCRYPTED_WALLET: updateEncryptedWallet,
};

const encryptedReducer = getReducerFunction(reducers, initialState);

export default encryptedReducer;
