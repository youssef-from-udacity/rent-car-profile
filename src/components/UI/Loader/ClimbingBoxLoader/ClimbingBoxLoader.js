import React from 'react';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function styledClimbingBoxLoader() {

  return (
    <ClimbingBoxLoader
    color={"#F8B42B"}
    loading
    css={{display: 'block', margin: 'auto'}}
    size={30} />
  );
}
