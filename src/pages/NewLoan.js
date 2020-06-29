import Clipboard from '@react-native-community/clipboard';
import {Button, Input} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AppLayout from '../components/AppLayout/AppLayout';
import {BottomContainer} from '../components/Page';
import {updatePage} from '../store/navigation/actions';
import {StyleSheet, View} from 'react-native';
import BigNumber from 'bignumber.js';
import {dpUI} from '../utils/coinFormatter';
import {newLoan} from '../store/history/actions';
import {getMatchedFunds} from '../store/loan/actions';

const NewLoanContainer = ({asset}) => {
  const dispatch = useDispatch();

  const collateral = 'BTC';

  const [amount, setAmount] = useState(25);
  const [collateralAmount, setCollateralAmount] = useState(0);
  const [lengthInDays, setLengthInDays] = useState(0);

  const handleBack = () => {
    dispatch(updatePage({page: 'ASSET', pageProps: {asset}}));
  };

  useEffect(() => {
    setCollateralAmount(
      dpUI(
        BigNumber(amount)
          .times(2.2)
          .div(9000),
        collateral,
      ).toNumber(),
    );
  }, [amount]);

  const newLoan = async () => {
    const matchedAgents = await dispatch({
      action: 'getMatchedFunds',
      payload: {
        asset: asset,
        collateral: collateral,
        amount: amount,
        length: lengthInDays * 86400,
      },
    });

    // const await dispatch({
    //   action: 'newLoan',
    //   payload: {}
    // })
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Input
          value={amount}
          label={`Receive ${asset}`}
          placeholder={`25 ${asset}`}
          keyboardType="numeric"
          caption={`Minimum: 25 ${asset}`}
          onChangeText={nextValue => setAmount(nextValue)}
        />
        <Input
          value={collateralAmount}
          label="Collateralize BTC"
          keyboardType="numeric"
          disabled
          placeholder={`${collateralAmount} ${collateral}`}
        />
        <Input
          value={lengthInDays}
          label="Loan length"
          keyboardType="numeric"
          placeholder="Days"
          onChangeText={nextValue => setLengthInDays(nextValue)}
        />
      </View>
      <View style={styles.footer}>
        <Button onPress={handleBack} style={styles.button}>
          Back
        </Button>
        <Button
          onPress={() => {
            newLoan();
          }}
          style={styles.button}>
          New Loan
        </Button>
      </View>
    </View>
  );
};

const NewLoan = props => {
  return (
    <AppLayout>
      <NewLoanContainer {...props} />
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 4,
    flex: 1,
  },
});

export default NewLoan;
