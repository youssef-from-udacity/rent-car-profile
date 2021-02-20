import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";

export default function styledPuffLoader() {

  return (
      <PuffLoader
        color={'#F8FA22'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={150}
      />
  );
}
