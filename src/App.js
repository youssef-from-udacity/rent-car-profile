import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Loader from './components/UI/Loader/Loader';
import Layout from './hoc/Layout/Layout';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Logout from './containers/Auth/Logout/Logout';
import PrivateRoute from "./hoc/PrivateRoute/PrivateRoute";





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

const asyncProfile = lazy(() => {
  return import('./containers/Profile/Profile');
});
const asyncNotification = lazy(() => {
  return import('./containers/Notification/Notification');
});
const asyncCards = lazy(() => {
  return import('./containers/Cards/Cards');
});
const asyncSignIn = lazy(() => {
  return import('./containers/Auth/SignIn/SignIn');
});
const asyncSignOut = lazy(() => {
  return import('./containers/Auth/SignUp/SignForm');
});


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const routes = (
      <Suspense fallback={<div></div>}>
        <Switch>
          <PrivateRoute path="/profile" component={asyncProfile} />
          <PrivateRoute path="/notification" component={asyncNotification} />
          <PrivateRoute path="/logout" component={Logout} />
          <PrivateRoute path="/" exact component={asyncCards} />
          <Route path="/sign-up" component={asyncSignOut} />
          <Route path="/sign-in" component={asyncSignIn} />
          <Redirect to="/sign-in" />
        </Switch>
      </Suspense>
    );

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
    loading: state.defaultData.loading || state.user.loading || state.auth.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

