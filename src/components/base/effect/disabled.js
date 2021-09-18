const disabled = ({ disabled }) =>
  `opacity : ${disabled ? 0.3 : 1};
   pointer-events : ${disabled ? 'none' : ''};
  `;

export default disabled;
