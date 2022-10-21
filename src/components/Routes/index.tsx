import React from 'react'
import { Switch, Route, RouteProps, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { useUserStore } from '../../GlobalState'
import Checkin from '../../pages/Checkin'
import Profile from '../../pages/Home'
import Login from '../../pages/Login'
import Users from '../../pages/Users'
import AuthLayout from '../Layouts/AuthLayout'
import DefaultLayout from '../Layouts/DefaultLayout'
import CheckOut from '../../pages/CheckOut'

const AuthRequired = (props: RouteProps) => {
    const userStore = useUserStore()
    if (userStore.Autenticated === false) {
        return <Redirect to="/" />
      }
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
        <AuthRequired exact path="/home" component={Profile} />
        <AuthRequired exact path="/checkin" component={Checkin} />
        <AuthRequired exact path="/users" component={Users} />
        <AuthRequired exact path="/checkOut" component={CheckOut} />
    </Switch>
    </Router>
  )
}
