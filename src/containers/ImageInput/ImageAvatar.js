import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  CarAvatar } from '../Tabs/CustomIcons';
import Fab from '@material-ui/core/Fab';
import PublishIcon from '@material-ui/icons/Publish';
import { itemContext } from '../Cards/Cards';



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


export default function ImageAvatar() {
    const classes = useStyles();

    return (
        <itemContext.Consumer>{(context) => (
            <>
                {context.item.avatarURL ? (<img className={classes.img} alt="complex" src={context.item.avatarURL} />) :
                    (<CarAvatar />)}

                <Fab className={classes.fab} component="div" color="default" aria-label="add">
                    <PublishIcon />
                </Fab>
            </>
        )}
        </itemContext.Consumer>

    );
}