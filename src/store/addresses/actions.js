export function updateUnusedAddress({asset}) {
  return async function(dispatch, getState, getters) {
    const {network} = getState();
    const client = getters.client(network, asset);
    const address = await client.wallet.getUnusedAddress();

    return dispatch({
      type: 'UPDATE_UNUSED_ADDRESS',
      asset,
      address,
    });
  };
}
