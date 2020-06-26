import React, {useLayoutEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import getters from '../store/getters';

const useGetters = () => {
  return useSelector(getters);
};

export default useGetters;
