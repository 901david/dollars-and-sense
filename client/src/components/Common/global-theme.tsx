import { css } from 'styled-components';

export const globalTheme = {
  //Colors
  disabled: '#a9a9a9',
  colorWhite: '#fff',
  colorBlack: '#000',
  colorDanger: '#FF0000',
  colorMoneyGreen: '#85bb65',
  colorLightBlue: '#add8e6',
  colorTranslucent80White: 'rgb(250, 250, 250, 0.8)',
  //Fonts
  foontSizeXtraLarge: '12rem',
  fontSizeLarge: '6rem',
  fontSizeMedium: '1.5rem',
  //Animations
  standardTransition: 'transition: all 0.5s',
  longTransition: 'transition: all 2s',
  //Styles
  boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
  fullVW: css`
    width: 100vw;
    height: 100vh;
  `,
  standardBorderRadius: '5px',
  flexProperties: (justifyContent = 'flex-start', alignItems = 'stretch') => {
    return css`
      display: flex;
      justify-content: ${justifyContent};
      align-items: ${alignItems};
    `;
  },
};
