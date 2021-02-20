import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { CarCheckService } from '../../../components/UI/CustomIcons/CustomIcons';
import FirstAccordionSection from './FirstAccordionSection/FirstAccordionSection';

  
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
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  titleIcon: {
    marginRight: 10,
    height: 40,
    width: 40,
    verticalAlign: 'bottom',
  },
}));

export default function FirstTab(props) {
  const classes = useStyles();
  return (
    <div>
      <Accordion square defaultExpanded>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography><CarCheckService className={classes.titleIcon} />ENTRETIEN</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FirstAccordionSection />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}