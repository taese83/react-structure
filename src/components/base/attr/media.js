import { css } from 'styled-components';

const breakpoint = {
  small: 768,
  large: 1024,
};

const media = Object.keys(breakpoint).reduce((acc, key) => {
  acc[key] = (...args) => css`
    @media screen and (min-width: ${breakpoint[key]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export default media;
