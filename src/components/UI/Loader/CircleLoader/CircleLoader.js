import React from 'react';
import CircleLoader from "react-spinners/CircleLoader";

export default function styledCircleLoader() {

  return (
      <CircleLoader
        color={'#36D7B7'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={200}
      />
  );
}
