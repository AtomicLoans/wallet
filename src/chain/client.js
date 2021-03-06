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
