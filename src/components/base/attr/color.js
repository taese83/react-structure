import PropTypes from 'prop-types';

const color = ({ color, bgcolor }) => `
  ${color ? `color : ${color};` : ''}
  ${bgcolor ? `background-color : ${bgcolor};` : ''}
`;

color.propTypes = {
  color: PropTypes.string,
  bgcolor: PropTypes.string,
};

export default color;
