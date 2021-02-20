import React from 'react';
import HashLoader from "react-spinners/HashLoader";

export default function styledHashLoader() {

  return (
      <HashLoader
        color={'#BD10E0'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={200}
      />
  );
}
