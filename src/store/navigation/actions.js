import {updateAnimating} from '../animating/actions';

export function updatePage({page, pageProps}) {
  return {
    type: 'UPDATE_PAGE',
    page,
    pageProps,
  };
}
