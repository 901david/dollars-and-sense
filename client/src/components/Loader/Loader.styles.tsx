import styled from 'styled-components';

export const LoaderWrapper = styled.div`
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
