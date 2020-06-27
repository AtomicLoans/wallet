import {self} from 'react-native-threads';
import 'node-libs-react-native/globals';
import 'crypto';

import './src/globals.js';
import './src/shim.js';
import {store} from './src/store/createBackgroundStore.js';
import actions from './src/store/actions.js';
import {persistStore} from 'redux-persist';

export const postMessage = data => {
  self.postMessage(JSON.stringify({...data}));
};

self.onmessage = async _msg => {
  const {id, type, data} = JSON.parse(_msg);

  switch (type) {
    case 'ACTION_REQUEST':
      const {action, payload} = data;
      try {
        const result =
          (await store.dispatch(actions[action]({...payload}))) || {};
        postMessage({id, type: 'ACTION_RESPONSE', payload: {result}});
      } catch (error) {
        postMessage({id, type: 'ACTION_RESPONSE', payload: {result: {error}}});
      }
      break;

    case 'REHYDRATE_STATE':
      persistStore(store, {}, () => {
        const state = store.getState();
        postMessage({id, type: 'REHYDRATE_STATE', payload: state});
      });

      break;
  }
};
