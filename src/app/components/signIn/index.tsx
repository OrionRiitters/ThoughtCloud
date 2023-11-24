import React from "react"
import { useRouterDispatch } from '../../hooks/RouterContext'

export default function SignIn() {
  const dispatch = useRouterDispatch()
    return (
      <React.Fragment>
        <div>
          <h1>Login</h1>
          <button onClick={ () => {
            console.log('asdoliuhboiuybouiy')
            dispatch({ type: 'go', path: '/home' }) }
            }>Go Home!</button>
        </div>
      </React.Fragment>
    )
  }