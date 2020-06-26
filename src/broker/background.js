import {self} from 'react-native-threads';
import 'node-libs-react-native/globals';
import 'crypto';

import '../globals.js';
import '../shim.js';
import {store} from '../store/createBackgroundStore.js';
import actions from '../store/actions.js';
// import {buildStore} from '../store/configureStore.js';
// const store = buildStore(true);

const postMessage = (id, payload) => {
  self.postMessage(JSON.stringify({id, payload}));
};

self.onmessage = async _msg => {
  const {id, type, data} = JSON.parse(_msg);
  console.log(_msg);

  switch (type) {
    case 'ACTION_REQUEST':
      const {action, payload} = data;
      console.log(action, payload);
      try {
        const result = await store.dispatch(actions[action]({...payload}));
        postMessage(id, {result});
      } catch (error) {
        postMessage(id, {result: {error}});
      }

      break;
    case 'REHYDRATE_STATE':
      const state = store.getState();
      postMessage(id, state);
      break;
  }
  console.log('onInternalMessage', {id, type, data});
};

// send a message, strings only
