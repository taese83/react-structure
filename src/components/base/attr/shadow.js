import PropTypes from 'prop-types';

const shadow = ({ shadow }) => `
  ${shadow ? `box-shadow : ${shadow};` : ''}
`;

shadow.propTypes = {
  shadow: PropTypes.string,
};

export default shadow;
