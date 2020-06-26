/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {generateMnemonic} from 'bip39';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import createClient from './chain/client';
import {animate} from './style/animation.js';
import colors from './style/colors';
import theme from './style/theme';
import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import AppRouter from './components/AppRouter/AppRouter';
import {store} from './store/configureStore';
import LoadedGate from './components/LoadedGate';

import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <LoadedGate>
          <AppRouter />
        </LoadedGate>
      </ApplicationProvider>

      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
