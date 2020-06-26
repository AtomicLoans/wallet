import React, {useState, useEffect} from 'react';
import QRCode from 'qrcode';

import {Button, Text} from '@ui-kitten/components';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../store/navigation/actions';
import AppLayout from '../components/AppLayout/AppLayout';
import {BottomContainer, TopContainer} from '../components/Page';
import SeedPhraseTable from '../components/SeedPhraseTable';
import commonStyles from '../style/common';
import {updateAnimating} from '../store/animating/actions';
import AssetIcon from '../components/AssetIcon';
import {prettyBalance, formatAddress} from '../utils/coinFormatter';
import {updateLoading} from '../store/loading/actions';
import {SvgXml} from 'react-native-svg';
import Clipboard from '@react-native-community/clipboard';

function getChainName(asset) {
  const map = {
    ETH: 'ethereum',
    BTC: 'bitcoin',
    USDC: 'ethereum',
    DAI: 'ethereum',
  };
  return map[asset];
}

const DepositTopContainer = ({asset}) => {
  const balance = useSelector(({balances}) => balances[asset]);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.loading);
  const network = useSelector(state => state.network);

  const [qrcode, setQrcode] = useState('');

  const address = useSelector(
    ({addresses}) => addresses[asset] && addresses[asset]._address,
  );

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      (async () => {
        dispatch(updateLoading(true));
        console.log('Dispatching update balances');

        await dispatch({action: 'updateUnusedAddress', payload: {asset}});
        dispatch(updateLoading(false));
      })();
    }
  }, [updated, dispatch, asset]);

  useEffect(() => {
    if (!address) return;
    const uri = [getChainName(asset), formatAddress(address, asset)].join(':');
    console.log(uri);
    QRCode.toString(
      uri,
      {
        type: 'svg',
        margin: 0,
      },
      (err, svg) => {
        if (err) return;
        setQrcode(svg);
        console.log(svg);
      },
    );
  }, [asset, address]);

  return (
    <TopContainer style={{alignItems: 'center'}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 40,
          // width: 200,

          // backgroundColor: 'blue',
        }}>
        {qrcode ? (
          <SvgXml xml={qrcode} width="300" height="300" />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      {address && (
        <Text category="label" style={{marginTop: 40}}>
          {formatAddress(address, asset)}
        </Text>
      )}
    </TopContainer>
  );
};

const DepositBottomContainer = ({asset}) => {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch({
      action: 'updatePage',
      payload: {page: 'ASSET', pageProps: {asset}},
    });
  };

  const address = useSelector(
    ({addresses}) => addresses[asset] && addresses[asset]._address,
  );

  return (
    <BottomContainer>
      <Button
        onPress={() => Clipboard.setString(address)}
        style={{marginTop: 16}}>
        Copy Address
      </Button>
      <Button onPress={handleBack} style={{marginTop: 16}}>
        Back
      </Button>
    </BottomContainer>
  );
};

const Deposit = props => {
  return (
    <AppLayout>
      <DepositTopContainer {...props} />
      <DepositBottomContainer {...props} />
    </AppLayout>
  );
};

export default Deposit;
