import {updateAnimating} from '../animating/actions';

export function updatePage(page) {
  return function(dispatch) {
    dispatch(updateAnimating(true));
    return dispatch({
      type: 'UPDATE_PAGE',
      page,
    });
  };
}
