import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Card, Spinner} from '@ui-kitten/components';
import {getCoinName, prettyBalance} from '../../utils/coinFormatter';
import {useSelector} from 'react-redux';
import AssetIcon from '../AssetIcon';
import colors from '../../style/colors';

const AssetButton = ({asset, style, loading, ...props}) => {
  const balance = useSelector(({balances}) => balances[asset]);

  const Accent = props => {
    return <View style={{height: 4, backgroundColor: colors.assets[asset]}} />;
  };

  return (
    <Card {...props} accent={Accent} asset={asset} style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AssetIcon asset={asset} />
          <View style={{marginLeft: 16}}>
            <Text category="h4">{getCoinName(asset)}</Text>
          </View>
        </View>
        <View>
          {loading ? (
            <Spinner status="primary" />
          ) : (
            <Text category="h6">
              {prettyBalance(balance, asset)} {asset}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );
};

export default AssetButton;
