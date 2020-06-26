import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Logo from '../Logo/Logo';
import colors from '../../style/colors';
import {Button, Icon} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';

const AppLayout = ({children}) => {
  let topContainer, bottomContainer;

  const dispatch = useDispatch();
  const page = useSelector(({navigation}) => navigation.page);

  if (Array.isArray(children)) {
    [topContainer, bottomContainer] = children;
  } else {
    bottomContainer = children;
  }

  return (
    <LinearGradient colors={['#21282F', '#522166']} style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.safeAreaView, {flex: topContainer ? 1 : 0}]}>
        <View style={styles.safeArea}>
          <View style={styles.logoContainer}>
            {page === 'HOME' && (
              <Button
                appearance="outline"
                size="small"
                onPress={() =>
                  dispatch({
                    action: 'updatePage',
                    payload: {page: 'SEED_PHRASE'},
                  })
                }
                style={{marginLeft: 20}}
                accessoryLeft={props => (
                  <Icon {...props} name="shield-outline" />
                )}
              />
            )}

            <View style={styles.logo}>
              <Logo />
            </View>
          </View>
          <View style={styles.mainContainer}>{topContainer}</View>
        </View>
      </SafeAreaView>
      <View style={[styles.bottomContainer, {flex: topContainer ? 0 : 1}]}>
        {bottomContainer}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    height: 20,
  },
  logo: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  safeAreaView: {
    flex: 1,
  },
  safeArea: {
    // justifyContent: 'space-between',
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: colors.background,
    borderTopColor: '#404040',
    borderLeftColor: colors.background,
    borderRightColor: colors.background,
    borderBottomColor: colors.background,
    justifyContent: 'center',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    // flex: 1,
    paddingBottom: 40,
  },
});

export default AppLayout;
