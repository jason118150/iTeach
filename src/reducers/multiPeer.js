import { Alert } from 'react-native'
import { PeerStatus } from '../components/Peer'

const initialState = {
  selfName: '',
  peers: {},
  courses: {}, // peer ids that have endered a course: peerId in state.multiPeer.courses['name']
  isBrowsing: false,
  isAdvertising: false,
  status: PeerStatus.IDLE, // idle, releasing, viewing, searching
}

const reducerMap = {
  common: {
    setStatus: (state, action) => ({
      ...state,
      multiPeer: {
        ...state.multiPeer,
        status: action.payload,
      },
    }),
  },
  backend: {
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
      if (!(action.payload.peerId in state.multiPeer.peers) ||
          state.multiPeer.peers[action.payload.peerId].connected) {
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
      const foundPeer = action.payload.peer
      foundPeer.online = true
      const { courses } = state.multiPeer
      if (!(foundPeer.info.course in courses)) {
        courses[foundPeer.info.course] = {}
      }
      courses[foundPeer.info.course][foundPeer.id] = true
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers: {
            ...state.multiPeer.peers,
            [foundPeer.id]: foundPeer,
          },
          courses,
        },
      }
    },
    onPeerLostSet: (state, action) => {
      if (!(action.payload.peer.id in state.multiPeer.peers)) {
        return state
      }
      const peers = Object.assign({}, state.multiPeer.peers)
      peers[action.payload.peer.id].online = false
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers,
        },
      }
    },
    onPeerConnected: (state, action) => {
      let peer = Object.assign({}, action.payload.peer)
      if (peer.id in state.multiPeer.peers) {
        peer = state.multiPeer.peers[peer.id]
        peer.connected = true
        peer.online = true
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
      peers[action.payload.peerId].online = false
      peers[action.payload.peerId].connected = false
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers,
        },
      }
    },
    onInviteReceivedSet: (state, action) => {
      const inviterPeer = action.payload.peer
      return {
        ...state,
        multiPeer: {
          ...state.multiPeer,
          peers: {
            ...state.multiPeer.peers,
            [inviterPeer.id]: inviterPeer,
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
  },
}

export default { reducerMap, initialState }