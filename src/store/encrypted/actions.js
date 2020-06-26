import * as Keychain from 'react-native-keychain';
import {generateMnemonic} from 'bip39';
import {updateMnemonic} from '../wallet/actions';

const AUTH_OPTIONS = {
  accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
  accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  authenticationPrompt: {title: 'Access encrypted wallet'},
  authenticateType: Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
};

export function getMnemonic() {
  return async function(dispatch, getState, getters) {
    try {
      // const client = getters.client('ETH');
      // console.log(client);
      const savedMnemonic = await Keychain.getGenericPassword(AUTH_OPTIONS);
      console.log(await Keychain.getSupportedBiometryType());
      // await Keychain.resetGenericPassword();

      if (savedMnemonic) {
        return dispatch(updateMnemonic(savedMnemonic.password));
      } else {
        const mnemonic = generateMnemonic();
        await Keychain.setGenericPassword('mnemonic', mnemonic, AUTH_OPTIONS);

        return dispatch(updateMnemonic(mnemonic));
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}
