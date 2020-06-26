import {getReducerFunction} from '../getReducerFunction';

const initialState = false;

function updateLoading(state, {loading}) {
  return loading;
}

const reducers = {
  UPDATE_LOADING: updateLoading,
};

const loadingReducer = getReducerFunction(reducers, initialState);

export default loadingReducer;
