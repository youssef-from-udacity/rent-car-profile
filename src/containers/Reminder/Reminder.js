import React/* , { useEffect } */ from 'react';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export const customReminderTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff9800',
            light: '#ffb74d',
            dark: '#f57c00',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#000000',
        },
    },
})

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        width: '25ch',
        '& .Mui-focused svg': {
            color: theme.palette.primary.main,
        },
    },
    reminder: {
        color: theme.palette.warning.main,
        '& svg': {
            color: theme.palette.warning.main
        },
        '&.Mui-disabled svg': {
            color: theme.palette.grey[300],
        },
        '&.Mui-disabled:before': {
            borderBottomStyle: "hidden",
        },
    },
    reminderWrapper: {
        display: 'inline',
        position: 'relative',
        '& label': {
            marginLeft: 50,
        },
        '& .reminderSwitch': {
            marginLeft: -10,
            position: "absolute",
            left: 15,
            top: -5,
        },
    },
}));


export default function Remider(props) {
    const classes = useStyles();
    const { handleInputChange, handleSwitchKeyChange,switchKey, /* value, */ id, label } = props;
    const [reminder, setReminder] = React.useState();
    const [switchState, setSwitchState] = React.useState(switchKey);

    const handleSwitchChange = () => {
        setSwitchState(!switchState);
        handleSwitchKeyChange(!switchState)
    };
    const handleReminderChange = (date) => {
        setReminder(date);
        handleInputChange(date.getTime())
    };
/*     useEffect(() => {
        if (value && parseInt(value) > new Date().getTime()) {
            switchKey ? setSwitchState(true) : setSwitchState(false);
            setReminder(new Date(parseInt(value)))
        } else {
            setReminder(null);
            setSwitchState(false);
            handleSwitchKeyChange(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) */
    return (

        <MuiThemeProvider theme={customReminderTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                <div className={classes.reminderWrapper}>
                    <DateTimePicker
                        className={classes.textField}
                        margin="normal"
                        id={id}
                        label={label}
                        format="MM/dd/yyyy"
                        value={reminder}
                        disablePast
                        disabled={!switchState}
                        onChange={handleReminderChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddAlertIcon />
                                </InputAdornment>
                            ),
                            className: classes.reminder,
                        }} />

                    <FormControlLabel
                        className="reminderSwitch"
                        control={<Switch color="primary" checked={switchState} onChange={handleSwitchChange} />}
                    />
                </div>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}
