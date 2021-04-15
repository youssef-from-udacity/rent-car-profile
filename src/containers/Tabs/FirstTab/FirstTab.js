import React, { lazy, Suspense, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { CarInformation, CarInsurance } from '../../../components/UI/CustomIcons/CustomIcons';

const AsyncFirstAccordionSection = lazy(() => {
  return import('./FirstAccordionSection/FirstAccordionSection');
});
const AsyncSecondAccordionSection = lazy(() => {
  return import('./SecondAccordionSection/SecondAccordionSection');
}); 
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up(590)]: {
      padding: theme.spacing(2),
    },
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  titleIcon: {
    marginRight: 10,
    height: 40,
    width: 40,
    verticalAlign: 'bottom',
  },
  fullBack: {
    width: '100%',
    minHeight: 330,
},
}));

export default function FirstTab(props) {
  const [expanded, setExpanded] = React.useState('panel1');
  const [load, setLoad] = React.useState(false);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles();
  
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    props.panel ? setExpanded(props.panel) : null
    let timer = setTimeout(()=>setLoad(true),500)
    return () =>{
      clearTimeout(timer)
      setLoad(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography><CarInformation className={classes.titleIcon} />INFORMATION</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Suspense fallback={<div className={classes.fullBack}></div>}>
            <AsyncFirstAccordionSection />
          </Suspense>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography><CarInsurance className={classes.titleIcon} />ASSURANCE</Typography>
        </AccordionSummary>
        {load && <AccordionDetails>
          <Suspense fallback={<div className={classes.fullBack}></div>}>
            <AsyncSecondAccordionSection />
          </Suspense>
        </AccordionDetails>}
      </Accordion>
      <Accordion square>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography></Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}