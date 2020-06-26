import {Button, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../store/navigation/actions';
import AppLayout from '../components/AppLayout/AppLayout';
import {BottomContainer, TopContainer} from '../components/Page';
import SeedPhraseTable from '../components/SeedPhraseTable';
import commonStyles from '../style/common';

const SeedPhraseTopContainer = () => {
  return (
    <TopContainer>
      <View>
        <Text style={commonStyles.mainTitle}>Backup your seed phrase</Text>
      </View>
    </TopContainer>
  );
};

const SeedPhraseBottomContainer = () => {
  const dispatch = useDispatch();
  const mnemonic = useSelector(({wallet}) => wallet.mnemonic);

  const handleContinue = () => {
    dispatch(updatePage('HOME'));
  };

  const handleBack = () => {
    dispatch(updatePage('ONBOARDING'));
  };

  return (
    <BottomContainer>
      <SeedPhraseTable mnemonic={mnemonic} />
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button
          appearance="outline"
          style={{marginTop: 8, flex: 0.45}}
          onPress={handleBack}>
          Back
        </Button>
        <Button style={{marginTop: 8, flex: 0.45}} onPress={handleContinue}>
          Continue
        </Button>
      </View>
    </BottomContainer>
  );
};

const SeedPhrase = () => {
  return (
    <AppLayout>
      <SeedPhraseTopContainer />
      <SeedPhraseBottomContainer />
    </AppLayout>
  );
};

export default SeedPhrase;
