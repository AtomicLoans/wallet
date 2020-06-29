import {Button, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../store/navigation/actions';
import AppLayout from '../components/AppLayout/AppLayout';
import BitcoinLock from '../components/BitcoinLock/BitcoinLock';
import {BottomContainer, TopContainer} from '../components/Page';
import commonStyles from '../style/common';

const OnboardingBottomContainer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const hasEncryptedWallet = useSelector(
    ({encrypted}) => encrypted.encryptedWallet,
  );

  const handlePress = async () => {
    setLoading(true);

    await dispatch({action: 'unlockWallet'})
      .then(() => {
        if (hasEncryptedWallet) {
          dispatch(updatePage({page: 'HOME', pageProps: {firstLoad: true}}));
        } else {
          dispatch(updatePage({page: 'SEED_PHRASE'}));
        }
      })
      .catch(e => {
        console.log('FAILED!!', JSON.stringify(e));
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
