const {default: AppLayout} = require('../AppLayout/AppLayout');
import React, {useState, useEffect} from 'react';
import Onboarding from '../../pages/Onboarding';
import {useSelector, useDispatch} from 'react-redux';
import SeedPhrase from '../../pages/SeedPhrase';
import {animate} from '../../style/animation';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import Home from '../../pages/Home';
import {updateAnimating} from '../../store/animating/actions';
import Asset from '../../pages/Asset';
import Deposit from '../../pages/Deposit';
import NewLoan from '../../pages/NewLoan';

const PAGES = {
  ONBOARDING: Onboarding,
  SEED_PHRASE: SeedPhrase,
  HOME: Home,
  ASSET: Asset,
  DEPOSIT: Deposit,
  NEW_LOAN: NewLoan,
};

const AppRouter = () => {
  const dispatch = useDispatch();

  useDidMountEffect(() => {
    animate().then(() => {
      // dispatch(updateAnimating(false));
    });
  });

  const page = useSelector(({navigation}) => navigation.page);
  const pageProps = useSelector(({navigation}) => navigation.pageProps);

  return PAGES[page]({...pageProps});
};

export default AppRouter;
