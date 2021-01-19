import React, { Component } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../containers/Toolbar/Toolbar';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <>
                <Toolbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
}


export default  Layout ;