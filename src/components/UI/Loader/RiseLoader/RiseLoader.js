import React from 'react';
import RiseLoader from "react-spinners/RiseLoader";

export default function styledRiseLoader() {

  return (
      <RiseLoader
        color={'#B8E986'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={50}
      />
  );
}
