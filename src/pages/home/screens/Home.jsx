/* eslint-disable react/prop-types */
import React from 'react';
import { go } from 'libs/history';
import FlexBox from 'components/box/FlexBox';
import Box from 'components/box/Box';

import { useDispatch, useSelector } from 'react-redux';
import { setData, getData, dataSelector } from '../stores/slice';
import { useTrans } from 'libs/i18n';
import { change } from 'stores/i18n/slice';

const Data = () => {
  const data = useSelector(dataSelector);
  return (
    <FlexBox margin="5px" width="100%">
      추가한 data : {data}
    </FlexBox>
  );
};

const Button = ({ onClick, ...buttonProps }) => {
  return (
    <Box component="input" type="button" onClick={onClick} {...buttonProps} />
  );
};

const Home = () => {
  const { t } = useTrans();
  const dispatch = useDispatch();

  return (
    <FlexBox flexDirection="column">
      <h1>Home 입니다. {t('@hello')}</h1>
      <FlexBox marginTop="10px" center>
        <Button
          margin="5px"
          onClick={() => {
            go('setting');
          }}
          value="Setting"
        />
        <Button
          margin="5px"
          onClick={() => {
            go('detail', { id: 1, age: 40 });
          }}
          value="Detail"
        />
        <Button
          margin="5px"
          onClick={() => {
            go('detail/setting', { age: 40, name: 'ted' });
          }}
          value="Detail/setting"
        />
        <FlexBox margin="5px" width="220px">
          <button
            onClick={() => {
              dispatch(change('en-US'));
            }}
          >
            언어변경
          </button>
        </FlexBox>
        <FlexBox margin="5px" width="220px">
          <button
            onClick={() => {
              dispatch(setData('from Local'));
            }}
          >
            add data
          </button>
        </FlexBox>
        <FlexBox margin="5px" width="320px">
          <button
            onClick={() => {
              dispatch(getData());
            }}
          >
            add data from server
          </button>
        </FlexBox>
        <Data />
      </FlexBox>
    </FlexBox>
  );
};

export default Home;
