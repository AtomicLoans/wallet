import {Thread} from 'react-native-threads';
import EventEmitter from 'events';

const thread = new Thread('background.js');
const bgEmitter = new EventEmitter();

const postMessage = message => {
  thread.postMessage(JSON.stringify(message));
};

thread.onmessage = msg => {
  const {id, type, payload} = JSON.parse(msg);
  switch (type) {
    case 'ACTION_RESPONSE':
      bgEmitter.emit(id, payload);
      break;

    case 'REHYDRATE_STATE':
      bgEmitter.emit(id, payload);
      break;

    case 'REDUCE':
      bgEmitter.emit('REDUCE', payload);
  }
};

export {bgEmitter, postMessage};
