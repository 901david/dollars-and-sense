import styled from 'styled-components';

interface InputWrapper {
  input: string;
  error: boolean;
  defaultColor?: string;
}

export const InputWrapper = styled.div<InputWrapper>`
  position: relative;
  margin: 3rem 0;
  color: ${({ defaultColor, theme }) =>
    defaultColor !== undefined ? defaultColor : theme.colorWhite};
  label {
    position: absolute;
    left: 0;
    bottom: ${({ input }) => {
      return input !== '' ? '1.8rem' : '0.5rem';
    }};
    font-style: italic;
    font-size: ${({ theme }) => theme.fontSizeMedium};
    ${({ theme }) => theme.standardTransition};
  }
  input {
    background: ${({ theme }) => theme.colorBlack};
    border: none;
    border-bottom: solid 5px
      ${({ error, defaultColor, theme }) =>
        error
          ? 'red'
          : defaultColor !== undefined
          ? defaultColor
          : theme.colorWhite};
    width: 45vw;
    color: ${({ defaultColor, theme }) =>
      defaultColor !== undefined ? defaultColor : theme.colorWhite};
    font-size: ${({ theme }) => theme.fontSizeMedium};

    &:focus {
      outline: none;
      & + label {
        bottom: 1.8rem;
      }
    }
  }

  .input-required {
    color: ${({ theme }) => theme.colorDanger};
  }
`;
