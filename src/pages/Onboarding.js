import {Button, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getMnemonic} from '../store/encrypted/actions';
import {updatePage} from '../store/navigation/actions';
import AppLayout from '../components/AppLayout/AppLayout';
import BitcoinLock from '../components/BitcoinLock/BitcoinLock';
import {BottomContainer, TopContainer} from '../components/Page';
import commonStyles from '../style/common';

const OnboardingBottomContainer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    setLoading(true);

    await dispatch(getMnemonic())
      .then(() => {
        dispatch(updatePage('SEED_PHRASE'));
      })
      .catch(e => {
        console.warn('Failed');
        setLoading(false);
      });
  };

  return (
    <BottomContainer>
      <Button disabled={loading} onPress={handlePress}>
        Get Started
      </Button>
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
