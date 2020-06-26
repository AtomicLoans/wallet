import {getReducerFunction} from '../getReducerFunction';

const initialState = false;

function updateInitialized(state, {initialized}) {
  return initialized;
}

const reducers = {
  UPDATE_INITIALIZED: updateInitialized,
};

const initializedReducer = getReducerFunction(reducers, initialState);

export default initializedReducer;
