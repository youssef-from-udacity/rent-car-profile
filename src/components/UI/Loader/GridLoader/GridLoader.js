import React from 'react';
import GridLoader from "react-spinners/GridLoader";

export default function styledGridLoader() {

  return (
      <GridLoader
        color={'#E01084'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={70}
      />
  );
}
