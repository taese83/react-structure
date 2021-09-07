import React from 'react';
import { back } from 'libs/history';
import Box from 'components/box/Box';

const Detail = () => {
  return (
    <Box flexDirection="column">
      <h1>Setting 입니다.</h1>
      <Box marginTop="10px">
        <Box margin="5px">
          <button onClick={back}>back</button>
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;
