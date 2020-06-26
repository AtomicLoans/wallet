import {Button, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../store/navigation/actions';
import AppLayout from '../components/AppLayout/AppLayout';
import {BottomContainer, TopContainer} from '../components/Page';
import SeedPhraseTable from '../components/SeedPhraseTable';
import commonStyles from '../style/common';
import AssetButton from '../components/AssetButton';
import useGetters from '../hooks/useGetters';
import {updateBalances} from '../store/balances/actions';

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
  const getters = useGetters();

  const balance = useSelector(state => state.balances.ETH);

  const handlePress = () => {
    dispatch(updatePage('ONBOARDING'));
  };

  useEffect(() => {
    console.log('updating balance');
    dispatch(updateBalances()).then(s => console.log(s));
  }, [dispatch]);

  return (
    <BottomContainer>
      <AssetButton />
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button
          appearance="outline"
          style={{marginTop: 8, flex: 0.45}}
          onPress={handlePress}>
          Back {balance}
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