import React, { useContext, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Tabs from '../Tabs/Tabs';


export const itemContext = createContext();

export function useDialogContext() {
  return useContext(itemContext)
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function FullScreenDialog(props) {
  const classes = useStyles();


  return (
      <Dialog fullScreen open={props.open} onClose={props.close} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.close} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Close
            </Typography>
            <Button autoFocus color="inherit" onClick={props.updateUserData}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {props.open && <Tabs />}
        </List>
      </Dialog>
  );
}


export default FullScreenDialog;