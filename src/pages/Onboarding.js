import React from 'react';
import AppLayout from '../components/AppLayout/AppLayout';
import Page, {TopContainer, BottomContainer} from '../components/Page';
import {View} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import commonStyles from '../style/common';
import BitcoinLock from '../components/BitcoinLock/BitcoinLock';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../actions/navigation';
import {animate} from '../style/animation';

import {generateMnemonic} from 'bip39';
import {updateMnemonic} from '../actions/wallet';

const OnboardingBottomContainer = () => {
  const dispatch = useDispatch();
  const mnemonic = useSelector(({wallet}) => wallet.mnemonic);

  const handlePress = async () => {
    console.log('pressed');
    dispatch(updatePage('SEED_PHRASE'));
    if (!mnemonic) {
      dispatch(updateMnemonic(generateMnemonic()));
    }
  };

  return (
    <BottomContainer>
      <Button onPress={handlePress}>Get Started</Button>
      <Text style={{textAlign: 'center', marginTop: 16}}>
        Restore seed phrase
      </Text>
    </BottomContainer>
  );
};

const OnboardingTopContainer = () => {
  return (
    <TopContainer>
      <View>
        <Text style={commonStyles.mainTitle}>
          Lock{' '}
          <Text style={[commonStyles.mainTitle, commonStyles.primaryText]}>
            Bitcoin.
          </Text>
        </Text>
        <Text style={commonStyles.mainTitle}>
          Unlock{' '}
          <Text style={[commonStyles.mainTitle, commonStyles.secondaryText]}>
            liquidity.
          </Text>
        </Text>
      </View>

      <View style={commonStyles.bitcoinLockContainer}>
        <BitcoinLock />
      </View>
    </TopContainer>
  );
};

const Onboarding = () => {
  return (
    <AppLayout>
      <OnboardingTopContainer />
      <OnboardingBottomContainer />
    </AppLayout>
  );
};

export default Onboarding;

// <LinearGradient colors={['#21282F', '#522166']} style={styles.root}>
// <StatusBar barStyle="light-content" />
// <SafeAreaView style={styles.safeAreaView}>
//   <View style={styles.safeArea}>
//     <View style={styles.logoContainer}>
//       <Logo style={styles.logo} />
//     </View>

//     <View style={styles.mainContainer}>
//       {height === 200 ? (
//         <>

//         </>
//       ) : (
//         <>
//           <Text style={styles.mainTitle}>
//             Backup your seed phrase:
//           </Text>
//           <Text>{mnemonic}</Text>
//         </>
//       )}
//     </View>
//   </View>
// </SafeAreaView>
// <View style={{...styles.bottomContainer, height}}>
// </View>
// </LinearGradient>
