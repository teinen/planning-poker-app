enum StorageKeys {
  PARTICIPANT_ID = 'participantId',
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
}

export default new StorageService()
