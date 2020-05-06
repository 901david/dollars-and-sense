import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSearchDollar } from '@fortawesome/free-solid-svg-icons';

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(250, 250, 250, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 12rem;
    position: absolute;
    z-index: 1002;
    color: #85bb65;
  }

  svg:last-child {
    font-size: 6rem;
  }
`;

export const Loader: React.FC<{ loading: boolean }> = ({ loading }) => {
  if (!loading) return null;
  return (
    <LoaderWrapper>
      <FontAwesomeIcon icon={faSpinner} spin />
      <FontAwesomeIcon icon={faSearchDollar} />
    </LoaderWrapper>
  );
};
