import React from 'react';
import ClockLoader from "react-spinners/ClockLoader";

export default function styledClockLoader() {

  return (
      <ClockLoader
        color={'#36D7B7'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={150}
      />
  );
}
