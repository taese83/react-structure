import React from 'react';
import { back, useFrom, useStack } from 'libs/history';
import Box from 'components/box/Box';

const Detail = () => {
  const from = useFrom();
  const stack = useStack();
  return (
    <Box flexDirection="column">
      <h1>Setting 입니다.</h1>
      <Box marginTop="10px">
        <Box margin="5px">
          <button onClick={back}>back</button>
        </Box>
      </Box>
      <span> from : {from}</span>
      <span> stack : {JSON.stringify(stack)}</span>
    </Box>
  );
};

export default Detail;
