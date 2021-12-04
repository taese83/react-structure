import React from 'react';
import { back, useFrom, useStack } from 'libs/history';
import FlexBox from 'components/box/FlexBox';

const Detail = () => {
  const from = useFrom();
  const stack = useStack();
  return (
    <FlexBox flexDirection="column">
      <h1>Setting 입니다.</h1>
      <FlexBox marginTop="10px">
        <FlexBox margin="5px">
          <button onClick={back}>back</button>
        </FlexBox>
      </FlexBox>
      <span> from : {from}</span>
      <span> stack : {JSON.stringify(stack)}</span>
    </FlexBox>
  );
};

export default Detail;
