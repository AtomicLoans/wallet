import {getReducerFunction} from '../getReducerFunction';

const initialState = {
  page: 'ONBOARDING',
};

function updatePage(state, {page, pageProps}) {
  return {
    ...state,
    page,
    pageProps,
  };
}

const reducers = {
  UPDATE_PAGE: updatePage,
};

const navigationReducer = getReducerFunction(reducers, initialState);

export default navigationReducer;
