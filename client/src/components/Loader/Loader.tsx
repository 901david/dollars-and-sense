import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearchDollar } from '@fortawesome/free-solid-svg-icons';

import { LoaderProps } from './Loader.types';
import { LoaderWrapper } from './Loader.styles';

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;
  return (
    <LoaderWrapper>
      <FontAwesomeIcon icon={faSpinner} spin />
      <FontAwesomeIcon icon={faSearchDollar} />
    </LoaderWrapper>
  );
};
