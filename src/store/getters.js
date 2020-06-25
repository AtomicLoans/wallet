import createClient from '../chain/client';
const clientCache = {};

export default state => ({
  client(asset) {
    const cacheKey = 1;
    const cachedClient = clientCache[cacheKey];

    if (cachedClient) return cachedClient[asset];
    const client = createClient('testnet', state.wallet.mnemonic);
    cachedClient[cacheKey] = client;

    return client[asset];
  },
});
