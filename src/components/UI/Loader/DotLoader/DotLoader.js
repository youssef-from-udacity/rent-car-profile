import React from 'react';
import DotLoader from "react-spinners/DotLoader";

export default function styledDotLoader() {

  return (
      <DotLoader
        color={'#E01084'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={150}
      />
  );
}
