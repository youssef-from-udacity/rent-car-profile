import React from 'react';
import BounceLoader from "react-spinners/BounceLoader";

export default function styledBounceLoader() {

  return (
      <BounceLoader
        color={'#6EF82B'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={250}
      />
  );
}
