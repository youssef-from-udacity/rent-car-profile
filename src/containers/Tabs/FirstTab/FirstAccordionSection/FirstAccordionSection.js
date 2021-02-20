import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../../store/actions/index.js";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CarIcon, CarLicensePlate, HorsePower } from '../../../../components/UI/CustomIcons/CustomIcons';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { NoSsr } from '@material-ui/core';
import clsx from 'clsx';
import ImageInput from '../../../ImageInput/ImageInput';
import Zoom from '@material-ui/core/Zoom';
import { useTabsContext } from '../../Tabs';
import cloneDeep from 'lodash.clonedeep';


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
        maxWidth: "20em",
        width: "90%",
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


function InformationInputs(props) {
    const classes = useStyles();
    const [formData, setFormData] = useState();
    const timer = useRef()

    const { value } = useTabsContext();
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const handleChange = (value, name) => {
        const obj = cloneDeep(formData)
        obj[name].value = value
        const obj2 = {}
        Object.keys(obj).map((key) => obj2[key] = obj[key].value);
        setFormData(obj)
        clearTimeout(timer.current)
        timer.current = setTimeout(()=>props.onUpdateInfo(cloneDeep(obj2), 'information'),300)
    }

    useEffect(() => {
        setFormData({
            avatarURL: {
                value: props.dataItem.information.avatarURL || "",
            },
            name: {
                value: props.dataItem.information.name || "",
            },
            plate: {
                value: props.dataItem.information.plate || "",
            },
            odometer: {
                value: props.dataItem.information.odometer || "",
            },
            energy: {
                value: props.dataItem.information.energy || "",
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
                value: props.dataItem.information.power || "",
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

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <div className={clsx('clearfix', classes.root)}>
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
                        <Paper className={classes.imageContainer} elevation={3}>
                            <ButtonBase style={{ position: 'static', width: '100%', height: '100%' }}>
                                <ImageInput
                                    name='avatarURL'
                                    maxHeight={330}
                                    avatarURL={formData.avatarURL.value}
                                    fileChange={handleChange}
                                    style={{ display: 'block' }}
                                />
                            </ButtonBase>
                        </Paper>

                        <NoSsr>
                            <TextField
                                className={classes.textField}
                                id="input-with-icon-carIcon"
                                label="nom de la voiture"
                                value={formData.name.value}
                                onChange={(event) => handleChange(event.target.value, 'name')}
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
                                value={formData.plate.value}
                                onChange={(event) => handleChange(event.target.value, 'plate')}
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
                                id="select-Energy"
                                label="Energy"
                                select
                                value={formData.energy.value}
                                onChange={(event) => handleChange(event.target.value, 'energy')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalGasStationIcon />
                                        </InputAdornment>
                                    )
                                }}
                            >
                                {formData.energy.options.map((option) => (
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
                                value={formData.power.value}
                                onChange={(event) => handleChange(event.target.value, 'power')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HorsePower />
                                        </InputAdornment>
                                    )
                                }}
                            >
                                {formData.power.options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </NoSsr>
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

export default connect(mapStateToProps, mapDispatchToProps)(InformationInputs);