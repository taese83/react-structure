import React from 'react';
import Icon from 'components/icon/Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
};

const Template = (args) => {
  return <Icon {...args} />;
};

export const base = Template.bind({});
base.storyName = 'Icon';
base.args = {
  icon: 'search',
  size: '32px',
};
