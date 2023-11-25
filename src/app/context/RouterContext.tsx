import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import childrenInjection from '../util/childrenInjection';

export type Route = {
  path: string
  component: () => React.JSX.Element
}

interface RouterProviderProps {
  children: ReactNode
  declaredRoutes: Route[]
  injectIndex?: number
  defaultPath: string
}
interface Router {
  currentRoute: Route,
  routes: Route[],
  leftHistory: string[],
  rightHistory: string[]
}

const RouterDispatchContext = createContext<React.Dispatch<{
  type: string;
  path?: string;
}> | null>(null)

export default function RouterProvider({children, declaredRoutes, injectIndex=0, defaultPath='/'}: RouterProviderProps): React.JSX.Element {
  const initialState: Router = {
    // TODO: clean up the sad path here
    currentRoute: declaredRoutes.find(e => e.path === defaultPath) ?? { path: '/404', component: () => <div>404</div> },
    routes: declaredRoutes,
    leftHistory: [],
    rightHistory: []
  }
  
  const [routerState, dispatch] = useReducer(
    routerReducer,
    initialState
  )

  const injectedChildren = childrenInjection(children, injectIndex, <routerState.currentRoute.component />)

  return (
    <RouterDispatchContext.Provider value={dispatch}>
      {injectedChildren}
    </RouterDispatchContext.Provider>
  )
}

function routerReducer(state:Router, action:{ type: string, path?: string }): Router {
  switch (action.type) {
    case 'go': 
      return {
        ...state,
        currentRoute: {
          path: action.path || state.currentRoute.path,
          component: state.routes.find(e => e.path === action.path)?.component ?? state.currentRoute.component
        }
      }
    case 'goLeft':
      return {
        ...state,
        rightHistory: [state.currentRoute.path, ...state.rightHistory],
        currentRoute: {
          path: action.path || state.currentRoute.path,
          component: state.currentRoute.component
        }
      }
    case 'goRight':
      return {
        ...state,
        rightHistory: [state.currentRoute.path,]
      }
    case 'registerRoutes':

    default: 
      throw new Error(`RouterReducer Error: Invalid action type: ${action.type}`)
  }
}

export function useRouterDispatch() {
  return useContext(RouterDispatchContext);
}