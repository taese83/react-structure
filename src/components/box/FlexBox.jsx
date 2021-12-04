import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from './Box';

// display가 flex일 경우만 동작함
const center = ({ center }) =>
  center ? 'align-items: center; justify-content: center;' : '';

const FlexBox = styled(Box).attrs({
  display: 'flex',
  alignItems: 'flex-start',
})`
  ${center}
`;

FlexBox.propTypes = {
  ...Box.propTypes,
  /** 기본 태그를 */
  center: PropTypes.bool,
};

export default FlexBox;
