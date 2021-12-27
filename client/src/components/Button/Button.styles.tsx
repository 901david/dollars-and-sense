import styled, { css } from 'styled-components';

export const CustomButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 50px;
  ${({ theme }) => theme.flexProperties('center', 'center')};
  border-radius: ${({ theme }) => theme.standardBorderRadius};
  background: ${({ disabled, theme }) =>
    disabled ? theme.disabled : theme.colorWhite};
  color: ${({ theme }) => theme.colorBlack};
  font-size: ${({ theme }) => theme.fontSizeLarge};
  font-family: inherit;
  letter-spacing: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transform: scale(1);
  ${({ theme }) => theme.standardTransition};

  ${({ disabled }) => {
    return (
      !disabled &&
      css`
        :hover {
          transform: scale(1.05);
        }

        :click {
          transform: scale(0.95);
        }
      `
    );
  }}
`;
