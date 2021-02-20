import React from 'react';
import RingLoader from "react-spinners/RingLoader";

export default function styledRingLoader() {

  return (
      <RingLoader
        color={'#9013FE'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={150}
      />
  );
}
