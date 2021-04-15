import React, { createContext, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index.js";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { CarRepairIcon } from '../../components/UI/CustomIcons/CustomIcons';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FirstTab from './FirstTab/FirstTab';
import SecondTab from './SecondTab/SecondTab';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    padding: theme.spacing(5, 1, 1, 1),
    [theme.breakpoints.up(400)]: {
      padding: theme.spacing(5, 3, 3, 3),
    },
  }
}));


function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.tabPanel}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


export const itemContext = createContext();

export function useTabsContext() {
  return useContext(itemContext)
}
function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const mounted = useRef();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setShow(false)

    setTimeout(()=>setShow(true), 350)
    if (value === 1) {
      props.onStartRendering();
      setTimeout(props.onFinishRendering, 1000)
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    props.dataItem.notification?.tab ? setValue(props.dataItem.notification.tab) : null
    //props.onRemoveUserDataItemProperties()


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
      if (!mounted.current) {
          // do componentDidMount logic
          mounted.current = 1;
      } else if(mounted.current === 1) {
          mounted.current = 2
          // only once on component did update
          props.onRemoveUserDataItemNotification()
      }
  });

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="scrollable force tabs example"
        >
          <Tab label="profil de voiture" icon={<DriveEtaIcon />} {...a11yProps(0)} />
          <Tab label="garage" icon={<CarRepairIcon />} {...a11yProps(1)} />
          <Tab label="dépenses" icon={<AttachMoneyIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <itemContext.Provider value={{ value: value }}>

        <TabPanel value={value} index={0} >
          {show && <FirstTab value={value} panel={props.dataItem.notification?.panel} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {show && <SecondTab />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
      </TabPanel>
      </itemContext.Provider>
    </div>
  );
}
const mapStateToProps = state => {
  return {
      dataItem: state.user.dataItem,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateInfo: (value, name) => dispatch(actions.updateUserDataItemProperty(value, name)),
    onStartRendering: () => dispatch(actions.triggerLoadingToTrue()),
    onFinishRendering: () => dispatch(actions.triggerLoadingToFalse()),
    onRemoveUserDataItemNotification: () => dispatch(actions.removeUserDataItemNotification()),


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableTabsButtonForce);