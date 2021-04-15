import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import { makeStyles } from '@material-ui/core/styles';
import { cloneDeep } from 'lodash';
import { updateObject } from '../../shared/utility';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SwipeableTemporaryDrawer from '../SideDrawer/SideDrawer';
import { Link as RouterLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { CarLogo } from '../../components/UI/CustomIcons/CustomIcons';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';



const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        width: "100%",
        position: "relative",
        [theme.breakpoints.up('sm')]: {
            width: "auto",
        },
        '& button': {
            margin: "auto",
            display: 'block',
            fontWeight: 900,
            height: "60px",
            padding: "10px 20px",
            position: "relative",
            width: "125px",
            '& svg': {
                fontSize: "5rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "150px",
            },
            [theme.breakpoints.up('sm')]: {
                margin: 0,
                height: "70px",
                '& svg': {
                    fontSize: "6rem",
                }
            },
        },

    },
    logoTitle: {
        position: 'absolute',
        bottom: 3,
        left: "50%",
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        fontSize: "13px",
        [theme.breakpoints.up('sm')]: {
            fontSize: "16px",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        marginLeft: "16px",
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    home: {
        fontWeight: "bold",
        fontSize: "18px",
    },
    homeButton: {
        padding: 10,
        opacity: .5,
        '&:hover': {
            opacity: 1,
        },
    },
    notification: {
        marginLeft: 'auto',
        '& button': {
            padding: 10,
            fontSize: 18
        },
        '& svg': {
            fontSize: 34,
        },
    },
}));

const PrimaryAppBar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose} component={RouterLink} to="/logout">
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <ExitToAppIcon />
                </IconButton>
                <p>Se déconnecter</p>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem 
                component={RouterLink} to="/notification">
                <IconButton 
                aria-label={`show ${props.notification} new notifications`} 
                color="inherit"
                >
                    <Badge badgeContent={props.notification} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={RouterLink} to="/logout">
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <ExitToAppIcon />
                </IconButton>
                <p>Se déconnecter</p>
            </MenuItem>

        </Menu>
    );

    

    return (
        <Box component="div" className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Hidden smUp>
                        <Box
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer">
                            <SwipeableTemporaryDrawer />
                        </Box>
                    </Hidden>
                    <Box className={classes.title}>
                        <ButtonBase aria-label="logo" color="inherit">
                            <CarLogo />
                            <span className={classes.logoTitle}>Rent Manager</span>
                        </ButtonBase>
                    </Box>
                    <Box component="div" className={classes.grow} />
                    <Box component="div" className={classes.sectionDesktop}>
                        {
                            props.isAuthenticated ? (
                                <>
                                    <IconButton aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={4} color="secondary">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton 
                                    aria-label={`show ${props.notification} new notifications`} 
                                    color="inherit"
                                    component={RouterLink} to="/notification"
                                    >
                                        <Badge badgeContent={props.notification} color="secondary">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton></>
                            ) : (

                                    <Button
                                        startIcon={<AccountCircle />}
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                        component={RouterLink} to="/sign-in"
                                    >Se connecter</Button>
                                )
                        }


                    </Box>
                    <Box component="div" className={classes.sectionMobile}>
                        {
                            !props.isAuthenticated ? (<IconButton
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                                component={RouterLink} to="/sign-in"
                            ><AccountCircle /></IconButton>) : (
                                    <IconButton
                                        aria-label="show more"
                                        aria-controls={mobileMenuId}
                                        aria-haspopup="true"
                                        onClick={handleMobileMenuOpen}
                                        color="inherit"
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                )
                        }

                    </Box>
                </Toolbar>
            </AppBar>
            {
                renderMobileMenu
            }
            {
                renderMenu
            }
        </Box>
    );
}

const NotificationAppBar = (props) => {
    const classes = useStyles()

    return (
        <Box component="div" className={classes.grow}>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: '#38b2ac' }}>
                    {/* <Box className={classes.title}>
                        <ButtonBase aria-label="logo" color="inherit">
                            <ArrowBackIcon />
                        <span className={classes.logoTitle}>Home</span>
                        </ButtonBase>
                    </Box> */}
                    <Box
                        edge="start"
                        color="inherit">
                        <ButtonBase
                            aria-label="home page"
                            className={classes.homeButton}
                            component={RouterLink} to="/"
                            color="inherit">
                            <ArrowBackIcon />
                            <span className={classes.home}>Home</span>
                        </ButtonBase>
                    </Box>
                    <Box
                        edge="end"
                        className={classes.notification}
                        color="inherit">
                        <ButtonBase
                            aria-label="home page"
                            color="inherit">
                            <Badge badgeContent={props.notification} color="secondary">
                                <NotificationsNoneOutlinedIcon />
                            </Badge>
                        </ButtonBase>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

const ToolBar = (props) => {
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const cardElements = cloneDeep(props.userData) || [];
        const arrElements = []
        cardElements.forEach((e) => {
            if (e.insurance.reminder.switchKey && e.insurance.reminder.value < (new Date()).getTime()) {
                const tab = e.insurance.reminder.tab
                const panel = e.insurance.reminder.panel
                const type = e.insurance.reminder.type
                const path = 'insurance.reminder'
                const element = updateObject(e, { notification: { tab, panel, type, path } })
                arrElements.push(element)
            }
            e.maintenance.forEach((arr, i) => {
                if (arr[arr.length - 1].switchKey && arr[arr.length - 1].value < (new Date()).getTime()) {
                    const tab = arr[arr.length - 1].tab
                    const type = arr[arr.length - 1].type
                    const path = `maintenance[${i}][${arr.length - 1}]`
                    const element = updateObject(e, { notification: { tab, type, path } })
                    arrElements.push(element)
                }

            })
        })
        setNotification(arrElements)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.userData])

    const notificationPath = Boolean(props.location.pathname !== '/notification')
    return notificationPath ? <PrimaryAppBar isAuthenticated={props.isAuthenticated} notification={notification.length} /> 
    : <NotificationAppBar notification={notification.length} />
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userData: state.user.userData,

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitDefaultData: () => dispatch(actions.fetchDefaultData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToolBar));




