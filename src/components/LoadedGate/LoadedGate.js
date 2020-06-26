import React from 'react';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';
import {Spinner} from '@ui-kitten/components';

const LoadedGate = ({children}) => {
  const initialized = useSelector(state => state.initialized);

  if (!initialized) return <Spinner />;
  return <>{children}</>;
};

export default LoadedGate;
