import React, { createContext, useReducer } from 'react';

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


export default function RouterProvider(declaredRoutes: Route[], defaultPath='/'): React.JSX.Element{
  const initialState: Router = {
      // TODO: clean up the sad path here
      currentRoute: declaredRoutes.find(e => e.path === defaultPath) ?? { path: '/404', component: () => <div>404</div> },
      routes: declaredRoutes,
      leftHistory: [],
      rightHistory: []
  }
  const RouterContext = createContext(initialState);
  const RouterDispatchContext = createContext(routerReducer)

  const [router, dispatch] = useReducer(
    routerReducer,
    initialState
  )
  return (
  <React.Fragment>
    <RouterContext.Provider value={router}>
      <RouterDispatchContext.Provider value={routerReducer}>
        {router.currentRoute.component()}
      </RouterDispatchContext.Provider>
    </RouterContext.Provider>
  </React.Fragment>)
}

function routerReducer(state:Router, action:{ type: string, path: string }):Router {
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


// class RoutingError extends Error {
//   constructor(message: string|undefined) {
//     super(`RoutingError: ${message ? message : ''}`)
//   }
// }

// class UnregisteredRouteComponentError extends Error {
//   constructor(message: string|undefined) {
//     super(`UnregisteredRouteComponentError: ${message ? message : ''}`)
//   }
// }

// class RouterContext {
//   currentPath: string
//   currentRouteComponent: React.Component
//   routes: Route[]
//   leftHistory: string[]
//   rightHistory: string[]
//   constructor(routes:Route[]) {
//     this.currentPath = ''
//     this.routes = []
//     this.leftHistory = []
//     this.rightHistory = []

//     this.#registerRoutes(routes)
//   }

//   #registerRoutes(declaredRoutes: Route[]) {
//     declaredRoutes.forEach(route => {
//       this.registerRoute(route.path, route.component)
//     })
//   }

//   setCurrentRoute(newPath: string) {
//     if (this.routes.map(e => e.path).includes(newPath)) {
//       this.currentPath = newPath
//     } else {
//       throw new RoutingError(`No route registered for path: ${newPath}`)
//     }
//     this.#renderRoute()
//   }

//   #renderRoute() {
//     const newRouteComponent = this.routes.find(e => e.path === this.currentPath)?.component
//     if (newRouteComponent != undefined) {
//       this.currentRouteComponent = newRouteComponent
//     } else {
//       throw new UnregisteredRouteComponentError(`Component not found for Route path: ${this.currentPath}`)
//     }
//   }

//   getRouteComponent() {
//     return this.currentRouteComponent
//   }

//   registerRoute(route: string, routeComponent: React.Component) {
//     this.routes.push({ path: route, component: routeComponent })
//   }
// }