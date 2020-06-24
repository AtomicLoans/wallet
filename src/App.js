/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './shim.js';
import 'crypto';

import 'node-libs-react-native/globals';
import LinearGradient from 'react-native-linear-gradient';
import './globals.js';

import React, {useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import createClient from './chain/client.js';
import colors from './style/colors.js';
import Logo from './components/Logo/Logo.js';
import BitcoinLock from './components/BitcoinLock/BitcoinLock.js';

const App: () => React$Node = () => {
  useEffect(() => {
    const clients = createClient(
      'testnet',
      'oval group game ghost tag unfold situate soccer donor toward asset accuse',
    );

    (async () => {
      try {
        const addresses = await clients.BTC.wallet.getUsedAddresses();
        const balance = (await clients.BTC.chain.getBalance(
          addresses,
        )).toNumber();

        clients.ETH.web3.eth
          .getBlock('latest')
          .then(console.log)
          .catch(console.log);

        console.log(balance);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <LinearGradient colors={['#21282F', '#522166']} style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.safeArea}>
          <View style={styles.logoContainer}>
            <Logo style={styles.logo} />
          </View>

          <View style={styles.mainContainer}>
            <View>
              <Text style={styles.mainTitle}>
                Lock <Text style={styles.primaryText}>Bitcoin.</Text>
              </Text>
              <Text style={styles.mainTitle}>
                Unlock <Text style={styles.secondaryText}>liquidity.</Text>
              </Text>
            </View>

            <View style={styles.bitcoinLockContainer}>
              <BitcoinLock />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.bottomContainer}>
        <BitcoinLock />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollView: {},
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {},
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  primaryText: {
    color: colors.primary,
  },
  secondaryText: {
    color: colors.secondary,
  },
  bitcoinLockContainer: {
    marginTop: 32,
  },
  safeAreaView: {
    flex: 1,
  },
  safeArea: {
    // justifyContent: 'space-between',
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: colors.background,
    borderTopColor: '#404040',
    borderLeftColor: colors.background,
    borderRightColor: colors.background,
    borderBottomColor: colors.background,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
