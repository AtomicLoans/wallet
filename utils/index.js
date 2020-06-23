import {mnemonicToSeedSync} from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';

export const generateAddressesFromSeed = (seed, count = 1) => {
  const hdWallet = hdkey.fromMasterSeed(mnemonicToSeedSync(seed));
  const walletHdpath = "m/44'/60'/0'/";

  const accounts = [];
  for (let i = 0; i < count; i++) {
    const wallet = hdWallet.derivePath(walletHdpath + `0/${i}`).getWallet();
    const address = '0x' + wallet.getAddress().toString('hex');
    const privateKey = wallet.getPrivateKey().toString('hex');
    accounts.push({address: address, privateKey: privateKey});
  }

  return count === 1 ? accounts[0] : accounts;
};
