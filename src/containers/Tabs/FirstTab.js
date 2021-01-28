import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CarIcon, CarLicensePlate, OdoMeter, HorsePower, CarAvatar } from './CustomIcons';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import PublishIcon from '@material-ui/icons/Publish';
import { NoSsr } from '@material-ui/core';
import { updateObject } from '../../shared/utility';
import clsx from 'clsx';
import { itemContext } from '../Cards/Cards';
import ImageInput from '../ImageInput/ImageInput.js';



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
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        width: '25ch',
        '& .Mui-focused svg': {
            color: theme.palette.primary.main,
        },
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
        width: "25ch",
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
    fab: {
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: "5px",
    },
}));


export default function InputWithIcon() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        name: {
            value: '',
        },
        plate: {
            value: '',
        },
        odometer: {
            value: '',
        },
        energy: {
            value: 'gasolin',
            options: [
                {
                    value: 'deisel',
                    label: 'Deisel',

                },
                {
                    value: 'gasolin',
                    label: 'Gasolin',
                },
                {
                    value: 'electric',
                    label: 'Electric',
                }
            ]
        },
        power: {
            value: '',
            options: [
                {
                    value: '5',
                    label: '5 V',
                },
                {
                    value: '6',
                    label: '6 V',
                },
                {
                    value: '7',
                    label: '7 V',
                },
                {
                    value: '8',
                    label: '8 V',
                },
                {
                    value: '9',
                    label: '9 V',
                },
            ]
        },

    });
    const handleChange = (event, name) => {
        const updatedFormValue = updateObject(state[name], { value: event.target.value });
        const updatedState = updateObject(state, { [name]: updatedFormValue })
        setState(updatedState);
    };

    return (
        <itemContext.Consumer>{context => (
            <div className={clsx('clearfix', classes.root)}>
                    <Paper className={classes.imageContainer} elevation={3}>
                        <ButtonBase style={{ position: 'static',width: '100%',height: '100%' }}>
                            {/* {context.item.avatarURL ? (<img className={classes.img} alt="complex" src={context.item.avatarURL} />) :
                                (<CarAvatar />)}

                            <Fab className={classes.fab} component="div" color="default" aria-label="add">
                                <PublishIcon />
                            </Fab> */}
                        <ImageInput
                            name='avatarURL'
                            maxHeight={330}
                            style={{ display: 'block' }}
                        />
                        </ButtonBase>
                    </Paper>

                    <NoSsr>
                        <TextField
                            className={classes.textField}
                            id="input-with-icon-carIcon"
                            label="nom de la voiture"
                            value={state.name.value}
                            onChange={(event) => handleChange(event, 'name')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CarIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </NoSsr>
                    <NoSsr>
                        <TextField
                            className={classes.textField}
                            id="input-with-icon-carLicensePlate"
                            label="Plaque d'immatriculation"
                            value={state.plate.value}
                            onChange={(event) => handleChange(event, 'plate')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CarLicensePlate />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </NoSsr>
                    <NoSsr>
                        <TextField
                            className={classes.textField}
                            id="input-with-icon-odoMeter"
                            label="odomètre actuel"
                            value={state.odometer.value}
                            onChange={(event) => handleChange(event, 'odometer')}
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
                            className={classes.textField}
                            id="select-Energy"
                            label="Energy"
                            select
                            value={state.energy.value}
                            onChange={(event) => handleChange(event, 'energy')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalGasStationIcon />
                                    </InputAdornment>
                                )
                            }}
                        >
                            {state.energy.options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </NoSsr>
                    <NoSsr>
                        <TextField
                            className={classes.textField}
                            id="select-Puissance"
                            label="Puissance"
                            select
                            value={state.power.value}
                            onChange={(event) => handleChange(event, 'power')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HorsePower />
                                    </InputAdornment>
                                )
                            }}
                        >
                            {state.power.options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </NoSsr>
            </div>
        )}

        </itemContext.Consumer>
    );
}
