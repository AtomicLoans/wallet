const {default: colors} = require('./colors');
const {StyleSheet} = require('react-native');

const commonStyles = StyleSheet.create({
  logoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollView: {},
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {},
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
  primaryText: {
    color: colors.primary,
  },
  secondaryText: {
    color: colors.secondary,
  },
  bitcoinLockContainer: {
    marginTop: 32,
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
    padding: 40,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default commonStyles;
