const {default: AppLayout} = require('../AppLayout/AppLayout');
import React, {useState} from 'react';
import Onboarding from '../../pages/Onboarding';
import {useSelector} from 'react-redux';
import SeedPhrase from '../../pages/SeedPhrase';
import {animate} from '../../style/animation';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import Home from '../../pages/Home';

const PAGES = {
  ONBOARDING: Onboarding,
  SEED_PHRASE: SeedPhrase,
  HOME: Home,
};

const AppRouter = () => {
  useDidMountEffect(animate);

  const page = useSelector(({navigation}) => navigation.page);

  return PAGES[page]();
};

export default AppRouter;
