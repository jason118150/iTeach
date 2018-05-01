import { Alert } from 'react-native'
import Peer from '../classes/Peer'

const p0 = new Peer(0, { title: '小海豚MV舞蹈課程123', teacher: '蔡丞昊', color: 'red' })
const p1 = new Peer(1, { title: '佛教經義賞析', teacher: '陳秉珏', color: 'green' })

const initialState = {
  selfName: 'User-default',
  peers: {
    0: p0, 1: p1,
  },
  isBrowsing: false,
  isAdvertising: false,
}

const reducerMap = {
  init: (state, action) => {
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        selfName: action.payload.selfName,
      },
    }
  },
  browse: (state) => {
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isBrowsing: true,
      },
    }
  },
  stopBrowse: (state) => {
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isBrowsing: false,
      },
    }
  },
  disconnect: (state) => {
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        selfName: state.multiPeer.selfName,
      },
    }
  },
  advertise: (state) => {
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isAdvertising: true,
      },
    }
  },
  hide: (state) => {
    const peers = {}
    Object.keys(state.multiPeer.peers).forEach((peerId) => {
      if (state.multiPeer.peers[peerId].invitationId === '') {
        peers[peerId] = state.multiPeer.peers[peerId]
      }
    })
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        isAdvertising: false,
        peers,
      },
    }
  },
  invite: (state, action) => {
    if (!(action.payload.peerId in state.multiPeer.peers) || state.multiPeer.peers[action.payload.peerId].connected) {
      return state
    }
    const peer = state.multiPeer.peers[action.payload.peerId]
    peer.invited = true
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: {
          ...state.multiPeer.peers,
          [action.payload.peerId]: peer,
        },
      },
    }
  },
  onPeerFoundSet: (state, action) => {
    if (action.payload.peer.id in state.multiPeer.peers) {
      return state
    }
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: {
          ...state.multiPeer.peers,
          [action.payload.peer.id]: action.payload.peer,
        },
      },
    }
  },
  onPeerLost: (state, action) => {
    if (!(action.payload.peerId in state.multiPeer.peers)) {
      return state
    }
    const peers = Object.assign({}, state.multiPeer.peers)
    delete peers[action.payload.peerId]
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers,
      },
    }
  },
  onPeerConnected: (state, action) => {
    const peer = Object.assign({}, action.payload.peer)
    if (peer.id in state.multiPeer.peers) {
      peer.name = state.multiPeer.peers[peer.id].name
    }
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: {
          ...state.multiPeer.peers,
          [peer.id]: peer,
        },
      },
    }
  },
  onPeerDisconnected: (state, action) => {
    if (!(action.payload.peerId in state.multiPeer.peers)) {
      return state
    }
    const peers = Object.assign({}, state.multiPeer.peers)
    delete peers[action.payload.peerId]
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers,
      },
    }
  },
  onInviteReceived: (state, action) => {
    Alert.alert(JSON.stringify(action))
    if (action.payload.peer.id in state.multiPeer.peers) {
      return state
    }
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: {
          ...state.multiPeer.peers,
          [action.payload.peer.id]: action.payload.peer,
        },
      },
    }
  },
  onInfoUpdate: (state, action) => {
    if (!(action.payload.peerId in state.multiPeer.peers)) {
      return state
    }
    const peer = state.multiPeer.peers[action.payload.peerId]
    peer.name = action.payload.info.name
    return {
      ...state,
      multiPeer: {
        ...state.multiPeer,
        peers: {
          ...state.multiPeer.peers,
          [action.payload.peerId]: peer,
        },
      },
    }
  },
}

export default { reducerMap, initialState }
