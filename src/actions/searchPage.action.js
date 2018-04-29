import { createActions } from 'redux-actions'
import MultiPeerActions from '../submodules/react-native-multipeer/actions/MultiPeer.action'

const { searchPage } = createActions({
  searchPage: {
    multiPeer: {
      set: info => info,
      startSearch: info => (dispatch) => {
        dispatch(MultiPeerActions.advertise(info))
        dispatch(searchPage.multiPeer.set(info))
      },
      stopSearch: () => (dispatch) => {
        dispatch(MultiPeerActions.hide())
      },
    },
  },
})

export default searchPage
