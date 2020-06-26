import {getReducerFunction} from '../getReducerFunction';

const initialState = {
  page: 'ONBOARDING',
};

function updatePage(state, action) {
  return {
    ...state,
    page: action.page,
  };
}

const reducers = {
  UPDATE_PAGE: updatePage,
};

const navigationReducer = getReducerFunction(reducers, initialState);

export default navigationReducer;
