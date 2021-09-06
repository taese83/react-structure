import PropTypes from 'prop-types';

const size = ({
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  boxSizing,
}) => `
  ${width ? `width : ${width};` : ''}
  ${minWidth ? `min-width : ${minWidth};` : ''}
  ${maxWidth ? `max-width : ${maxWidth};` : ''}
  ${height ? `height : ${height};` : ''}
  ${minHeight ? `min-height : ${minHeight};` : ''}
  ${maxHeight ? `max-height : ${maxHeight};` : ''}
  ${boxSizing ? `box-sizing : ${boxSizing};` : ''}
`;

size.propTypes = {
  width: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  height: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  boxSizing: PropTypes.string,
};

export default size;
