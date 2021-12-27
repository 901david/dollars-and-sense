import styled from 'styled-components';

export const LoginWrapper = styled.main`
  background: ${({ theme }) => theme.colorBlack};
  ${({ theme }) => theme.fullVW};
  ${({ theme }) => theme.flexProperties('center', 'center')};

  .sign-up {
    color: ${({ theme }) => theme.colorWhite};
    ${({ theme }) => theme.flexProperties()};

    span {
      color: ${({ theme }) => theme.colorLightBlue};
      cursor: pointer;
    }
  }
`;
