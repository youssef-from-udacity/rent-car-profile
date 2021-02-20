/* eslint-disable no-unused-expressions */
import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    CarBattery, CarBrake, OdoMeter, CarInspection, Tire, EngineSpark, SteeringLiquid,
    ExhaustPipe, TimingBelt, GearBox, GasolinFilter, EnginOil, AirFilter, OilFilter
} from '../../../components/UI/CustomIcons/CustomIcons';
import { NoSsr } from '@material-ui/core';
import clsx from 'clsx';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Reminder from '../../Reminder/Reminder';
import EditIcon from '@material-ui/icons/Edit';

const randomId = () => Math.random().toString(36).substr(-8)
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
        padding: "80px 10px 30px 10px",
        position: 'relative',
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
    },
    editButton: {
        margin: 15,
        width: 80,
        height: 60,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: "#fff"
    },
    componentList: {
        display: "flex",
        justifyContent: "center",
        margin: "10px 0",
        flexShrink: "initial",
        alignItems: "flex-end",
        flexWrap: "wrap",
    }
}));

export function MaintenanceToDoInput(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, value, updateItemValue, placeholder } = objProps
    return (
        <NoSsr>
            <div className={classes.title}>
                <TextField
                    className={classes.textField}
                    style={{marginLeft: 0}}
                    id={randomId()}
                    label="Entretien à faire tous les"
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => updateItemValue(index, "value", event.target.value)}
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
    )
}
export function CurrentOdometerInput(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, value, updateItemValue } = objProps

    return (
        <NoSsr>
            <TextField
                className={classes.textField}
                id={randomId()}
                label="kilométrage actuel"
                value={value}
                onChange={(event) => updateItemValue(index, "value", event.target.value)}
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
    )
}
export function MaintenanceSouldStart(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { MaintenanceToDoInputValue, CurrentOdometerInputValue } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.oilChangeStart)}
                id={randomId()}
                label="dû dans"
                disabled={!MaintenanceToDoInputValue}
                value={(() => {
                    const odoMeter = CurrentOdometerInputValue ? parseInt(CurrentOdometerInputValue) : 0;
                    const firstMaintenanceStart = MaintenanceToDoInputValue ? parseInt(MaintenanceToDoInputValue) : 0;
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
    )
}
export function OilDistance(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="vidange moteur"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <EnginOil style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function AirFilterSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps

    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="Air Filter"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <AirFilter style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function OilFilterSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="Oil Filter"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="primary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <OilFilter style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function BatteryState(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="l'état de la batterie"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="primary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <CarBattery style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function CarBrakeSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="le liquide et plaquettes de freins"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="secondary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <CarBrake style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function TimingBeltSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="des courroies de distribution"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="primary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <TimingBelt style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function ExhaustPipeSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="la ligne d'échappement"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="secondary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <ExhaustPipe style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function GearBoxOilSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="niveau d'huile de la boîte de vitesses"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="secondary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <GearBox style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function TiresStateSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="Les pneus"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="primary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <Tire style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function EngineSparkSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="Changement des bougies d'allumage"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="secondary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <EngineSpark style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function GasolinFilterSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="Changement du filtre à gazole"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="primary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <GasolinFilter style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function SteeringLiquidSwitch(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { index, updateItemValue, switchKey } = objProps
    return (
        <NoSsr>
            <TextField
                className={clsx(classes.textField, classes.airFilter)}
                id={randomId()}
                label="Vérifier le liquide (ou fluide) de direction"
                disabled={!switchKey}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <Switch
                                color="secondary"
                                checked={switchKey}
                                onChange={() => updateItemValue(index, "switchKey", !switchKey)} />
                            <SteeringLiquid style={{ marginLeft: "8ch", }} />
                        </InputAdornment>
                    ),
                }}
            />
        </NoSsr>
    )
}
export function ReminderSwitch(prop) {
    const { objProps } = prop
    const { index, value, switchKey, updateItemValue } = objProps
    return (
        <Reminder
           
            id={randomId()}
            label="définir un rappel"
            handleSwitchKeyChange={(value) => updateItemValue(index, "switchKey", value)}
            handleInputChange={(value) => updateItemValue(index, "value", value)}
            switchKey={switchKey}
            value={value}
        />
    )
}
export function EditButton(prop) {
    const classes = useStyles();
    const { objProps } = prop
    const { handleClickOpenDialog, updateItemValue, defaultArr, index1 } = objProps
    const dialogProps = {
        updateItemValue,
        defaultArr,
        index1,
    }

    return (

        <Button
           
            variant="contained"
            color="default"
            className={classes.editButton}
            startIcon={<EditIcon />}
            onClick={() => handleClickOpenDialog(dialogProps)}
        >
            Edit
        </Button>
    )
}