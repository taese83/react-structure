import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import iconSet from './iconset/iconset';
import sizep from 'components/base/attr/size';
import border from 'components/base/attr/border';
import disabled from 'components/base/effect/disabled';

const reverse = ({ reverse }) =>
  reverse &&
  ` transform:rotate(90deg);
  transform: scaleX(-1);`;

const Invert = ({ invert }) => invert && `filter: invert(100%);`;

const SizeStyle = ({ size }) =>
  sizep({ width: size, height: size, bgSize: size });

const BgPathStyle = ({ icon }) =>
  `background-image: url(${iconSet[icon] || icon}) !important;`;

const StyledIcon = styled.i`
  display: inline-block;
  background-position: center center;
  background-repeat: no-repeat;
  flex-shrink: 0;
  ${SizeStyle}
  ${BgPathStyle}
  ${disabled}
  ${Invert}
  ${reverse}
  ${border}
`;

function Icon({
  icon,
  size,
  ariaHidden,
  disabled,
  reverse,
  invert,
  ...iconProps
}) {
  return (
    <StyledIcon
      icon={icon}
      size={size}
      disabled={disabled}
      reverse={reverse}
      invert={invert}
      aria-hidden={ariaHidden}
      {...iconProps}
    />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  ariaHidden: PropTypes.bool,
  disabled: PropTypes.bool,
  reverse: PropTypes.bool,
  invert: PropTypes.bool,
};

// 가급적 defaultProps 사용하지 말자!
Icon.defaultProps = {
  size: '32',
  disabled: false,
  ariaHidden: true,
  invert: false,
  reverse: false,
};

export default Icon;
