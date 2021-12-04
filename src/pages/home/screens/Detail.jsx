import React from 'react';
import { back } from 'libs/history';
import FlexBox from 'components/box/FlexBox';
import { useParams } from 'routers';

const Detail = () => {
  const { id } = useParams();
  return (
    <FlexBox flexDirection="column">
      <h1>Detail 입니다.</h1>
      <FlexBox marginTop="10px" center>
        <FlexBox margin="5px">
          <button onClick={back}>back</button>
        </FlexBox>
        <FlexBox margin="5px" width="100%">
          id : {id}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Detail;
