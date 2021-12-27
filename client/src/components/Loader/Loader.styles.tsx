import styled, { ThemeContext } from 'styled-components';

export const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${({ theme }) => theme.fullVW};

  background: ${({ theme }) => theme.colorTranslucent80White};
  z-index: 1000;
  ${({ theme }) => theme.flexProperties('center', 'center')};

  svg {
    font-size: ${({ theme }) => theme.foontSizeXtraLarge};
    position: absolute;
    z-index: 1002;
    color: ${({ theme }) => theme.colorMoneyGreen};
  }

  svg:last-child {
    font-size: ${({ theme }) => theme.fontSizeLarge};
  }
`;
