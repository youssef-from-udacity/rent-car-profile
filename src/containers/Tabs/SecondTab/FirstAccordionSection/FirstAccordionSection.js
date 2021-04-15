import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../../store/actions/index.js";
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useTabsContext } from '../../Tabs';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import {
    EditButton, MaintenanceToDoInput, CurrentOdometerInput, MaintenanceShouldStart, OilDistance, AirFilterSwitch, OilFilterSwitch, BatteryState, CarBrakeSwitch, TimingBeltSwitch, ExhaustPipeSwitch, GearBoxOilSwitch, TiresStateSwitch, EngineSparkSwitch, GasolinFilterSwitch, SteeringLiquidSwitch,
    ReminderSwitch
} from '../../TextInputs/TextInputs';
import {cloneDeep} from 'lodash';




const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        padding: theme.spacing(5, 0, 3, 0),
        textAlign: 'center',
        minWidth: 270,
        minHeight: 600,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(5, 3, 3, 3),
        },
        '& .Mui-disabled:before': {
            borderBottomStyle: "hidden",
        },
    },
    paper: {
        margin: "10px 10px 30px 10px",
        padding: "80px 10px 30px 20px",
        position: 'relative',
        width: '100%',
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
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4caf50',
            contrastText: '#fff',
        },
    },

});

function SimpleDialog(props) {
    const classes = useStyles();

    const { onClose, open } = props;
    const { updateItemValue, defaultArr, index1 } = props.dialogProps;
    const componentToNotDelete = ["MaintenanceToDoInput", "CurrentOdometerInput",
        "MaintenanceShouldStart", "ReminderSwitch", "EditButton"]
    const transitionTheme = useTheme();
    const transitionDuration = {
        enter: transitionTheme.transitions.duration.enteringScreen,
        exit: transitionTheme.transitions.duration.leavingScreen,
    };

    const handleClose = () => {
        onClose();
    };


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <Fade
                key={index1}
                in={open}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${open ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <div>
                    <DialogTitle id="simple-dialog-title">Ajouter ou supprimer des actions</DialogTitle>
                    <Box p={1}>
                        {
                            open && defaultArr.map((obj, index2) => {
                                const index = [index1]
                                index.push(index2)
                                const props = {
                                    key: obj.ele,
                                    objProps: {
                                        updateItemValue: updateItemValue,
                                        index: index,
                                        ...obj,
                                    },
                                };
                                for (var i = 0; componentToNotDelete.length > i; i++) {
                                    if (componentToNotDelete[i] === props.key) {
                                        return false;
                                    }
                                }
                                return (
                                    <div className={classes.componentList} key={props.key}>
                                        {componentsMap[obj.ele](props)}
                                        <ThemeProvider theme={theme}>
                                            <ButtonGroup style={{
                                                margin: 12,
                                            }}>
                                                <Button
                                                    aria-label="reduce"
                                                    variant="contained"
                                                    color="secondary"
                                                    disabled={!obj.enable}
                                                    onClick={((index) => {
                                                        return function (index) {
                                                            updateItemValue(index, "enable", false);
                                                            updateItemValue(index, "switchKey", false);
                                                        }.bind(this, index)
                                                    })(index)
                                                    }
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    aria-label="increase"
                                                    disabled={obj.enable}
                                                    onClick={((index) => {
                                                        return function (index) {
                                                            updateItemValue(index, "enable", true);
                                                            updateItemValue(index, "switchKey", true);
                                                        }.bind(this, index)
                                                    })(index)
                                                    }
                                                >
                                                    <AddIcon fontSize="small" />
                                                </Button>
                                            </ButtonGroup>
                                        </ThemeProvider>
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                    </Box>
                </div>
            </Fade>
        </Dialog>

    );
}

const componentsMap = {
    EditButton: (props) => <EditButton {...props} />,
    MaintenanceToDoInput: (props) => <MaintenanceToDoInput {...props} />,
    CurrentOdometerInput: (props) => <CurrentOdometerInput {...props} />,
    MaintenanceShouldStart: (props) => <MaintenanceShouldStart {...props} />,
    OilDistance: (props) => <OilDistance {...props} />,
    AirFilterSwitch: (props) => <AirFilterSwitch {...props} />,
    OilFilterSwitch: (props) => <OilFilterSwitch {...props} />,
    BatteryState: (props) => <BatteryState {...props} />,
    CarBrakeSwitch: (props) => <CarBrakeSwitch {...props} />,
    TimingBeltSwitch: (props) => <TimingBeltSwitch {...props} />,
    ExhaustPipeSwitch: (props) => <ExhaustPipeSwitch {...props} />,
    GearBoxOilSwitch: (props) => <GearBoxOilSwitch {...props} />,
    TiresStateSwitch: (props) => <TiresStateSwitch {...props} />,
    EngineSparkSwitch: (props) => <EngineSparkSwitch {...props} />,
    GasolinFilterSwitch: (props) => <GasolinFilterSwitch {...props} />,
    SteeringLiquidSwitch: (props) => <SteeringLiquidSwitch {...props} />,
    ReminderSwitch: (props) => <ReminderSwitch {...props} />,
}
/* function flatten(value) {
    return Array.isArray(value) ? [].concat(...value.map(flatten)) : value;
}
 */
function Maintenance(props) {
    const classes = useStyles();
    const timer = useRef()
    const { value } = useTabsContext();
    const [openDialog, setOpenDialog] = React.useState({
        open: false,
        dialogProps: {},
    });
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const handleClickOpenDialog = (dialogProps) => {
        setOpenDialog({
            open: true,
            dialogProps: { ...dialogProps },
        });
    };

    const handleCloseDialog = () => {
        setOpenDialog({
            open: false,
            dialogProps: {},
        });
    };
    const [defaultArr, setDefaultArr] = useState([]);


    useEffect(() => {
        const arr = props.dataItem.maintenance ? [...props.dataItem.maintenance] : [
            [
                { ele: "EditButton", enable: true },
                { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 10 000", value: '', },
                { ele: "CurrentOdometerInput", enable: true, value: '', },
                { ele: "MaintenanceShouldStart", enable: true, switchKey: true },
                { ele: "OilDistance", enable: true, switchKey: true },
                { ele: "AirFilterSwitch", enable: true, switchKey: true },
                { ele: "OilFilterSwitch", enable: true, switchKey: true },
                { ele: "BatteryState", enable: false, switchKey: false },
                { ele: "CarBrakeSwitch", enable: false, switchKey: false },
                { ele: "TimingBeltSwitch", enable: false, switchKey: false },
                { ele: "ExhaustPipeSwitch", enable: false, switchKey: false },
                { ele: "GearBoxOilSwitch", enable: false, switchKey: false },
                { ele: "TiresStateSwitch", enable: false, switchKey: false },
                { ele: "EngineSparkSwitch", enable: false, switchKey: false },
                { ele: "GasolinFilterSwitch", enable: false, switchKey: false },
                { ele: "SteeringLiquidSwitch", enable: false, switchKey: false },
                { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', },
            ],
            [
                { ele: "EditButton", enable: true },
                { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 30 000", value: '', },
                { ele: "CurrentOdometerInput", enable: true, value: '', },
                { ele: "MaintenanceShouldStart", enable: true, switchKey: true },
                { ele: "OilDistance", enable: false, switchKey: false },
                { ele: "AirFilterSwitch", enable: false, switchKey: false },
                { ele: "OilFilterSwitch", enable: false, switchKey: false },
                { ele: "BatteryState", enable: true, switchKey: true },
                { ele: "CarBrakeSwitch", enable: true, switchKey: true },
                { ele: "TimingBeltSwitch", enable: true, switchKey: true },
                { ele: "ExhaustPipeSwitch", enable: true, switchKey: true },
                { ele: "GearBoxOilSwitch", enable: true, switchKey: true },
                { ele: "TiresStateSwitch", enable: true, switchKey: true },
                { ele: "EngineSparkSwitch", enable: false, switchKey: false },
                { ele: "GasolinFilterSwitch", enable: false, switchKey: false },
                { ele: "SteeringLiquidSwitch", enable: false, switchKey: false },
                { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', },
            ],
            [
                { ele: "EditButton", enable: true },
                { ele: "MaintenanceToDoInput", enable: true, placeholder: "ex: 60 000", value: '', },
                { ele: "CurrentOdometerInput", enable: true, value: '', },
                { ele: "MaintenanceShouldStart", enable: true, switchKey: true },
                { ele: "OilDistance", enable: false, switchKey: false },
                { ele: "AirFilterSwitch", enable: false, switchKey: false },
                { ele: "OilFilterSwitch", enable: false, switchKey: false },
                { ele: "BatteryState", enable: false, switchKey: false },
                { ele: "CarBrakeSwitch", enable: false, switchKey: false },
                { ele: "TimingBeltSwitch", enable: false, switchKey: false },
                { ele: "ExhaustPipeSwitch", enable: false, switchKey: false },
                { ele: "GearBoxOilSwitch", enable: false, switchKey: false },
                { ele: "TiresStateSwitch", enable: false, switchKey: false },
                { ele: "EngineSparkSwitch", enable: true, switchKey: true },
                { ele: "GasolinFilterSwitch", enable: true, switchKey: true },
                { ele: "SteeringLiquidSwitch", enable: true, switchKey: true },
                { ele: "ReminderSwitch", enable: true, switchKey: false, value: '', },
            ],
        ];

        setDefaultArr(arr);


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateItemValue = (index, name, value) => {
        const copyDefaultArr = [...defaultArr];
        if (copyDefaultArr[index[0]][index[1]]["ele"] === 'CurrentOdometerInput') {
            copyDefaultArr.map((arr) => arr[index[1]][name] = value)
            setDefaultArr(cloneDeep(copyDefaultArr))
            clearTimeout(timer.current)
            timer.current = setTimeout(() => props.onUpdateInfo(cloneDeep(copyDefaultArr), 'maintenance'), 300)
            return;
        }
        copyDefaultArr[index[0]][index[1]][name] = value;
        setDefaultArr(copyDefaultArr)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => props.onUpdateInfo(cloneDeep(copyDefaultArr), 'maintenance'), 300)
        return;
    }


    return (

        <div className={classes.root}>
            {
                defaultArr.map((element, index1) => {

                    return element.length !== 0 && (<Fade
                        key={index1}
                        in={value === 1}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: `${value === 1 ? transitionDuration.exit : 0}ms`,
                        }}
                        unmountOnExit
                    >
                        <Paper square className={classes.paper} elevation={11}>

                            {element.map((obj, index2) => {
                                const index = [index1]
                                index.push(index2)
                                const props = {
                                    key: `${obj?.ele}-${index1}-${index2}`,
                                    objProps: {
                                        updateItemValue: updateItemValue,
                                        handleClickOpenDialog: handleClickOpenDialog,
                                        MaintenanceToDoInputValue: defaultArr[index1][1]?.value,
                                        CurrentOdometerInputValue: defaultArr[index1][2]?.value,
                                        defaultArr: element,
                                        index1: index1,
                                        placeholder: obj?.placeholder,
                                        index: index,
                                        ...obj,
                                    },
                                };
                                return obj?.enable ? componentsMap[obj?.ele](props) : null
                            })}

                        </Paper>
                    </Fade>
                    )

                })
            }

            <SimpleDialog
                open={openDialog.open}
                onClose={handleCloseDialog}
                dialogProps={openDialog.dialogProps}
            />

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
        onStartRendering: () => dispatch(actions.triggerLoadingToTrue()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance);