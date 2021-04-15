import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux';


function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {

  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? <Component {...props} /> : <Redirect to="/sign-in" />
      }}
    ></Route>
  )
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

export default connect(mapStateToProps, null)(PrivateRoute);