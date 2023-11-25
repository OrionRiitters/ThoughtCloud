import SignIn from "./components/signIn"
import Home from "./components/Home"
import type { Route } from './context/RouterContext'

const routes: Route[] = [
  {
    path: "/signin",
    component: SignIn
  },
  {
    path: "/home",
    component: Home
  }
]

export default routes