import { createActions } from 'redux-actions'
import MultiPeerActions from '../submodules/react-native-multipeer/actions/MultiPeer.action'

const { addNewCourse } = createActions({
  addNewCourse: {
    multipeer: {
      set: info => info,
      startAdd: info => (dispatch) => {
        dispatch(MultiPeerActions.browse())
        dispatch(addNewCourse.multipeer.set(info))
      },
      stopAdd: () => (dispatch) => {
        dispatch(MultiPeerActions.stopBrowse())
      },
    },
  },
})

export default addNewCourse
