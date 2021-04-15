import React, { useEffect, useRef, lazy, Suspense } from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

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


const Dialog = withStyles({
  paper: {
    backgroundColor: "transparent",
    margin: 0,
    boxShadow: 'none',
    overflow: 'hidden',
    width: "100%",
    height: "100%",
  },
})(MuiDialog);
export default function SimpleBackdrop(props) {

  const asynCMP = useRef({
    component: null,
    randomIndex: 0,
  })

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
    // eslint-disable-next-line no-unused-expressions
    asynCMP.current.randomIndex = !props.toggle ? Math.floor(Math.random() * arr.length) : asynCMP.current.randomIndex;
    asynCMP.current.component = arr[asynCMP.current.randomIndex];
    // returned function will be called on component unmount 
    return () => {
      asynCMP.current = {
        component: arr[asynCMP.current.randomIndex],
        randomIndex: asynCMP.current.randomIndex,
      }
    }
  }, [props.toggle, props])

  return (
    <Dialog
      open={props.toggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
        <Suspense fallback={<div></div>}>
          <Box component={asynCMP.current.component}></Box>
        </Suspense>
    </Dialog>
  );
}
