import React, { createContext, useContext } from 'react';
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
export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <FirstTab value={value} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SecondTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
      </TabPanel>
      </itemContext.Provider>
    </div>
  );
}
