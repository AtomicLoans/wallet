/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
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

const App = () => {
  const [height, setHeight] = useState(200);
  const [mnemonic, setMnemonic] = useState(null);

  useEffect(() => {
    (async () => {
      return;
      const clients = createClient(
        'testnet',
        'oval group game ghost tag unfold situate soccer donor toward asset accuse',
      );
      try {
        const addresses = await clients.BTC.wallet.getUsedAddresses();
        const balance = (await clients.BTC.chain.getBalance(
          addresses,
        )).toNumber();

        const ethAddresses = await clients.ETH.wallet.getUsedAddresses();
        const ethBalance = (await clients.ETH.chain.getBalance(
          ethAddresses,
        )).toNumber();

        const web3 = clients.ETH.web3;

        console.log(
          await web3.eth.getBalance(web3.eth.accounts.wallet[0].address),
        );
        console.log(ethBalance);

        console.log(balance);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handlePress = () => {
    animate();
    if (height === 400) {
      setHeight(200);
    } else {
      setHeight(400);
      setMnemonic(generateMnemonic());
    }
  };

  return (
    <Provider store={store}>
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
