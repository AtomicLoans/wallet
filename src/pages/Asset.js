import {Button, Text} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../store/navigation/actions';
import AppLayout from '../components/AppLayout/AppLayout';
import {BottomContainer, TopContainer} from '../components/Page';
import SeedPhraseTable from '../components/SeedPhraseTable';
import commonStyles from '../style/common';
import {updateAnimating} from '../store/animating/actions';
import AssetIcon from '../components/AssetIcon';
import {prettyBalance} from '../utils/coinFormatter';

const AssetTopContainer = ({asset}) => {
  const balance = useSelector(({balances}) => balances[asset]);
  return (
    <TopContainer>
      <View style={{alignItems: 'center'}}>
        <AssetIcon
          asset={asset}
          style={{width: 64, height: 64, marginBottom: 8}}
        />
        <Text category="h4">
          {prettyBalance(balance, asset)} {asset}
        </Text>
      </View>
    </TopContainer>
  );
};

const AssetBottomContainer = ({asset}) => {
  const dispatch = useDispatch();
  const mnemonic = useSelector(({wallet}) => wallet.mnemonic);

  const handleContinue = () => {
    dispatch(updatePage({page: 'HOME'}));
  };

  const handleBack = () => {
    dispatch(updatePage({page: 'HOME'}));
  };

  return (
    <BottomContainer>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button
          appearance="outline"
          style={styles.actionButton}
          size="small"
          onPress={() =>
            dispatch(updatePage({page: 'DEPOSIT', pageProps: {asset}}))
          }>
          Deposit
        </Button>
        <Button
          appearance="outline"
          style={styles.actionButton}
          size="small"
          onPress={handleContinue}>
          Send
        </Button>
        <Button
          appearance="outline"
          style={styles.actionButton}
          size="small"
          onPress={handleBack}>
          Swap
        </Button>
        <Button
          appearance="outline"
          style={styles.actionButton}
          size="small"
          onPress={handleBack}>
          Loan
        </Button>
      </View>
      <Button onPress={handleBack} style={{marginTop: 16}}>
        Back
      </Button>
    </BottomContainer>
  );
};

const Asset = props => {
  return (
    <AppLayout>
      <AssetTopContainer {...props} />
      <AssetBottomContainer {...props} />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginHorizontal: 4,
    flex: 1,
  },
});

export default Asset;
