import React from 'react';
import RotateLoader from "react-spinners/RotateLoader";

export default function styledRotateLoader() {

  return (
      <RotateLoader
        color={'#9013FE'}
        loading
        css={{display: 'block',borderRadius: '20%', margin: 'auto'}}
        size={50}
        margin={100}
      />
  );
}
