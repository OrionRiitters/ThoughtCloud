import { createRoot } from 'react-dom/client'
import React from 'react'

import App from './app/components/app'

import './root.scss'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)
root.render(<React.StrictMode>
  <App />
</React.StrictMode>)