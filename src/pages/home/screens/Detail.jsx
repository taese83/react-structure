import React from 'react';
import { back } from 'libs/history';
import Box from 'components/box/Box';
import { useParams } from 'routers';

const Detail = () => {
  const { id } = useParams();
  return (
    <Box flexDirection="column">
      <h1>Detail 입니다.</h1>
      <Box marginTop="10px" center>
        <Box margin="5px">
          <button onClick={back}>back</button>
        </Box>
        <Box margin="5px" width="100%">
          id : {id}
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;
