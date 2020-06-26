import {bgEmitter, postMessage} from '../broker/foreground';

const sendToBackground = ({dispatch, getState}) => next => action => {
  const {initialized} = getState();

  console.log('ACTION', action);

  if (!initialized || !action.action) {
    return new Promise((resolve, reject) => {
      resolve(next(action));
    });
  }

  return new Promise((resolve, reject) => {
    const id = `${Date.now()}.${Math.random()}`;

    console.log(`SENDING ${action.action} ACTION REQUESTS TO BG NOW`);

    bgEmitter.once(id, ({result}) => {
      console.log('RESULT FROM BG', result);
      if (Array.isArray(result)) {
        resolve(result.map(r => next(r)));
      } else {
        resolve(next(result));
      }
    });

    postMessage({
      id,
      type: 'ACTION_REQUEST',
      data: {action: action.action, payload: action.payload},
    });
  });
};

export default sendToBackground;
