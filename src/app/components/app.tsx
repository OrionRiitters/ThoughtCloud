import React from "react"

import RouterProvider from '../hooks/RouterContext'

import routes from '../routes'

export default function App() {
    return (
      <React.Fragment>
        {RouterProvider(routes, '/signin')}
      </React.Fragment>
    )
  }