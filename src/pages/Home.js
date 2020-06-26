import {Button, Text, Spinner} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {View, InteractionManager, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updatePage} from '../store/navigation/actions';
import AppLayout from '../components/AppLayout/AppLayout';
import {BottomContainer, TopContainer} from '../components/Page';
import SeedPhraseTable from '../components/SeedPhraseTable';
import commonStyles from '../style/common';
import AssetButton from '../components/AssetButton';
import useGetters from '../hooks/useGetters';
import {updateBalances} from '../store/balances/actions';
import useMount from '../hooks/useMount';
import {updateLoading} from '../store/loading/actions';
import {animate} from '../style/animation';
import {NetworkAssets} from '../chain/client';

const HomeTopContainer = () => {
  const loading = useSelector(state => state.loading);

  animate();

  return (
    <TopContainer>
      <View>
        {loading ? (
          <>
            <Text style={commonStyles.mainTitle}>Hold on tight!</Text>
            <Text category="label">Updating balances...</Text>
          </>
        ) : (
          <Text style={commonStyles.mainTitle}>Welcome!</Text>
        )}
      </View>
    </TopContainer>
  );
};

const HomeBottomContainer = ({firstLoad}) => {
  const dispatch = useDispatch();
  const getters = useGetters();

  const loading = useSelector(state => state.loading);
  const network = useSelector(state => state.network);

  const [updated, setUpdated] = useState(false);

  const handlePress = asset => {
    dispatch({
      action: 'updatePage',
      payload: {page: 'ASSET', pageProps: {asset}},
    });
  };

  useEffect(() => {
    if (!updated) {
      (async () => {
        if (firstLoad) dispatch(updateLoading(true));
        console.log('Dispatching update balances');

        await dispatch({action: 'updateBalances'});
        if (firstLoad) dispatch(updateLoading(false));
      })();
    }
  }, [dispatch, updated]);

  return (
    <BottomContainer>
      {NetworkAssets[network].map(asset => (
        <AssetButton
          loading={loading}
          key={asset}
          style={{marginVertical: 6}}
          asset={asset}
          onPress={() => {
            handlePress(asset);
          }}
        />
      ))}
    </BottomContainer>
  );
};

const Home = props => {
  return (
    <AppLayout>
      <HomeTopContainer />
      <HomeBottomContainer {...props} />
    </AppLayout>
  );
};

export default Home;
