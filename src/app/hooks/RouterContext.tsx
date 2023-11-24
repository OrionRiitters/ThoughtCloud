import React, { createContext, useContext, useReducer } from 'react';

export type Route = {
  path: string
  component: () => React.JSX.Element
}

type RouterAction = {
  type: string
  path: string

}


interface Router {
  currentRoute: Route,
  routes: Route[],
  leftHistory: string[],
  rightHistory: string[]
}


//const RouterDispatchContext = createContext<React.Dispatch<RouterAction> | ((arg: RouterAction) => {})>( () => {console.log("ugh")} )
const RouterDispatchContext = createContext({
  // TODO: clean up the sad path here
  currentRoute: { path: '/', component: () => <React.Fragment></React.Fragment> },
  routes: [],
  leftHistory: [],
  rightHistory: []
})

export default function RouterProvider(declaredRoutes: Route[], defaultPath='/'): React.JSX.Element{
  const initialState: Router = {
    // TODO: clean up the sad path here
    currentRoute: declaredRoutes.find(e => e.path === defaultPath) ?? { path: '/404', component: () => <div>404</div> },
    routes: declaredRoutes,
    leftHistory: [],
    rightHistory: []
  }
  
  //const RouterContext = createContext(initialState);
  const [router, dispatch] = useReducer(
    routerReducer,
    initialState
  )
  return (
    <RouterDispatchContext.Provider value={dispatch}>
      {router.currentRoute.component()}
    </RouterDispatchContext.Provider>
  )
}

function routerReducer(state:Router, action:{ type: string, path: string }):Router {
  console.log('hiausd')
  switch (action.type) {
    case 'go': 
      return {
        ...state,
        currentRoute: {
          path: action.path,
          component: state.currentRoute.component
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