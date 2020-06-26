import React from 'react';

import BTC from '../../assets/bitcoin.png';
import ETH from '../../assets/eth.png';
import USDC from '../../assets/usdc.png';
import DAI from '../../assets/dai.png';

import {Image, StyleSheet} from 'react-native';

const imageMap = {
  BTC,
  ETH,
  USDC,
  DAI,
};

const styles = StyleSheet.create({
  default: {
    width: 32,
    height: 32,
  },
});

const AssetIcon = ({asset, style, ...props}) => {
  return (
    <Image
      style={[styles.default, style]}
      {...props}
      source={imageMap[asset]}
    />
  );
};

export default AssetIcon;
