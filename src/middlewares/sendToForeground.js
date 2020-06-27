import {batch} from 'react-redux';
import {postMessage} from '../../background';

const sendToForeground = ({dispatch, getState}) => next => action => {
  if (typeof action !== 'function') {
    postMessage({type: 'REDUCE', payload: action});
  }
  next(action);
};

export default sendToForeground;
