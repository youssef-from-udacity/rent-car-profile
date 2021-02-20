import React from 'react';
import BarLoader from "react-spinners/BarLoader";

export default function styledBarLoader() {

  return (
      <BarLoader
        color={'#5CF512'}
        loading
        css={{display: 'block',borderRadius: '10px 0', margin: 'auto'}}
        height={16}
        width={200}
      />
  );
}
