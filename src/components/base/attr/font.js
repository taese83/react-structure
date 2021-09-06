import PropTypes from 'prop-types';

const font = ({
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
}) => `
  ${fontFamily ? `font-family: ${fontFamily};` : ''}
  ${fontSize ? `font-size : ${fontSize};` : ''}
  ${fontWeight ? `font-weight : ${fontWeight};` : ''}
  ${letterSpacing ? `letter-spacing : ${letterSpacing};` : ''}
  ${lineHeight ? `line-height : ${lineHeight};` : ''}
  ${textAlign ? `text-align : ${textAlign};` : ''}
`;

font.propTypes = {
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.string,
  textAlign: PropTypes.string,
};

export default font;
