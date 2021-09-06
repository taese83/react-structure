import PropTypes from 'prop-types';

const position = ({ position, zindex, top, right, bottom, left }) => `
  ${position ? `position : ${position};` : ''}
  ${zindex ? `z-index : ${zindex};` : ''}
  ${top ? `top : ${top};` : ''}
  ${right ? `right : ${right};` : ''}
  ${bottom ? `bottom : ${bottom};` : ''}
  ${left ? `left : ${left};` : ''}
`;

position.propTypes = {
  position: PropTypes.string,
  zindex: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
};

export default position;
