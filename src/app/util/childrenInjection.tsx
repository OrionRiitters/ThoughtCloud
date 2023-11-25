import React from "react"

import { v4 as uuidv4 } from 'uuid';


/* 
* This function injects a given component into a given array of components at a given index.
*/
export default function childrenInjection(children: React.ReactNode, injectIndex: number, injectedComponent: React.ReactNode) {
  const uuid = uuidv4()
  const childrenArray = React.Children.toArray(children)
  //TODO: Figure out issue with children keys
  const injectedArray = [
    ...childrenArray.splice(0, injectIndex), 
    injectedComponent,
    ...childrenArray.splice(injectIndex, childrenArray.length), 
  ].map((e,i) => {
    if (React.isValidElement(e)) {
      return {
        ...e,
        props: {
          ...e.props,
          key: `${uuid}${i}`
        }
      }
    }
  })
  return injectedArray
}