import createClient from '../chain/client';
import createAgent from '../factory/agent';
import createArbiter from '../factory/arbiter';

const clientCache = {};
const agentCache = {};
const arbiterCache = {};

export default state => ({
  agent(agentUrl) {
    const cachedAgent = agentCache[agentUrl];
    if (cachedAgent) return cachedAgent;

    const agent = createAgent(agentUrl);
    agentCache[agentUrl] = agent;

    return agent;
  },

  arbiter(network) {
    const cachedArbiter = arbiterCache[network];
    if (cachedArbiter) return cachedArbiter;

    const arbiter = createArbiter(network);
    arbiterCache[network] = arbiter;

    return arbiter;
  },

  client(network, asset) {
    const cacheKey = `${network}`;
    const cachedClient = clientCache[cacheKey];

    if (cachedClient) return clientCache[cacheKey][asset];
    const client = createClient('testnet', state.wallet.mnemonic);
    clientCache[cacheKey] = client;

    return client[asset];
  },
});
