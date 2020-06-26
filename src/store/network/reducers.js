import {getReducerFunction} from '../getReducerFunction';

const initialState = 'testnet';

function updateNetwork(state, {network}) {
  return network;
}

const reducers = {
  UPDATE_NETWORK: updateNetwork,
};

const reducer = getReducerFunction(reducers, initialState);

export default reducer;
