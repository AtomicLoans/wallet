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

import FinanceClient from '@atomicfinance/client'
import BitcoinCfdProvider from '@atomicfinance/bitcoin-cfd-provider'
import BitcoinDlcProvider, { Amount } from '@atomicfinance/bitcoin-dlc-provider';
import BitcoinWalletProvider from '@atomicfinance/bitcoin-wallet-provider'

import cfddlcjs from '../cfd/cfddlcjs'
import cfdjs from '../cfd/cfdjs'

const keyPair = {
  privkey: '99c6b3dcd0849e75a80d97e04c40e8b460511f588e50e34690ddded97331a84f',
  pubkey: '03572e606daa1627b1fadaeaee9e9abe851775cf3f38af22173fa9fa503b260254'
}

// cfddlcjs.addInitializedListener(async () => {
//   console.log('CFDDLCJS - LOADED')

//   const rValue = await cfddlcjs.getCfddlc().GetSchnorrPublicNonce({
//     kValue: keyPair.privkey,
//   });

//   console.log('Schnoor Public Nonce', rValue);
// })

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

console.log(cfdjs.getCfd())

cfdjs.addInitializedListener(async () => {
  console.log('CFDJS - LOADED')
  cfddlcjs.addInitializedListener(async () => {
    console.log('CFDDLCJS - LOADED')

    const keyPair = await cfdjs.getCfd().CreateKeyPair({
      wif: false,
    });

    console.log(keyPair)

    const rValue = await cfddlcjs.getCfddlc().GetSchnorrPublicNonce({
      kValue: keyPair.privkey,
    });

    console.log('Schnoor Public Nonce', rValue);

    // ========================================

    try {
      const network = BitcoinNetworks.bitcoin_testnet

      const bitcoin = new Client();
      const bitcoinFinance = new FinanceClient(bitcoin);

      bitcoin.finance = bitcoinFinance;
      bitcoin.addProvider(new BitcoinEsploraApiProvider('https://btc.atomic.loans/testnet/api/'));
      bitcoin.addProvider(
        new BitcoinJsWalletProvider(
          network,
          'abandon ability able about above absent absorb abstract absurd abuse access accident',
          'bech32'
        )
      );

      const cfdProvider = new BitcoinCfdProvider(network, cfdjs.getCfd());
      const dlcProvider = new BitcoinDlcProvider(network, cfddlcjs.getCfddlc());
      const walletProvider = new BitcoinWalletProvider(
        network
      );

      bitcoin.finance.addProvider(cfdProvider);
      bitcoin.finance.addProvider(dlcProvider);
      bitcoin.finance.addProvider(walletProvider);

      bitcoin.getMethod('getAddresses')(0, 1).then((result) => console.log('address', result))

      console.log('test', bitcoin.finance.getMethod('initializeContractAndOffer'))

      const ESTIMATED_SIZE = 312;
      const BurnAddress = 'bcrt1qxcjufgh2jarkp2qkx68azh08w9v5gah8u6es8s';
      const feePerByte = 5
      const betAmount = 200000

      const outputs = [{ to: BurnAddress, value: (betAmount + ESTIMATED_SIZE * (feePerByte - 1)) }];
      const inputsForAmount = await bitcoin.getMethod('getInputsForAmount')(
        outputs,
        [],
        1
      );

      const localCollateral = Amount.FromSatoshis(100000)
      const remoteCollateral = Amount.FromSatoshis(100000)
      const feeRate = 5
      const publishDate = new Date()
      const ELECTION_REFUND_DATE = new Date()

      const inputDetails = {
        localCollateral,
        remoteCollateral,
        feeRate,
        maturityTime: new Date(
          new Date(publishDate).setHours(new Date().getHours() - 3)
        ),
        refundLockTime: ELECTION_REFUND_DATE.getTime(),
        cetCsvDelay: 0,
      };

      const outcomeDetailWin: OutcomeDetails = {
        localAmount: Amount.FromSatoshis(localCollateral),
        remoteAmount: Amount.FromSatoshis(0),
        message: 'democratic'
      };

      const outcomeDetailLose: OutcomeDetails = {
        localAmount: Amount.FromSatoshis(0),
        remoteAmount: Amount.FromSatoshis(remoteCollateral),
        message: 'republican'
      };

      const outcomes: Array<OutcomeDetails> = [outcomeDetailWin, outcomeDetailLose];

      const oracleInfo = {
        name: 'atomic.finance',
        publicKey:
          '03355cd87b61c0740a98509169e135e515d8cd6244e3c58d924f8455f414ef7a4b',
        rValue:
          '031f9fefc7c0be9b3cd14671590892ebf01c440034f1b193229bca3275a4217d89',
      };

      const startingIndex = 0;

      const hasDlc = await bitcoin.finance.getMethod('hasDlc')('test')
      console.log('hasDlc', hasDlc)

      console.log('SUCCESS')
    } catch(e) {
      console.log('e', e)
    }
  })
})

export default createClient;
