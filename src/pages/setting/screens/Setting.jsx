import React from 'react';
import { back } from 'libs/history';
import FlexBox from 'components/box/FlexBox';

const Detail = () => {
  return (
    <FlexBox flexDirection="column">
      <h1>Setting 입니다.</h1>
      <FlexBox marginTop="10px">
        <FlexBox margin="5px">
          <button onClick={back}>back</button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Detail;
