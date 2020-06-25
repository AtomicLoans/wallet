import {Button, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../actions/navigation';
import AppLayout from '../components/AppLayout/AppLayout';
import {BottomContainer, TopContainer} from '../components/Page';
import SeedPhraseTable from '../components/SeedPhraseTable';
import commonStyles from '../style/common';
import AssetButton from '../components/AssetButton';

const HomeTopContainer = () => {
  return (
    <TopContainer>
      <View>
        <Text style={commonStyles.mainTitle}>Welcome!</Text>
      </View>
    </TopContainer>
  );
};

const HomeBottomContainer = () => {
  const dispatch = useDispatch();
  const mnemonic = useSelector(({wallet}) => wallet.mnemonic);

  const handlePress = () => {
    dispatch(updatePage('ONBOARDING'));
  };

  return (
    <BottomContainer>
      <AssetButton />
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button
          appearance="outline"
          style={{marginTop: 8, flex: 0.45}}
          onPress={handlePress}>
          Back
        </Button>
        <Button style={{marginTop: 8, flex: 0.45}} onPress={handlePress}>
          Continue
        </Button>
      </View>
    </BottomContainer>
  );
};

const Home = () => {
  return (
    <AppLayout>
      <HomeTopContainer />
      <HomeBottomContainer />
    </AppLayout>
  );
};

export default Home;
