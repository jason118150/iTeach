import { handleActions } from 'redux-actions'
import nav from './nav'
import course from './course'
import courseItem from './courseItem'
import classMenu from './classMenu'
import account from './account'
import RootNavigator from '../navigator/RootNavigator'
import courseInfo from './courseInfo'
import onlinePeerList from './onlinePeerList'
import searchPage from './searchPage'
import addNewCourse from './addNewCourse'
import multiPeer from '../submodules/react-native-multipeer/reducers/MultiPeer.reducer'

// define states
const initialState = {
  nav: nav.initialState,
  classMenu: classMenu.initialState,
  course: course.initialState,
  courseItem: courseItem.initialState,
  account: account.initialState,
  courseInfo: courseInfo.initialState,
  onlinePeerList: onlinePeerList.initialState,
  searchPage: searchPage.initialState,
  addNewCourse: addNewCourse.initialState,
  multiPeer: multiPeer.initialState,
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
  onlinePeerList: onlinePeerList.reducerMap,
  searchPage: searchPage.reducerMap,
  addNewCourse: addNewCourse.reducerMap,
  multiPeer: multiPeer.reducerMap,
  initComplete: state => ({ ...state, initComplete: true }),
}

export default (state, action) => {
  // the function handleActions is similar to combineReducers
  let newState = handleActions(reducerMap, initialState)(state, action)

  // solve the navigation problem of react navigation
  if (action.type.startsWith('Navigation/')) {
    newState = { ...newState, nav: RootNavigator.router.getStateForAction(action, newState.nav) }
  }
  return newState
}

