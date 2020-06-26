import {updateAnimating} from '../animating/actions';

export function updatePage({page, pageProps}) {
  return function(dispatch) {
    return [
      dispatch(updateAnimating(true)),
      dispatch({
        type: 'UPDATE_PAGE',
        page,
        pageProps,
      }),
    ];
  };
}
