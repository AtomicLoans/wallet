export function getReducerFunction(reducerMap, initialState, fallbackFunction) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    if (reducer) {
      return reducer(state, action);
    }
    return fallbackFunction ? fallbackFunction(state, action) : state;
  };
}
