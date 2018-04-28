import { NavigationActions } from 'react-navigation'
import RootNavigator from '../navigator/RootNavigator'

const initialState = {
  course: '',
  year: '',
  semester: '',
  classroom: '',
  weekday: '',
  time: '',
  website: '',
}

const reducerMap = {
  set: (state, action) => {
    if (action.payload) {
      const nav = RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ClassMenu' }), state.nav)
      return { ...state, nav, courseInfo: action.payload }
    }
    return state
  },
}

export default { initialState, reducerMap }
