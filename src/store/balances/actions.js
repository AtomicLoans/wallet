import {NetworkAssets} from '../../chain/client';

export function updateBalances() {
  return async function(dispatch, getState, getters) {
    const {network} = getState();
    const assets = NetworkAssets[network];

    console.log(assets);

    return Promise.all(
      assets.map(async asset => {
        const client = getters.client(network, asset);

        const addresses = await client.wallet.getUsedAddresses();
        const balance = (await client.chain.getBalance(addresses)).toNumber();

        return dispatch(updateBalance(asset, balance));
      }),
    );
  };
}

export function updateBalance(asset, balance) {
  return {
    type: 'UPDATE_BALANCE',
    asset,
    balance,
  };
}
