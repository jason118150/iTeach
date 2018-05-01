import { Alert } from 'react-native'
import { createActions } from 'redux-actions'
import MultiPeerActions from '../submodules/react-native-multipeer/actions/MultiPeer.action'

const { multiPeer } = createActions({
  multiPeer: {
    student: {
      searchStart: info => (dispatch) => {
        dispatch(MultiPeerActions.advertise())
      },
      searchStop: () => (dispatch) => {
        dispatch(MultiPeerActions.hide())
      },
      joinCourse: courseName => (dispatch) => {
        return courseName
      },
    },
    teacher: {
      releaseStart: () => (dispatch) => {
        dispatch(MultiPeerActions.browse())
      },
      releaseStop: () => (dispatch) => {
        dispatch(MultiPeerActions.stopBrowse())
      },
    },
  },
})

export default multiPeer
