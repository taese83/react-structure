import PropTypes from 'prop-types';

const border = ({
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderRadius,
}) =>
  `
  ${border ? `border : ${border};` : ''}
  ${borderTop ? `border-top : ${borderTop};` : ''}
  ${borderRight ? `border-right : ${borderRight};` : ''}
  ${borderBottom ? `border-bottom : ${borderBottom};` : ''}
  ${borderLeft ? `border-left : ${borderLeft};` : ''}
  ${borderColor ? `border-color : ${borderColor};` : ''}
  ${borderRadius ? `border-radius : ${borderRadius};` : ''}
  `;

border.propTypes = {
  border: PropTypes.string,
  borderTop: PropTypes.string,
  borderRight: PropTypes.string,
  borderBottom: PropTypes.string,
  borderLeft: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default border;
