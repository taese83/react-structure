import React from 'react';
import { go } from 'libs/history';
import Box from 'components/box/Box';

import { useDispatch, useSelector } from 'react-redux';
import { setData, dataSelector } from '../stores/slice';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
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
        <Box margin="5px" width="100px">
          <button
            onClick={() => {
              dispatch(setData('from Home'));
            }}
          >
            add data
          </button>
        </Box>
        <Box margin="5px" width="100%">
          추가한 data : {data}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
