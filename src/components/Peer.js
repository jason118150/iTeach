export default class Peer {
  constructor(id, info, connected = false, invited = false, invitationId = '', online = false) {
    this.id = id
    this.info = {
      identity: '', // 'teacher', 'student'
      username: '', // name of user represented by this peer
      course: '', // current active course
      additional: {}, // identity-specific additional information
      ...info,
    }
    this.connected = connected
    this.invited = invited
    this.invitationId = invitationId
    this.online = online
  }
}