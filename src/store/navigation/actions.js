import {updateAnimating} from '../animating/actions';

export function updatePage({page}) {
  return function(dispatch) {
    return [
      dispatch(updateAnimating(true)),
      dispatch({
        type: 'UPDATE_PAGE',
        page,
      }),
    ];
  };
}
