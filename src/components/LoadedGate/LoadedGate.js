import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import {Spinner} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import {animate} from '../../style/animation';

const LoadedGate = ({children}) => {
  const initialized = useSelector(state => state.initialized);

  if (!initialized)
    return (
      <LinearGradient
        colors={['#21282F', '#522166']}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner />
      </LinearGradient>
    );
  return <>{children}</>;
};

export default LoadedGate;
