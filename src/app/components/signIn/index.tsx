import React from "react"
import { useRouterDispatch } from '../../context/RouterContext'

export default function SignIn() {
  const routerDispatch = useRouterDispatch()
    return (
      <React.Fragment>
        <div>
          <h1>Login</h1>
          <button onClick={ () => {
            routerDispatch!({ type: 'go', path: '/home' }) }
            }>Go Home!</button>
        </div>
      </React.Fragment>
    )
  }