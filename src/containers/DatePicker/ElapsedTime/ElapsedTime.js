import React from 'react';
import Alert from '@material-ui/lab/Alert';


function display(endTime) {

    if (!endTime) {
        return '';
    }
    // time difference in ms
    var timeDiff = endTime - new Date();

    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    //const seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    const minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    const hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    const days = timeDiff;
    const daysText = days > 1 ? ' jours,' : ' jour,';
    const time = days + daysText + hours + "h " + minutes + "m ";

    return time;
}

export default function TimeElapsed({ endDate }) {

    return endDate > new Date() ? (<Alert variant="filled" severity="warning">{display( endDate)}</Alert>) :
        <Alert variant="filled" severity="success">disponible</Alert>;
}