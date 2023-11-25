import React from "react"
import { useRouterDispatch } from '../../context/RouterContext'

import Button from '@mui/material/Button';

export default function Footer() {
  const routerDispatch = useRouterDispatch()
    return (
      <React.Fragment>
        <div>
          <Button size="large" onClick={() => {routerDispatch!({ type: 'goLeft' })}} variant="contained">⇐</Button>
          <Button size="large" onClick={() => {routerDispatch!({ type: 'goRight' })}} variant="contained">⇒</Button>
        </div>
      </React.Fragment>
    )
  }