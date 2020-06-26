import createClient from '../chain/client';
const clientCache = {};

export default state => ({
  client(network, asset) {
    const cacheKey = `${network}-${asset}`;
    const cachedClient = clientCache[cacheKey];

    if (cachedClient) return clientCache[cacheKey][asset];
    const client = createClient('testnet', state.wallet.mnemonic);
    clientCache[cacheKey] = client;

    return client[asset];
  },
});
