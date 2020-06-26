import {getReducerFunction} from '../getReducerFunction';

const initialState = {};

function updateUnusedAddress(state, {asset, address}) {
  return {
    ...state,
    [asset]: address,
  };
}

const reducers = {
  UPDATE_UNUSED_ADDRESS: updateUnusedAddress,
};

const addressesReducer = getReducerFunction(reducers, initialState);

export default addressesReducer;
