import {getReducerFunction} from '../getReducerFunction';

const initialState = [];

function newLoan(state, {loan}) {
  return [...state, loan];
}

function updateHistory(state, {id, updates}) {
  return state.map((item, index) => {
    if (item.id === id) {
      return {...item, ...updates};
    }

    return item;
  });
}

const reducers = {
  UPDATE_HISTORY: updateHistory,
  NEW_LOAN: newLoan,
};

const historyReducer = getReducerFunction(reducers, initialState);

export default historyReducer;
