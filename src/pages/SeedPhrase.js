import React from 'react';
import AppLayout from '../components/AppLayout/AppLayout';
import Page, {TopContainer, BottomContainer} from '../components/Page';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import commonStyles from '../style/common';
import BitcoinLock from '../components/BitcoinLock/BitcoinLock';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../actions/navigation';
import SeedPhraseTable from '../components/SeedPhraseTable';

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

  const handlePress = () => {
    dispatch(updatePage('ONBOARDING'));
  };

  return (
    <BottomContainer>
      <SeedPhraseTable mnemonic={mnemonic} />
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

const SeedPhrase = () => {
  return (
    <AppLayout>
      <SeedPhraseTopContainer />
      <SeedPhraseBottomContainer />
    </AppLayout>
  );
};

export default SeedPhrase;

// <LinearGradient colors={['#21282F', '#522166']} style={styles.root}>
// <StatusBar barStyle="light-content" />
// <SafeAreaView style={styles.safeAreaView}>
//   <View style={styles.safeArea}>
//     <View style={styles.logoContainer}>
//       <Logo style={styles.logo} />
//     </View>

//     <View style={styles.mainContainer}>
//       {height === 200 ? (
//         <>

//         </>
//       ) : (
//         <>
//           <Text style={styles.mainTitle}>
//             Backup your seed phrase:
//           </Text>
//           <Text>{mnemonic}</Text>
//         </>
//       )}
//     </View>
//   </View>
// </SafeAreaView>
// <View style={{...styles.bottomContainer, height}}>
// </View>
// </LinearGradient>
