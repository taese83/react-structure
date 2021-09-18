import React from 'react';
import Box from 'components/box/Box';

export default {
  title: 'Components/Box',
  component: Box,
};

const Template = (args) => {
  return (
    <Box padding="10px">
      <Box {...args} bgcolor="skyblue" center>
        Basic Box
      </Box>
      <Box {...args} shadow="2px 2px 2px 1px rgba(0,0,0,0.2)" center>
        Shadow Box
      </Box>
      <Box border="1px solid #e4e4e4" flexDirection="column" padding="20px">
        <Box {...args} height="50px" center>
          columm 1
        </Box>
        <Box {...args} height="50px" center>
          columm 2
        </Box>
        <Box {...args} height="50px" center>
          columm 3
        </Box>
      </Box>
      <Box padding="20px" marginLeft="10px" flexWrap="wrap">
        <Box border="1px solid #e4e4e4" margin="5px" height="50px" center>
          row 1
        </Box>
        <Box border="1px solid #e4e4e4" margin="5px" height="50px" center>
          row 2
        </Box>
        <Box border="1px solid #e4e4e4" margin="5px" height="50px" center>
          row 3
        </Box>
      </Box>
      <Box
        {...args}
        borderRadius="50%"
        center
        bgcolor="orange"
        flex="0 0 auto"
        mq={{
          small: `background-color:red;`,
        }}
      >
        Circle
      </Box>
    </Box>
  );
};

export const base = Template.bind({});
base.storyName = 'Box';
base.args = {
  width: '150px',
  height: '150px',
  border: '1px solid #e4e4e4',
  borderRadius: '4px',
  margin: '5px',
  padding: '8px',
};
