import React from 'react'
import { Switch, Route, RouteProps, BrowserRouter as Router } from 'react-router-dom'
import Checkin from '../../pages/Checkin'
import Login from '../../pages/Login'
import AuthLayout from '../Layouts/AuthLayout'
import DefaultLayout from '../Layouts/DefaultLayout'

const AuthRequired = (props: RouteProps) => {

  return (
    <DefaultLayout>
      <Route {...props} />
    </DefaultLayout>
  )
}

export default function Routes() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <AuthLayout>
          <Login />
        </AuthLayout>
      </Route>
        <AuthRequired exact path="/checkin" component={Checkin} />
    </Switch>
    </Router>
  )
}
