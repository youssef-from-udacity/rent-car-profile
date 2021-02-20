/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../../store/actions/index.js";
import { makeStyles, MuiThemeProvider, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InsurancePolicyNumber, Company } from '../../../../components/UI/CustomIcons/CustomIcons';
import { NoSsr } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import { createMuiTheme } from '@material-ui/core';
import Reminder from '../../../Reminder/Reminder';
import Zoom from '@material-ui/core/Zoom';
import { useTabsContext } from '../../Tabs';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';
import cloneDeep from 'lodash.clonedeep';


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
export const customEndDateTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#dc004e',
            light: '#e33371',
            dark: '#9a0036',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#000000',
        },
    },
})
export const customStartDateTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#000000',
        },
    },
})

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        padding: theme.spacing(5, 0, 3, 0),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(5, 3, 3, 3),
        },
    },
    textField: {
        margin: theme.spacing(1, 0),
        width: '25ch',
        '& .Mui-focused svg': {
            color: theme.palette.primary.main,
        },
        [theme.breakpoints.up(475)]: {
            marginLeft: theme.spacing(2),
        },
    },
    datePickerStart: {
        color: theme.palette.success.main,
        '& svg': {
            color: theme.palette.success.main
        }
    },
    datePickerEnd: {
        color: theme.palette.error.main,
        '& svg': {
            color: theme.palette.error.main
        }
    },
    reminder: {
        color: theme.palette.warning.main,
        '& svg': {
            color: theme.palette.warning.main
        }
    },
}));


function InsuranceInputs(props) {
    const classes = useStyles();
    //const { formData, handleChange } = useDialogContext();

    const { value } = useTabsContext();

    const [formData, setFormData] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const timer = useRef()
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };


    useEffect(() => {
        setFormData({
            insuranceStartDay: {
                value: props.dataItem.insurance?.insuranceStartDay || "",
            },
            insuranceEndDay: {
                value: props.dataItem.insurance?.insuranceEndDay || "",
            },
            insuranceCompanyName: {
                value: props.dataItem.insurance?.insuranceCompanyName || "",
            },
            insurancePolicyNumber: {
                value: props.dataItem.insurance?.insurancePolicyNumber || "",
            },
            insuranceReminder: {
                value: props.dataItem.insurance?.insuranceReminder || "",
            },
            insuranceReminderSwitch: {
                value: props.dataItem.insurance?.insuranceReminderSwitch || false,
            },
        })
        props.dataItem.insurance?.insuranceStartDay ? setStartDate(new Date(parseInt(props.dataItem.insurance.insuranceStartDay))) : setStartDate(null);
        props.dataItem.insurance?.insuranceEndDay ? setEndDate(new Date(parseInt(props.dataItem.insurance.insuranceEndDay))) : setEndDate(null);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleChange = (value, name) => {
/*         const obj = {}
        Object.keys(formData).map((key) => {
            return key === name ? obj[key] = value : obj[key] = props.dataItem['insurance'][key]
        });
        props.onUpdateInfo(obj, 'insurance')
 */
        const obj = cloneDeep(formData)
        obj[name].value = value
        const obj2 = {}
        Object.keys(obj).map((key) => obj2[key] = obj[key].value);
        setFormData(obj)
        clearTimeout(timer.current)
        timer.current = setTimeout(()=>props.onUpdateInfo(cloneDeep(obj2), 'insurance'),300)
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
        handleChange(date.getTime(), 'insuranceStartDay')
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
        handleChange(date.getTime(), 'insuranceEndDay')

    };

    return (

        <div className={classes.root}>
            {formData && (
                <Zoom
                    in={value === 0}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <div>
                        <NoSsr>
                            <TextField
                                className={classes.textField}
                                id="input-insurance-company-name"
                                label="compagnie d'assurance"
                                value={formData.insuranceCompanyName.value}
                                onChange={(event) => handleChange(event.target.value, 'insuranceCompanyName')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Company />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={classes.textField}
                                id="input-insurance-number"
                                label="Numéro d'assurance"
                                value={formData.insurancePolicyNumber.value}
                                onChange={(event) => handleChange(event.target.value, 'insurancePolicyNumber')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <InsurancePolicyNumber />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </NoSsr>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                            <MuiThemeProvider theme={customStartDateTheme}>
                                <DateTimePicker
                                    className={classes.textField}
                                    margin="normal"
                                    format="MM/dd/yyyy"
                                    id="date-picker-insurance-start"
                                    label="début de l'assurance"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <TodayIcon />
                                            </InputAdornment>
                                        ),
                                        className: classes.datePickerStart,
                                    }}
                                />
                            </MuiThemeProvider>
                            <MuiThemeProvider theme={customEndDateTheme}>

                                <DateTimePicker
                                    className={classes.textField}
                                    margin="normal"
                                    id="date-picker-insurance-end"
                                    label="fin d'assurance"
                                    format="MM/dd/yyyy"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                        className: classes.datePickerEnd,
                                    }}
                                />
                            </MuiThemeProvider>
                        </MuiPickersUtilsProvider>
                        <Reminder
                            id="date-picker-insurance-reminder"
                            valueName="insuranceReminder"
                            switchName="insuranceReminderSwitch"
                            label="définir un rappel"
                            handleSwitchKeyChange={(value) => handleChange(value, "insuranceReminderSwitch")}
                            handleInputChange={(value) => handleChange(value, "insuranceReminder")}
                            switchKey={formData.insuranceReminderSwitch.value}
                            value={formData.insuranceReminder.value}
                        />
                    </div>
                </Zoom>
            )}
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceInputs);