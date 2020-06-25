import getters from '../store/getters';

function createThunkWithGettersMiddleware(extraArgument) {
  return ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, getters(getState()));
    }

    return next(action);
  };
}

const thunkWithGetters = createThunkWithGettersMiddleware();

export default thunkWithGetters;
