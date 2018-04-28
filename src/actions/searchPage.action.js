import { createActions } from 'redux-actions'
import MultiPeerActions from '../submodules/react-native-multipeer/actions/MultiPeer.action'

const { searchPage } = createActions({
  searchPage: {
    multipeer: {
      set: info => info,
      startSearch: info => (dispatch) => {
        dispatch(MultiPeerActions.advertise(info))
        dispatch(searchPage.multipeer.set(info))
      },
      stopSearch: () => (dispatch) => {
        dispatch(MultiPeerActions.hide())
      },
    },
  },
})

export default searchPage
