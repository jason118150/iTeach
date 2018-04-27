import { handleActions } from 'redux-actions'
import nav from './nav'
import course from './course'
import courseItem from './courseItem'
import classMenu from './classMenu'
import account from './account'
import RootNavigator from '../navigator/RootNavigator'
import courseInfo from './courseInfo'

// define states
const initialState = {
  nav: nav.initialState,
  classMenu: classMenu.initialState,
  course: course.initialState,
  courseItem: courseItem.initialState,
  account: account.initialState,
  courseInfo: courseInfo.initialState,
  initComplete: false,
}

// define reducers
const reducerMap = {
  nav: nav.reducerMap,
  classMenu: classMenu.reducerMap,
  course: course.reducerMap,
  courseItem: courseItem.reducerMap,
  account: account.reducerMap,
  courseInfo: courseInfo.reducerMap,
  initComplete: state => ({ ...state, initComplete: true }),
}

export default (state, action) => {
  // the function handleActions is similar to combineReducers
  // console.log('action type: ', action.type )
  let newState = handleActions(reducerMap, initialState)(state, action)
  
  // solve the navigation problem of react navigation
  if (action.type.startsWith('Navigation/')) {
    newState = { ...newState, nav: RootNavigator.router.getStateForAction(action, newState.nav) }
  }
  return newState
}

