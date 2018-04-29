import Peer from '../classes/Peer'
import MultipeerConnectivity from '../../react-native-multipeer'
import MessageType from '../constants/MessageType.constant'
import { createActions } from 'redux-actions'

const { multiPeer } = createActions({
  multiPeer: {
    init: selfName => selfName,
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
      return peerId
    },
    responseInvite: (sender, accept, callback = () => {}) => {
      MultipeerConnectivity.responseInvite(sender.invitationId, accept, callback)
      return sender
    },
    requestInfo: (peerId) => {
      MultipeerConnectivity.requestInfo(peerId)
      return peerId
    },
    returnInfo: (receiverId, info) => {
      MultipeerConnectivity.returnInfo(receiverId, info)
      return info
    },
    createStreamForPeer: (peerId, name, callback = () => {}) => {
      MultipeerConnectivity.createStreamForPeer(peerId, name, callback)
    },
    sendData: (recipients, data, callback = () => {}) => {
      const recipientIds = recipients.map((recipient) => {
        if (recipient instanceof Peer) {
          return recipient.id;
        }
        return recipient
      })
      MultipeerConnectivity.sendData(recipientIds, data, callback)
    },
    broadcastData: (data, callback = () => {}) => {
      MultipeerConnectivity.broadcastData(data, callback)
    },
    onPeerFound: (peerId, peerName) => {
      const peer = new Peer(peerId, peerName)
      return peer
    },
    onPeerLost: (peerId) => {
      return peerId
    },
    onPeerConnected: (peerId) => {
      const peer = new Peer(peerId, '', true, false, '')
      return peer
    },
    onPeerConnecting: (peerId) => {
      return peerId
    },
    onPeerDisconnected: (peerId) => {
      return peerId
    },
    onStreamOpened: () => null,
    onInviteReceived: (invitation) => {
      const peer = new Peer(
        invitation.sender.id,
        invitation.sender.info,
        false,
        false,
        invitation.id,
      )
      return peer
    },
    onDataReceived: (senderId, data) => {
      return {
        senderId,
        data,
      }
    },
    onInfoUpdate(peerId, info) {
      return {
        peerId,
        info,
      }
    },
  },
})

export default multiPeer;