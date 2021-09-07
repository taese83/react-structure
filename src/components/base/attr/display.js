import PropTypes from 'prop-types';

const display = ({
  display,
  overflow,
  overflowX,
  overflowY,
  textOverflow,
  visibility,
  whiteSpace,
}) =>
  `
  ${display ? `display : ${display};` : ''}
  ${overflow ? `overflow : ${overflow};` : ''}
  ${overflowX ? `overflow-x : ${overflowX};` : ''}
  ${overflowY ? `overflow-y : ${overflowY};` : ''}
  ${textOverflow ? `text-overflow : ${textOverflow};` : ''}
  ${visibility ? `visibility : ${visibility};` : ''}
  ${whiteSpace ? `white-space : ${whiteSpace};` : ''}
  `;

display.propTypes = {
  display: PropTypes.string,
  overflow: PropTypes.string,
  overflowX: PropTypes.string,
  overflowY: PropTypes.string,
  textOverflow: PropTypes.string,
  visibility: PropTypes.string,
  whiteSpace: PropTypes.string,
};

export default display;
