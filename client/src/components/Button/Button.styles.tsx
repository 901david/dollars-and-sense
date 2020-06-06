import styled, { css } from 'styled-components';

export const CustomButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${({ disabled }) => (disabled ? 'darkgray' : 'white')};
  color: black;
  font-size: 24px;
  font-family: inherit;
  letter-spacing: 10px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transform: scale(1);
  transition: all 0.5s;
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
