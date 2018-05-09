import { Alert } from 'react-native'
import { createActions } from 'redux-actions'
import Peer from '../components/Peer'
import MultipeerConnectivity from '../util/multiPeerInit'
import getRandomColor from '../util/getRandomColor'

const getStudentPeerInfo = state => ({
  identity: 'student',
  username: state.account.username,
  course: state.course,
  color: getRandomColor(),
})

const getTeacherPeerInfo = state => ({
  identity: 'teacher',
  username: state.account.username,
  course: state.course,
  color: getRandomColor(),
})

const { multiPeer } = createActions({
  multiPeer: {
    student: {
      startSearch: () => (dispatch) => {
        dispatch(multiPeer.backend.advertise({ identity: 'student' }))
      },
      stopSearch: () => (dispatch) => {
        dispatch(multiPeer.backend.hide())
      },
      openCourse: () => (dispatch, getState) => {
        dispatch(multiPeer.backend.browse())
        dispatch(multiPeer.backend.advertise(getStudentPeerInfo(getState())))
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.stopBrowse())
        dispatch(multiPeer.backend.hide())
      },
    },
    teacher: {
      startRelease: () => (dispatch) => {
        // TODO: should send invitation if invited == false
        dispatch(multiPeer.backend.browse())
      },
      stopRelease: () => (dispatch) => {
        // TODO: students shouldn't see the course after release stopped
        // TODO: should set all peer invited = false
        dispatch(multiPeer.backend.stopBrowse())
      },
      openCourse: () => (dispatch, getState) => {
        dispatch(multiPeer.backend.browse())
        dispatch(multiPeer.backend.advertise(getTeacherPeerInfo(getState())))
      },
      exitCourse: () => (dispatch) => {
        dispatch(multiPeer.backend.stopBrowse())
        dispatch(multiPeer.backend.hide())
      },
    },
    common: {
      openOnlineList: () => (dispatch, getState) => {
        // if (!getState().multiPeer.isBrowsing) {
        //   dispatch(multiPeer.backend.browse())
        // }
      },
      exitOnlineList: () => (dispatch, getState) => {
        // if (getState().multiPeer.isBrowsing) {
        //   dispatch(multiPeer.backend.stopBrowse())
        // }
      },
      onPeerListChange: (peer, status) => (dispatch, getState) => {
        // status: found, lost
        const state = getState()
        const identity = state.account.status
        if (identity === 'teacher') {
          if (status === 'found') {
            // dispatch(multiPeer.backend.invite(peer.id, getTeacherPeerInfo(state)))
          }
        } else if (identity === 'student') {
          if (status === 'found') {
          }
        }
      },
    },
    backend: {
      init: (selfName) => {
        return { selfName }
      },
      browse: () => {
        MultipeerConnectivity.browse()
      },
      stopBrowse: () => {
        MultipeerConnectivity.stopBrowse()
      },
      disconnect: (callback = () => {}) => {
        MultipeerConnectivity.disconnect(callback)
      },
      advertise: (info = {}) => {
        MultipeerConnectivity.advertise(info)
      },
      hide: () => {
        MultipeerConnectivity.hide()
      },
      invite: (peerId, myInfo, callback = () => {}) => {
        MultipeerConnectivity.invite(peerId, myInfo, callback)
        return { peerId }
      },
      responseInvite: (sender, accept, callback = () => {}) => {
        MultipeerConnectivity.responseInvite(sender.invitationId, accept, callback)
        return { sender }
      },
      requestInfo: (peerId) => {
        MultipeerConnectivity.requestInfo(peerId)
        return { peerId }
      },
      returnInfo: (receiverId, info) => {
        MultipeerConnectivity.returnInfo(receiverId, info)
        return { info }
      },
      createStreamForPeer: (peerId, name, callback = () => {}) => {
        MultipeerConnectivity.createStreamForPeer(peerId, name, callback)
      },
      sendData: (recipients, data, callback = () => {}) => {
        const recipientIds = recipients.map((recipient) => {
          if (recipient instanceof Peer) {
            return { recipient: recipient.id }
          }
          return { recipient }
        })
        MultipeerConnectivity.sendData(recipientIds, data, callback)
      },
      broadcastData: (data, callback = () => {}) => {
        MultipeerConnectivity.broadcastData(data, callback)
      },
      onPeerFoundSet: peer => ({ peer }),
      onPeerFound: (peerId, peerInfo) => (dispatch, getState) => {
        const peer = new Peer(peerId, peerInfo)
        const state = getState()
        peer.online = true
        if (!(peer.id in state.multiPeer.peers)) {
          dispatch(multiPeer.common.onPeerListChange(peer, 'found'))
        }
        dispatch(multiPeer.backend.onPeerFoundSet(peer))
      },
      onPeerLostSet: peer => ({ peer }),
      onPeerLost: peerId => (dispatch, getState) => {
        const state = getState()
        if (peerId in state.multiPeer.peers) {
          const peer = state.multiPeer.peers[peerId]
          dispatch(multiPeer.common.onPeerListChange(peer, 'lost'))
          dispatch(multiPeer.backend.onPeerLostSet(peer))
        }
      },
      onPeerConnected: (peerId) => {
        const peer = new Peer(peerId, '', true, false, '', true)
        return { peer }
      },
      onPeerConnecting: (peerId) => {
        return { peerId }
      },
      onPeerDisconnected: (peerId) => {
        return { peerId }
      },
      onStreamOpened: () => null,
      onInviteReceived: (invitation) => {
        const peer = new Peer(
          invitation.sender.id,
          invitation.sender.info,
          false,
          false,
          invitation.id,
          true,
        )
        return { peer }
      },
      onDataReceived: (senderId, data) => {
        return {
          senderId,
          data,
        }
      },
      onInfoUpdate: (peerId, info) => {
        return {
          info,
        }
      },
    },
  },
})

export default multiPeer
