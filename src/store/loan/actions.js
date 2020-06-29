export function createLoan({
  agentUrl,
  principal,
  collateral,
  collateralAmount,
  amount,
  length,
}) {
  return async function(dispatch, getState, getters) {
    try {
      const {network} = getState();
      const agent = getters.agent(agentUrl);
      const loan = await agent.newLoan(principal, amount, collateral, length);

      loan.type = 'LOAN';
      loan.from = principal; // lists loan tx under the proper asset screen
      loan.network = network;
      loan.agentUrl = agentUrl;
      loan.startTime = Date.now();
      loan.expiresAt = loan.requestExpiresAt;
      loan.status = 'QUOTE';
      loan.collateralAmount = collateralAmount;
      loan.expirations = {};

      dispatch({action: 'NEW_LOAN', loan});
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
}

export function getMatchedFunds({
  asset,
  collateral,
  amount,
  length,
  maxLength,
  maxAmount,
}) {
  return async function(dispatch, getState, getters) {
    const {network} = getState();
    const matchedFunds = await getters
      .arbiter(network)
      .matchFunds(asset, collateral, length, amount, maxLength, maxAmount);

    return matchedFunds;
  };
}
