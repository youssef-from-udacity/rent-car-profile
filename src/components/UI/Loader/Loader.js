import React, { useEffect, useRef, lazy, Suspense } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const asyncClockLoader = lazy(() => {
  return import("./ClockLoader/ClockLoader");
});
const asyncClimbingBoxLoader = lazy(() => {
  return import("./ClimbingBoxLoader/ClimbingBoxLoader");
});
const asyncCircleLoader = lazy(() => {
  return import("./CircleLoader/CircleLoader");
});
const asyncBounceLoader = lazy(() => {
  return import("./BounceLoader/BounceLoader");
});
const asyncHashLoader = lazy(() => {
  return import("./HashLoader/HashLoader");
});
const asyncGridLoader = lazy(() => {
  return import("./GridLoader/GridLoader");
});
const asyncRiseLoader = lazy(() => {
  return import("./RiseLoader/RiseLoader");
});
const asyncRingLoader = lazy(() => {
  return import("./RingLoader/RingLoader");
});
const asyncSyncLoader = lazy(() => {
  return import("./SyncLoader/SyncLoader");
});
const asyncPuffLoader = lazy(() => {
  return import("./PuffLoader/PuffLoader");
});
const asyncDotLoader = lazy(() => {
  return import("./DotLoader/DotLoader");
});
const asyncBarLoader = lazy(() => {
  return import("./BarLoader/BarLoader");
});
const asyncRotateLoader = lazy(() => {
  return import("./RotateLoader/RotateLoader");
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function SimpleBackdrop(props) {
  const classes = useStyles();

  const asynCMP = useRef()


  useEffect(() => {
    const arr = [
      asyncSyncLoader,
      asyncClockLoader,
      asyncClimbingBoxLoader,
      asyncCircleLoader,
      asyncBounceLoader,
      asyncHashLoader,
      asyncGridLoader,
      asyncRiseLoader,
      asyncRingLoader,
      asyncPuffLoader,
      asyncDotLoader,
      asyncBarLoader,
      asyncRotateLoader,
    ];
    asynCMP.current = arr[Math.floor(Math.random() * arr.length)]
    // returned function will be called on component unmount 
    return () => {
      asynCMP.current = null
    }
  }, [props.toggle,props])

  return (
    <Backdrop className={classes.backdrop} open={props.toggle}>
      <Suspense fallback={<div></div>}>
        <Box component={asynCMP.current}></Box>
      </Suspense>
    </Backdrop>
  );
}
