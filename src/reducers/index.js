import {combineReducers} from 'redux';
import navigation from './navigation';
import wallet from './wallet';
import encrypted from './encrypted';

export default function createRootReducer() {
  return combineReducers({navigation, wallet, encrypted});
}

/**
 * Generate a reducer function
 * @param {object} reducerMap Map of actionType -> actionHandler function
 * @param {object} initialState The initial state of the reducer
 * @param {Function} [fallbackFunction] An optional callback function to be called
 * when an actionHandler does not exist for this reducer
 */
export function getReducerFunction(reducerMap, initialState, fallbackFunction) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    if (reducer) {
      return reducer(state, action);
    }
    return fallbackFunction ? fallbackFunction(state, action) : state;
  };
}
