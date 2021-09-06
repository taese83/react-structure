import PropTypes from 'prop-types';

const flex = ({
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  order,
  flex,
  flexGrow,
  flexShrink,
  alignSelf,
}) => `
${flexDirection ? `flex-direction : ${flexDirection};` : ''}
${flexWrap ? `flex-wrap : ${flexWrap};` : ''}
${justifyContent ? `justify-content : ${justifyContent};` : ''}
${alignItems ? `align-items : ${alignItems};` : ''}
${alignContent ? `align-content : ${alignContent};` : ''}
${order ? `order : ${order};` : ''}
${flex ? `flex : ${flex};` : ''}
${flexGrow ? `flex-grow : ${flexGrow};` : ''}
${flexShrink ? `flex-shrink : ${flexShrink};` : ''}
${alignSelf ? `align-self : ${alignSelf};` : ''}
`;

flex.propTypes = {
  flexDirection: PropTypes.string,
  flexWrap: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  order: PropTypes.string,
  flex: PropTypes.string,
  flexGrow: PropTypes.string,
  flexShrink: PropTypes.string,
  alignSelf: PropTypes.string,
};

export default flex;
