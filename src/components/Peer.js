export default class Peer {
  constructor(id, info, connected = false, invited = false, invitationId = '') {
    this.id = id
    this.info = info
    this.connected = connected
    this.invited = invited
    this.invitationId = invitationId
    this.online = false
  }
}
