import React from 'react';
import { go, useFrom, useStack } from 'libs/history';
import Box from 'components/box/Box';

import { useDispatch, useSelector } from 'react-redux';
import { setData, getData, dataSelector } from '../stores/slice';

const Data = () => {
  const data = useSelector(dataSelector);
  return (
    <Box margin="5px" width="100%">
      추가한 data : {data}
    </Box>
  );
};

const Home = () => {
  const dispatch = useDispatch();

  const from = useFrom();
  const stack = useStack();

  return (
    <Box flexDirection="column">
      <h1>Home 입니다.</h1>
      <Box marginTop="10px" center>
        <Box margin="5px">
          <button
            onClick={() => {
              go('setting');
            }}
          >
            Setting
          </button>
        </Box>
        <Box margin="5px">
          <button
            onClick={() => {
              go('detail', { id: 1 });
            }}
          >
            Detail
          </button>
        </Box>
        <Box margin="5px" width="220px">
          <button
            onClick={() => {
              dispatch(setData('from Local'));
            }}
          >
            add data
          </button>
        </Box>
        <Box margin="5px" width="320px">
          <button
            onClick={() => {
              dispatch(getData());
            }}
          >
            add data from server
          </button>
        </Box>
        <Data />
      </Box>
      <span> from : {from}</span>
      <span> stack : {JSON.stringify(stack)}</span>
    </Box>
  );
};

export default Home;
