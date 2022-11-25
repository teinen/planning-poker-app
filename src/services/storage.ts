enum StorageKeys {
  PARTICIPANT_ID = 'participantId',
  ROOM_ID = 'roomId',
}

class StorageService {
  /* participant id */
  addParticipantId(id: string) {
    window.localStorage.setItem(StorageKeys.PARTICIPANT_ID, id)
  }

  getParticipantId() {
    return window.localStorage.getItem(StorageKeys.PARTICIPANT_ID)
  }

  removeParticipantId() {
    window.localStorage.removeItem(StorageKeys.PARTICIPANT_ID)
  }

  /* room id */
  addRoomId(id: string) {
    window.localStorage.setItem(StorageKeys.ROOM_ID, id)
  }

  getRoomId() {
    return window.localStorage.getItem(StorageKeys.ROOM_ID)
  }

  removeRoomId() {
    window.localStorage.removeItem(StorageKeys.ROOM_ID)
  }
}

export default new StorageService()
