import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    CarBattery, CarBrake, OdoMeter, CarInspection, Tire, EngineSpark, SteeringLiquid,
    ExhaustPipe, TimingBelt, GearBox, GasolinFilter, EnginOil, AirFilter, OilFilter
} from '../../../../components/UI/CustomIcons/CustomIcons';
import { NoSsr } from '@material-ui/core';
import clsx from 'clsx';
import { useDialogContext } from '../../../dialog/dialog';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Reminder from '../../../Reminder/Reminder';


const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        padding: theme.spacing(5, 0, 3, 0),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(5, 3, 3, 3),
        },
        '& .Mui-disabled:before': {
            borderBottomStyle: "hidden",
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
        '& svg': {
            color: theme.palette.success.main
        }
    },
    datePickerEnd: {
        '& svg': {
            color: theme.palette.error.main
        }
    },
    reminder: {
        '& svg': {
            color: theme.palette.warning.main
        }
    },
    disabledButton: {
        backgroundColor: theme.palette.primary.contrastText,
        position: "absolute",
        top: 0,
        transform: "translateY(-50%)",
        [theme.breakpoints.down('sm')]: {
            left: theme.spacing(2),
        },
    },
    imageContainer: {
        position: 'relative',
        display: "inline-block",
        marginLeft: "10px",
        marginBottom: "10px",
        width: "20em",
        height: 160,
        overflow: 'hidden',
        border: '10px solid transparent',
        [theme.breakpoints.up(590)]: {
            float: 'left',
        },
    },
    img: {
        width: '100%',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
    },
    paper: {
        margin: "10px 10px 30px 10px",
        padding: "30px 10px"
    },
    title: {
        marginBottom: 20,
        marginLeft: 10,
        textAlign: "left",
    },
    inspectionStart: {
        color: theme.palette.error.main,
        '& svg': {
            color: theme.palette.error.main
        },
    }
}));


export default function InputWithIcon(props) {
    const classes = useStyles();
    const { formData, handleChange } = useDialogContext();



    return (

        <div className={classes.root}>
            {formData && (
                <>

                    <Paper square className={classes.paper} elevation={11}>
                        <NoSsr>
                            <div className={classes.title}>
                                <TextField
                                    className={classes.textField}
                                    id="input-with-icon-firstMaintenance"
                                    label="Entretien à faire tous les"
                                    placeholder="ex: 10 000"
                                    value={formData.firstMaintenance.value}
                                    onChange={(event) => handleChange(event.target.value, 'firstMaintenance')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CarInspection />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                    }}
                                />
                            </div>
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={classes.textField}
                                id="input-with-icon-odoMeter"
                                label="kilométrage actuel"
                                value={formData.odometer.value}
                                onChange={(event) => handleChange(event.target.value, 'odometer')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <OdoMeter />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.oilChangeStart)}
                                id="input-with-engin-oil-end"
                                label="dû dans"
                                disabled={!formData.firstMaintenance.value}
                                value={(() => {
                                    const odoMeter = formData.odometer.value ? parseInt(formData.odometer.value) : 0;
                                    const firstMaintenanceStart = formData.firstMaintenance.value ? parseInt(formData.firstMaintenance.value) : 0;
                                    return odoMeter + firstMaintenanceStart
                                })()}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CarInspection />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-engin-oil-start"
                                label="vidange moteur"
                                disabled={formData.oilDistance.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                checked={formData.oilDistance.value === 'true'}
                                                onChange={() => handleChange((formData.oilDistance.value !== 'true').toString(), 'oilDistance')} />
                                            <EnginOil style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <Reminder
                            id="date-picker-oil-change-reminder"
                            valueName="oilChangeReminder"
                            switchName="oilChangeReminderSwitch"
                            label="définir un rappel"
                            handleChange={handleChange}
                            switch={formData.oilChangeReminderSwitch.value}
                            value={formData.oilChangeReminder.value}
                        />
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-carAirFilter"
                                label="Air Filter"
                                disabled={formData.airFilterSwitch.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                checked={formData.airFilterSwitch.value === 'true'}
                                                onChange={() => handleChange((formData.airFilterSwitch.value !== 'true').toString(), 'airFilterSwitch')} />
                                            <AirFilter style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-carOilFilter"
                                label="Oil Filter"
                                disabled={formData.oilFilterSwitch.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="primary"
                                                checked={formData.oilFilterSwitch.value === 'true'}
                                                onChange={() => handleChange((formData.oilFilterSwitch.value !== 'true').toString(), 'oilFilterSwitch')} />
                                            <OilFilter style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                    </Paper>
                    <Paper square className={classes.paper} elevation={11}>
                        <NoSsr>
                            <div className={classes.title}>
                                <TextField
                                    className={classes.textField}
                                    id="input-with-first-Maintenance"
                                    label="Entretien à faire tous les"
                                    placeholder="30 000"
                                    value={formData.firstMaintenance.value}
                                    onChange={(event) => handleChange(event.target.value, 'firstMaintenance')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CarInspection />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                    }}
                                />
                            </div>
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={classes.textField}
                                id="input-with-icon-odoMeter2"
                                label="kilométrage actuel"
                                value={formData.odometer.value}
                                onChange={(event) => handleChange(event.target.value, 'odometer')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <OdoMeter />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.inspectionStart)}
                                id="input-with-firstMaintenanceStart"
                                label="dû dans"
                                disabled={!formData.firstMaintenance.value}
                                value={(() => {
                                    const odoMeter = formData.odometer.value ? parseInt(formData.odometer.value) : 0;
                                    const firstMaintenanceStart = formData.firstMaintenance.value ? parseInt(formData.firstMaintenance.value) : 0;
                                    return odoMeter + firstMaintenanceStart
                                })()}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CarInspection />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                }}
                            />
                        </NoSsr>

                        <NoSsr>

                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-batteryState"
                                label="l'état de la batterie"
                                disabled={formData.batteryState.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="primary"
                                                checked={formData.batteryState.value === 'true'}
                                                onChange={() => handleChange((formData.batteryState.value !== 'true').toString(), 'batteryState')} />
                                            <CarBattery style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-carBrake"
                                label="le liquide et plaquettes de freins"
                                disabled={formData.carBrake.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="secondary"
                                                checked={formData.carBrake.value === 'true'}
                                                onChange={() => handleChange((formData.carBrake.value !== 'true').toString(), 'carBrake')} />
                                            <CarBrake style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-timingBelt"
                                label="des courroies de distribution"
                                disabled={formData.timingBelt.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="primary"
                                                checked={formData.timingBelt.value === 'true'}
                                                onChange={() => handleChange((formData.timingBelt.value !== 'true').toString(), 'timingBelt')} />
                                            <TimingBelt style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-exhaustPipe"
                                label="la ligne d'échappement"
                                disabled={formData.exhaustPipe.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="secondary"
                                                checked={formData.exhaustPipe.value === 'true'}
                                                onChange={() => handleChange((formData.exhaustPipe.value !== 'true').toString(), 'exhaustPipe')} />
                                            <ExhaustPipe style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-gearBoxOil"
                                label="niveau d'huile de la boîte de vitesses"
                                disabled={formData.gearBoxOil.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="secondary"
                                                checked={formData.gearBoxOil.value === 'true'}
                                                onChange={() => handleChange((formData.gearBoxOil.value !== 'true').toString(), 'gearBoxOil')} />
                                            <GearBox style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-tiresState"
                                label="Les pneus"
                                disabled={formData.tiresState.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="primary"
                                                checked={formData.tiresState.value === 'true'}
                                                onChange={() => handleChange((formData.tiresState.value !== 'true').toString(), 'tiresState')} />
                                            <Tire style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                    </Paper>
                    <Paper square className={classes.paper} elevation={11}>
                        <NoSsr>
                            <div className={classes.title}>
                                <TextField
                                    className={classes.textField}
                                    id="input-with-secondMaintenance"
                                    label="Entretien à faire tous les"
                                    placeholder="60 000"
                                    value={formData.secondMaintenance.value}
                                    onChange={(event) => handleChange(event.target.value, 'secondMaintenance')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CarInspection />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                    }}
                                />
                            </div>
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={classes.textField}
                                id="input-with-icon-odoMeter3"
                                label="kilométrage actuel"
                                value={formData.odometer.value}
                                onChange={(event) => handleChange(event.target.value, 'odometer')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <OdoMeter />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.inspectionStart)}
                                id="input-with-secondMaintenanceStart"
                                label="dû dans"
                                disabled={!formData.secondMaintenance.value}
                                value={(() => {
                                    const odoMeter = formData.odometer.value ? parseInt(formData.odometer.value) : 0;
                                    const secondMaintenanceStart = formData.secondMaintenance.value ? parseInt(formData.oilDistance.value) : 0;
                                    return odoMeter + secondMaintenanceStart
                                })()}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CarInspection />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (<InputAdornment position="end">Km</InputAdornment>)
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-engineSpark"
                                label="Changement des bougies d'allumage"
                                disabled={formData.engineSpark.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="secondary"
                                                checked={formData.engineSpark.value === 'true'}
                                                onChange={() => handleChange((formData.engineSpark.value !== 'true').toString(), 'engineSpark')} />
                                            <EngineSpark style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-GasolinFilter"
                                label="Changement du filtre à gazole"
                                disabled={formData.gasolinFilter.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="primary"
                                                checked={formData.gasolinFilter.value === 'true'}
                                                onChange={() => handleChange((formData.gasolinFilter.value !== 'true').toString(), 'gasolinFilter')} />
                                            <GasolinFilter style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                        <NoSsr>
                            <TextField
                                className={clsx(classes.textField, classes.airFilter)}
                                id="input-with-icon-SteeringLiquid"
                                label="Vérifier le liquide (ou fluide) de direction"
                                disabled={formData.steeringLiquid.value !== 'true'}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Switch
                                                color="secondary"
                                                checked={formData.steeringLiquid.value === 'true'}
                                                onChange={() => handleChange((formData.steeringLiquid.value !== 'true').toString(), 'steeringLiquid')} />
                                            <SteeringLiquid style={{ marginLeft: "8ch", }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </NoSsr>
                    </Paper>

                </>
            )}
        </div>

    );
}
