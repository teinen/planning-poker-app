enum StorageKeys {
  PARTICIPANT_ID = 'participantId',
}

class StorageService {
  addParticipantId(id: string) {
    window.localStorage.setItem(StorageKeys.PARTICIPANT_ID, id)
  }

  getParticipantId() {
    return window.localStorage.getItem(StorageKeys.PARTICIPANT_ID)
  }

  removeParticipantId() {
    window.localStorage.removeItem(StorageKeys.PARTICIPANT_ID)
  }
}

export default new StorageService()
