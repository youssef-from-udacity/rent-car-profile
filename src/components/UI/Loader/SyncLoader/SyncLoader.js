import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";

export default function styledSyncLoader() {

  return (
      <SyncLoader
        color={'#EB04F6'}
        loading
        css={{display: 'block', margin: 'auto'}}
        size={50}
        margin={4}
      />
  );
}
