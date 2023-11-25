import React from "react"

import RouterProvider from '../context/RouterContext'
import routes from '../routes'
import Footer from './Footer'

import './app.scss'

export default function App() {
    return (
      <div id='app'>
        <RouterProvider declaredRoutes={routes} injectIndex={0} defaultPath={'/signin'}>
          <Footer />
        </RouterProvider>
      </div>
    )
  }