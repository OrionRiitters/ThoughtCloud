import React from "react"
import { useRouterDispatch } from '../../context/RouterContext'

export default function SignIn() {
  const routerDispatch = useRouterDispatch()
    return (
      <React.Fragment>
        <div>
          <h1>Homey</h1>
          <button onClick={ () => routerDispatch!({ type: 'go', path: '/signin' }) }>Go sign in!</button>
        </div>
      </React.Fragment>
    )
  }