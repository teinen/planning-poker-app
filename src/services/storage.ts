enum SessionStorageKeys {
  PARTICIPANT_ID = 'participantId',
}

class StorageService {
  addParticipantId(id: string) {
    window.sessionStorage.setItem(SessionStorageKeys.PARTICIPANT_ID, id)
  }

  getParticipantId() {
    return window.sessionStorage.getItem(SessionStorageKeys.PARTICIPANT_ID)
  }

  removeParticipantId() {
    window.sessionStorage.removeItem(SessionStorageKeys.PARTICIPANT_ID)
  }
}

export default new StorageService()
