import {getReducerFunction} from '../getReducerFunction';

const initialState = false;

function updateAnimating(state, {animating}) {
  return animating;
}

const reducers = {
  UPDATE_ANIMATING: updateAnimating,
};

const animatingReducer = getReducerFunction(reducers, initialState);

export default animatingReducer;
