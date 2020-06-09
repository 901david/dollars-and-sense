import styled from 'styled-components';

export const SignUpWrapper = styled.div`
  .errored {
    border-bottom: solid 5px ${({ theme }) => theme.colorDanger};
  }
`;
