import {Thread} from 'react-native-threads';
import EventEmitter from 'events';

const thread = new Thread('src/broker/background.js');
const bgEmitter = new EventEmitter();

thread.onmessage = msg => {
  const {id, payload} = JSON.parse(msg);
  bgEmitter.emit(id, payload);
};

const postMessage = message => {
  thread.postMessage(JSON.stringify(message));
};

export {bgEmitter, postMessage};
