import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import border from '../base/attr/border';
import display from '../base/attr/display';
import flex from '../base/attr/flex';
import font from '../base/attr/font';
import position from '../base/attr/position';
import shadow from '../base/attr/shadow';
import size from '../base/attr/size';
import space from '../base/attr/space';
import color from '../base/attr/color';
import media from '../base/attr/media';

// display가 flex일 경우만 동작함
const center = ({ center }) =>
  center ? 'align-items: center; justify-content: center;' : '';

const BoxContainer = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  box-sizing: border-box;
  ${display}
  ${position}
  ${flex}
  ${size}
  ${space}
  ${border}
  ${color}
  ${font}
  ${shadow}
  ${center}
`;

const Box = ({ component, center, children, ...boxProps }) => {
  return (
    <BoxContainer as={component} center={center} {...boxProps}>
      {children}
    </BoxContainer>
  );
};

Box.propTypes = {
  ...display.propTypes,
  ...position.proptypes,
  ...flex.propTypes,
  ...size.propTypes,
  ...space.propTypes,
  ...border.propTypes,
  ...color.propTypes,
  ...font.propTypes,
  ...shadow.propTypes,

  /** 기본 태그를 */
  component: PropTypes.string,
  center: PropTypes.bool,
  children: PropTypes.node,
};

export default Box;
