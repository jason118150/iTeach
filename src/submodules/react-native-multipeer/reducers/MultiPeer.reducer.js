const initialState = {
  selfName: 'User-default',
  peers: {},
  isBrowsing: false,
  isAdvertising: false,
}

const reducerMap = {
  init: (state, action) => {
    return {
      ...state,
      selfName: action.payload,
    }
  },
  browse: (state) => {
    return {
      ...state,
      isBrowsing: true,
    }
  },
  stopBrowse: (state) => {
    return {
      ...state,
      isBrowsing: false,
    }
  },
  disconnect: (state) => {
    return {
      ...state,
      selfName: state.multiPeer.selfName,
    }
  },
  advertise: (state) => {
    return {
      ...state,
      isAdvertising: true,
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
      isAdvertising: false,
      peers,
    }
  },
  invite: (state, action) => {
    if (!(action.peerId in state.multiPeer.peers) || state.multiPeer.peers[action.peerId].connected) {
      return state
    }
    const peer = state.multiPeer.peers[action.peerId]
    peer.invited = true
    return {
      ...state,
      peers: {
        ...state.multiPeer.peers,
        [action.peerId]: peer,
      },
    }
  },
  onPeerFound: (state, action) => {
    if (action.peer.id in state.multiPeer.peers) {
      return state
    }
    return {
      ...state,
      peers: {
        ...state.multiPeer.peers,
        [action.peer.id]: action.peer,
      },
    }
  },
  inPeerLost: (state, action) => {
    if (!(action.peerId in state.multiPeer.peers)) {
      return state
    }
    const peers = Object.assign({}, state.multiPeer.peers)
    delete peers[action.peerId]
    return {
      ...state,
      peers,
    }
  },
  onPeerConnected: (state, action) => {
    const peer = Object.assign({}, action.peer)
    if (peer.id in state.multiPeer.peers) {
      peer.name = state.multiPeer.peers[peer.id].name
    }
    return {
      ...state,
      peers: {
        ...state.multiPeer.peers,
        [peer.id]: peer,
      },
    }
  },
  onPeerDisconnected: (state, action) => {
    if (!(action.peerId in state.multiPeer.peers)) {
      return state
    }
    const peers = Object.assign({}, state.multiPeer.peers)
    delete peers[action.peerId]
    return {
      ...state,
      peers,
    }
  },
  onInviteReceived: (state, action) => {
    if (action.peer.id in state.multiPeer.peers) {
      return state
    }
    return {
      ...state,
      peers: {
        ...state.multiPeer.peers,
        [action.peer.id]: action.peer,
      },
    }
  },
  onInfoUpdate: (state, action) => {
    if (!(action.peerId in state.multiPeer.peers)) {
      return state
    }
    const peer = state.multiPeer.peers[action.peerId]
    peer.name = action.info.name
    return {
      ...state,
      peers: {
        ...state.multiPeer.peers,
        [action.peerId]: peer,
      },
    }
  },
}

export default { reducerMap, initialState }
