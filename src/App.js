import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Loader from './components/UI/Loader/Loader';


import Cards from './containers/Cards/Cards';
import Layout from './hoc/Layout/Layout';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Logout from './containers/Auth/Logout/Logout';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b085f5',
      main: '#7e57c2',
      dark: '#4d2c91',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f73378',
      contrastText: '#fff',
    },
  },
});



const primaryDark = theme.palette.primary.dark;
const primaryMain = theme.palette.primary.main;
const primaryContrastText = theme.palette.primary.contrastText;
const primaryLight = theme.palette.primary.light;

document.body.style.setProperty("--primaryDark", primaryDark)
document.body.style.setProperty("--primaryMain", primaryMain)
document.body.style.setProperty("--primaryContrastText", primaryContrastText)
document.body.style.setProperty("--primaryLight", primaryLight)

const asyncSignIn = lazy(() => {
  return import('./containers/Auth/SignIn/SignIn');
});
const asyncSignOut = lazy(() => {
  return import('./containers/Auth/SignUp/SignUp');
});


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route path="/sign-up" component={asyncSignOut} />
          <Route path="/sign-in" component={asyncSignIn} />
          <Redirect to="/sign-in" />
        </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route path="/sign-up" component={asyncSignOut} />
            <Route path="/sign-in" component={asyncSignIn} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Cards} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      );
    }

    const { forwardedRef } = this.props;

    return (
      <ScopedCssBaseline>
        <ThemeProvider theme={theme} ref={forwardedRef} >
          <Layout>
            {routes}
            <Loader toggle={this.props.loading} />
          </Layout>
        </ThemeProvider>
      </ScopedCssBaseline>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.defaultData.loading || state.user.loading || state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

