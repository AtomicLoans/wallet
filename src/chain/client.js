import Client from '@liquality/client';
import LoanClient from '@atomicloans/loan-client';
import BitcoinCollateralProvider from '@atomicloans/bitcoin-collateral-provider';
import BitcoinCollateralSwapProvider from '@atomicloans/bitcoin-collateral-swap-provider';

import BitcoinSwapProvider from '@liquality/bitcoin-swap-provider';
import BitcoinJsWalletProvider from '@liquality/bitcoin-js-wallet-provider';
import BitcoinRpcProvider from '@liquality/bitcoin-rpc-provider';
import BitcoinEsploraApiProvider from '@liquality/bitcoin-esplora-api-provider';
import BitcoinEsploraSwapFindProvider from '@liquality/bitcoin-esplora-swap-find-provider';

import EthereumRpcProvider from '@liquality/ethereum-rpc-provider';
import EthereumJsWalletProvider from '@liquality/ethereum-js-wallet-provider';
import EthereumSwapProvider from '@liquality/ethereum-swap-provider';
import EthereumScraperSwapFindProvider from '@liquality/ethereum-scraper-swap-find-provider';

import EthereumErc20Provider from '@liquality/ethereum-erc20-provider';
import EthereumErc20SwapProvider from '@liquality/ethereum-erc20-swap-provider';
import EthereumErc20ScraperSwapFindProvider from '@liquality/ethereum-erc20-scraper-swap-find-provider';

import BitcoinNetworks from '@liquality/bitcoin-networks';
import EthereumNetworks from '@liquality/ethereum-networks';

// import fs from 'react-native-fs';
// import * as RNFS from 'react-native-fs';

// const fs = require('fs');

// import * as fs from 'fs'

// const FinanceClient = require('../../node_modules/@atomicfinance/client/dist')
// const BitcoinCfdProvider = require('../../node_modules/@atomicfinance/bitcoin-cfd-provider/dist')
// const BitcoinDlcProvider = require('../../node_modules/@atomicfinance/bitcoin-dlc-provider/dist')
// const BitcoinWalletProvider = require('../../node_modules/@atomicfinance/bitcoin-wallet-provider/dist')

// import FinanceClient from '../../node_modules/@atomicfinance/client/dist';
// import BitcoinCfdProvider from '../../node_modules/@atomicfinance/bitcoin-cfd-provider/dist';
// import BitcoinDlcProvider from '../../node_modules/@atomicfinance/bitcoin-dlc-provider/dist';
// import BitcoinWalletProvider from '../../node_modules/@atomicfinance/bitcoin-wallet-provider/dist';

import FinanceClient from '@atomicfinance/client/dist/client';
// import BitcoinCfdProvider from '@atomicfinance/bitcoin-cfd-provider/dist/bitcoin-cfd-provider';
// import BitcoinDlcProvider from '@atomicfinance/bitcoin-dlc-provider/dist/bitcoin-dlc-provider';
import BitcoinWalletProvider from '@atomicfinance/bitcoin-wallet-provider/dist/bitcoin-wallet-provider';

import WebAssembly from "webassemblyjs";

import { bip39Generate, bip39ToSeed, waitReady } from 'polkadot/wasm-crypto'

// function get(url) {
//   console.log('url', url)
//   return new Promise((accept, reject) => {
//       var req = new XMLHttpRequest();
//       req.open("GET", url, true);
//       req.responseType = "arraybuffer";

//       req.onload = function(event) {
//           var resp = req.response;
//           console.log('resp', resp)
//           if(resp) {
//               accept(resp);
//           }
//       };

//       req.send(null);
//   });
// }

// import * as example from './cfdjs_wasm.wasm';

console.log('test1')

(async () => {
  await waitReady();

  const phrase = bip39Generate(12);
 
  // get ed25519 seed from phrase
  const seed = bip39ToSeed(phrase, '');
 
  // display
  console.log('phrase:', phrase);
  console.log('seed:', u8aToHex(seed));

  // console.log(`fs.MainBundlePath.replace('wallet.app/', '')`, fs.MainBundlePath.replace('/wallet.app', ''))

  // RNFS.readDir(`${fs.MainBundlePath}`).then(files => {
  //   console.log('files', files)
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i]
  //     console.log('file', file)
  //     const tester = file.isDirectory()
  //     console.log('isDirectory', tester)
  //   }
  // })
  // .catch(err => {
  //   console.log(err.message, err.code);
  // });

  // console.log('fs.MainBundlePath', fs.MainBundlePath)
  // console.log('test1')
  // try {
  //   const buffer = fs.readFileSync(`${fs.MainBundlePath}/cfdjs_wasm.wasm`);
  //   console.log('buffer', buffer)

  //   // const wasm = await fetch(`${fs.MainBundlePath}/cfdjs_wasm.wasm`);
  //   console.log('test5')
  //   // console.log('wasm', wasm)
  //   // console.log('wasm._bodyInit._data.__collector', wasm._bodyBlob._data.__collector)

  //   // const response = await fetch(`${fs.MainBundlePath}/cfdjs_wasm.wasm`);
  //   // const buffer = await response.arrayBuffer();


  //   // const response = await fetch(`${fs.MainBundlePath}/cfdjs_wasm.wasm`)
  //   // const module = await WebAssembly.compileStreaming(response)


  //   // const buffer = await get(`${fs.MainBundlePath}/cfdjs_wasm.wasm`)
  //   // console.log('buffer', buffer)
  //   // const module = await WebAssembly.compile(buffer);
  //   // const instance = new WebAssembly.Instance(module);

  //   // console.log('instance', instance)

  //   // const response = await fetch('fibonacci.wasm');
  //   // const buffer = await response.arrayBuffer();
  //   // const module = await WebAssembly.compile(buffer);
  //   // const instance = new WebAssembly.Instance(module);


  //   // const mod = await WebAssembly.instantiate(fetch(`${fs.MainBundlePath}/cfdjs_wasm.wasm`)).then(mod => console.log('modding', mod));
  // } catch(e) {
  //   console.log('e', e)
  // }
  
  console.log('test2')
  // console.log('wasm', wasm)
  // console.log('test0')
  // const example = await import('./cfdjs_wasm.wasm')
  // console.log('example', example)
  // console.log('test1')
  // try {
  //   const mod = await WebAssembly.instantiateStreaming(wasm).then(mod => console.log('modding', mod));
  // } catch(e) {
  //   console.log('e', e)
  // }
  

  // console.log('test0')
  // let response
  // try {
  //   response = await fetch('cfdjs_wasm.wasm');
  // } catch(e) {
  //   console.log('test failed ', e)
  // }
  // console.log('test1')
  // const buffer = await response.arrayBuffer();
  // const module = await WebAssembly.compile(buffer);
  // const instance = new WebAssembly.Instance(module);

  // console.log('test3')
  // console.log('instance', instance)

  // console.log('instance.exports', instance.exports)

  // const result = instance.exports.fibonacci(42);
  // console.log(result);
})();

import Web3 from 'web3';
import {generateAddressesFromSeed} from '../utils';

const rpc = {
  BTC: {
    bitcoin: ['https://btc.atomicloans.io/mainnet/', 'atomicloans', 'local321'],
    bitcoin_testnet: [
      'https://btc.atomicloans.io/testnet/',
      'atomicloans',
      'local321',
    ],
  },
  ETH: {
    mainnet: ['https://mainnet.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
    rinkeby: ['https://rinkeby.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
    kovan: ['https://kovan.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
  },
  DAI: {
    mainnet: ['https://mainnet.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
    rinkeby: ['https://rinkeby.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
    kovan: ['https://kovan.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
  },
  USDC: {
    mainnet: ['https://mainnet.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
    kovan: ['https://kovan.infura.io/v3/57503107ca1c4ad19d0bf22f85c601ff'],
  },
};

const api = {
  BTC: {
    bitcoin: ['https://btc.atomic.loans/api', 2],
    bitcoin_testnet: ['https://btc.atomic.loans/testnet/api', 2],
  },
};

const networks = {
  BTC: BitcoinNetworks,
  ETH: EthereumNetworks,
  DAI: EthereumNetworks,
  USDC: EthereumNetworks,
};

const RpcProviders = {
  BTC: BitcoinRpcProvider,
  ETH: EthereumRpcProvider,
  DAI: EthereumRpcProvider,
  USDC: EthereumRpcProvider,
};

const EsploraAPIProviders = {
  BTC: BitcoinEsploraApiProvider,
};

const JsWalletProviders = {
  BTC: BitcoinJsWalletProvider,
  ETH: EthereumJsWalletProvider,
  DAI: EthereumJsWalletProvider,
  USDC: EthereumJsWalletProvider,
};

const SwapProviders = {
  BTC: BitcoinSwapProvider,
  ETH: EthereumSwapProvider,
  DAI: EthereumErc20SwapProvider,
  USDC: EthereumErc20SwapProvider,
};

const AdditionalSwapProviders = {
  BTC: BitcoinEsploraSwapFindProvider,
  ETH: EthereumScraperSwapFindProvider,
  DAI: EthereumErc20ScraperSwapFindProvider,
  USDC: EthereumErc20ScraperSwapFindProvider,
};

const CollateralProviders = {
  BTC: BitcoinCollateralProvider,
};

const CollateralSwapProviders = {
  BTC: BitcoinCollateralSwapProvider,
};

const ERC20 = {
  DAI: {
    mainnet: '0x6b175474e89094c44da98b954eedeac495271d0f',
    rinkeby: '0xcE2748BE67fB4346654B4500c4BB0642536365FC',
    kovan: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
  },
  USDC: {
    mainnet: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    kovan: '0x75b0622cec14130172eae9cf166b92e5c112faff',
  },
};

export const NetworkAssets = {
  mainnet: ['BTC', 'ETH', 'DAI', 'USDC'],
  testnet: ['BTC', 'ETH', 'DAI', 'USDC'],
};

const shouldInjectWeb3 = asset => asset === 'ETH' || ERC20[asset];
const cachedWeb3Instances = {};

const createClient = (network, mnemonic) => {
  console.log('Creating client');
  const isTestnet = network === 'testnet';

  const NetworkArgs = {
    BTC: isTestnet ? 'bitcoin_testnet' : 'bitcoin',
    ETH: isTestnet ? 'kovan' : 'mainnet',
    DAI: isTestnet ? 'kovan' : 'mainnet',
    USDC: isTestnet ? 'kovan' : 'mainnet',
  };

  const SwapArgs = {
    BTC: [networks.BTC[NetworkArgs.BTC], 'p2wsh'],
    ETH: [],
    DAI: [],
    USDC: [],
  };

  const CollateralSwapArgs = {
    BTC: [{network: networks.BTC[NetworkArgs.BTC]}],
  };

  const AdditionalSwapArgs = {
    BTC: rpc.BTC[NetworkArgs.BTC],
    ETH: [
      isTestnet
        ? 'https://liquality.io/eth-rinkeby-api'
        : 'https://liquality.io/eth-mainnet-api',
    ],
    DAI: [
      isTestnet
        ? 'https://liquality.io/eth-rinkeby-api'
        : 'https://liquality.io/eth-mainnet-api',
    ],
    USDC: [
      isTestnet
        ? 'https://liquality.io/eth-rinkeby-api'
        : 'https://liquality.io/eth-mainnet-api',
    ],
  };

  return NetworkAssets[network]
    .map(asset => {
      const client = new Client();

      client.addProvider(
        new RpcProviders[asset](...rpc[asset][NetworkArgs[asset]]),
      );

      if (EsploraAPIProviders[asset]) {
        client.addProvider(
          new EsploraAPIProviders[asset](...api[asset][NetworkArgs[asset]]),
        );
      }

      client.addProvider(
        new JsWalletProviders[asset](
          networks[asset][NetworkArgs[asset]],
          mnemonic,
        ),
      );

      if (ERC20[asset] && ERC20[asset][NetworkArgs[asset]]) {
        client.addProvider(
          new EthereumErc20Provider(ERC20[asset][NetworkArgs[asset]]),
        );
      }

      client.addProvider(new SwapProviders[asset](...SwapArgs[asset]));

      client.addProvider(
        new AdditionalSwapProviders[asset](...AdditionalSwapArgs[asset]),
      );

      client.loan = new LoanClient(client);

      if (CollateralProviders[asset]) {
        client.addProvider(
          new CollateralProviders[asset](...CollateralSwapArgs[asset]),
        );

        client.addProvider(
          new CollateralSwapProviders[asset](...CollateralSwapArgs[asset]),
        );
      }

      // const bitcoinFinance = new FinanceClient(client);

      // client.finance = bitcoinFinance;

      // const cfdProvider = new BitcoinCfdProvider(network);
      // const dlcProvider = new BitcoinDlcProvider(network);
      // const walletProvider = new BitcoinWalletProvider(
      //   network
      // );

      // client.finance.addProvider(cfdProvider);
      // client.finance.addProvider(dlcProvider);
      // client.finance.addProvider(walletProvider);

      if (shouldInjectWeb3(asset)) {
        const cachedWeb3 = cachedWeb3Instances[network];
        if (cachedWeb3) {
          client.web3 = cachedWeb3Instances[network];
        } else {
          const web3 = new Web3(
            new Web3.providers.HttpProvider(...rpc[asset][NetworkArgs[asset]]),
          );
          const {privateKey} = generateAddressesFromSeed(mnemonic);
          const account = web3.eth.accounts.privateKeyToAccount(privateKey);
          web3.eth.accounts.wallet.add(account);
          client.web3 = web3;
          cachedWeb3Instances[network] = web3;
        }
      }

      return {
        asset,
        client,
      };
    })
    .reduce((acc, {asset, client}) => {
      acc[asset] = client;

      return acc;
    }, {});
};

export default createClient;
