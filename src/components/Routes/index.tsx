import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom'
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
    <Switch>
      <Route path="/" exact>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </Route>

    </Switch>
  )
}
