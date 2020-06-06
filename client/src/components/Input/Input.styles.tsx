import styled from 'styled-components';

interface IInputWrapper {
  input: string;
  error: boolean;
  defaultColor?: string;
}

export const InputWrapper = styled.div<IInputWrapper>`
  position: relative;
  margin: 3rem 0;
  color: ${({ defaultColor }) =>
    defaultColor !== undefined ? defaultColor : 'white'};
  label {
    position: absolute;
    left: 0;
    bottom: ${({ input }) => {
      return input !== '' ? '1.8rem' : '0.5rem';
    }};
    font-style: italic;
    font-size: 1.5rem;
    transition: all 0.5s;
  }
  input {
    background: rgb(0, 0, 0, 0);
    border: none;
    border-bottom: solid 5px
      ${({ error, defaultColor }) =>
        error ? 'red' : defaultColor !== undefined ? defaultColor : 'white'};
    width: 45vw;
    color: ${({ defaultColor }) =>
      defaultColor !== undefined ? defaultColor : 'white'};
    font-size: 1.5rem;
    &:focus {
      outline: none;
      & + label {
        bottom: 1.8rem;
      }
    }
  }

  .input-required {
    color: red;
  }
`;
