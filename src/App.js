import React, { Component } from 'react';
import Cards from './containers/Cards/Cards';
import Layout from './hoc/Layout/Layout';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';


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


class App extends Component {
  
  
  render() {
    
    const { forwardedRef, ...props } = this.props;

    return (
        <ThemeProvider theme={theme} {...props} ref={forwardedRef} >
          <Layout>
            <Cards />
          </Layout>
        </ThemeProvider>
    );
  }
}

export default App;
