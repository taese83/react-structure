import PropTypes from 'prop-types';

const space = ({
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
}) => `
  ${margin ? `margin : ${margin};` : ''}
  ${marginTop ? `margin-top : ${marginTop};` : ''}
  ${marginRight ? `margin-right : ${marginRight};` : ''}
  ${marginBottom ? `margin-bottom : ${marginBottom};` : ''}
  ${marginLeft ? `margin-left : ${marginLeft};` : ''}
  ${padding ? `padding : ${padding};` : ''}
  ${paddingTop ? `padding-top : ${paddingTop};` : ''}
  ${paddingRight ? `padding-right : ${paddingRight};` : ''}
  ${paddingBottom ? `padding-bottom : ${paddingBottom};` : ''}
  ${paddingLeft ? `padding-left : ${paddingLeft};` : ''}
`;

space.propTypes = {
  margin: PropTypes.string,
  marginTop: PropTypes.string,
  marginRight: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  padding: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingRight: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingLeft: PropTypes.string,
};

export default space;
