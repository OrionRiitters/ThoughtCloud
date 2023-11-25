import React, { createContext, useContext, useReducer } from 'react';

export type Route = {
  path: string
  component: () => React.JSX.Element
}
interface Router {
  currentRoute: Route,
  routes: Route[],
  leftHistory: string[],
  rightHistory: string[]
}

const RouterDispatchContext = createContext<React.Dispatch<{
  type: string;
  path: string;
}> | null>(null)

export default function RouterProvider(declaredRoutes: Route[], defaultPath='/'): React.JSX.Element{
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

  return (
    <RouterDispatchContext.Provider value={dispatch}>
      <routerState.currentRoute.component />
    </RouterDispatchContext.Provider>
  )
}

function routerReducer(state:Router, action:{ type: string, path: string }):Router {
  switch (action.type) {
    case 'go': 
      return {
        ...state,
        currentRoute: {
          path: action.path,
          component: state.routes.find(e => e.path === action.path)?.component ?? state.currentRoute.component
        }
      }
    case 'goLeft':
      return {
        ...state,
        rightHistory: [state.currentRoute.path, ...state.rightHistory],
        currentRoute: {
          path: action.path,
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