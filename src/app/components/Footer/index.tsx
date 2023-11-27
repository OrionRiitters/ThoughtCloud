import React from "react"
import { useRouterDispatch } from '../../context/RouterContext'

export default function Footer() {
  const routerDispatch = useRouterDispatch()
  return (
    <React.Fragment>
      <div>
        <button onClick={() => {routerDispatch!({ type: 'goLeft' })}}>⇐</button>
        <button onClick={() => {routerDispatch!({ type: 'goRight' })}}>⇒</button>
      </div>
    </React.Fragment>
  )
}