import Vue from 'vue'
import profile from '@/data/profile.json'

export const state = () => ({
  profile,
  myServices: ['VERE', 'SCEN', 'DRLI'],
  updateData: {},
  sharingPreference: {},
  identityDocuments: [],
  notifications: [
    {
      text: 'Your driver licence is due to expire in 14 days, renew now to avoid any interruptions.',
      sender: 'Access Canberra',
      service: 'DRLI',
      action: 'RMYL',
      type: 'message',
      link: true,
    },
  ],
  activityLog: [],
  messages: [
    {
      text: 'Your driver licence is due to expire in 14 days, renew now to avoid any interruptions.',
      sender: 'Access Canberra',
      service: 'DRLI',
      action: 'RMYL',
      type: 'message',
      link: true,
    },
  ],
  serviceData: {},
})

export const getters = {
  getProfile: (state) => state.profile,
  getMessages: (state) => state.messages,
  getActivityLog: (state) => state.activityLog,
  getNotifications: (state) => state.notifications,
  getMyServices: (state) => state.myServices,
  checkMyService: (state) => (serviceId) => {
    const index = state.myServices.findIndex((id) => id === serviceId)

    if (index >= 0) {
      return true
    } else {
      return false
    }
  },
  getStagedChanges: (state) => state.updateData,
  getSharingPreference: (state) => state.sharingPreference,
  getIdentityDocuments: (state) => state.identityDocuments,
  getServiceData: (state) => (serviceId) => state.serviceData[serviceId],
}

export const mutations = {
  addService(state, payload) {
    const index = state.myServices.findIndex((id) => id === payload)

    if (index < 0) {
      state.myServices.push(payload)
    }
  },
  removeService(state, payload) {
    const index = state.myServices.findIndex((id) => id === payload)

    if (index >= 0) {
      state.myServices.splice(index, 1)
    }
  },
  stageUpdate(state, payload) {
    state.updateData = {}

    for (const [key, value] of Object.entries(payload)) {
      if (value !== state.profile[key] || value === '') {
        state.updateData[key] = value
      }
    }
  },
  updateProfile(state) {
    for (const [key, value] of Object.entries(state.updateData)) {
      state.profile[key] = value
    }
  },
  addToShared(state, payload) {
    state.sharingPreference[payload.provider.id] = payload.value
  },
  resetShared(state) {
    state.sharingPreference = {}
  },
  addDocument(state, payload) {
    const index = state.identityDocuments.findIndex(
      (document) => document === payload
    )

    if (index < 0) {
      state.identityDocuments.push(payload)
    }
  },
  addMessage(state, payload) {
    const index = state.messages.findIndex((message) => message === payload)

    if (index < 0) {
      state.messages.push(payload)
    }

    const notificationIndex = state.notifications.findIndex(
      (message) => message === payload
    )

    if (notificationIndex < 0) {
      state.notifications.push(payload)
    }
  },
  addActivity(state, payload) {
    const index = state.activityLog.findIndex(
      (activity) => activity === payload
    )

    if (index < 0) {
      state.activityLog.push(payload)
    }

    const notificationIndex = state.notifications.findIndex(
      (message) => message === payload
    )

    if (notificationIndex < 0) {
      state.notifications.push(payload)
    }
  },
  dismissNotification(state, payload) {
    const index = state.notifications.findIndex(
      (notification) => notification.text === payload.text
    )

    if (index >= 0) {
      state.notifications.splice(index, 1)
    }
  },
  addServiceData(state, payload) {
    Vue.set(state.serviceData, payload.id, payload)
  },
}

export const actions = {
  ADD_SERVICE({ commit }, payload) {
    commit('addService', payload)
  },
  REMOVE_SERVICE({ commit }, payload) {
    commit('removeService', payload)
  },
  STAGE_UPDATE({ commit }, payload) {
    commit('stageUpdate', payload)
  },
  UPDATE_PROFILE({ commit }) {
    commit('updateProfile')
  },
  ADD_TO_SHARED({ commit }, payload) {
    commit('addToShared', payload)
  },
  RESET_SHARED({ commit }) {
    commit('resetShared')
  },
  ADD_DOCUMENT({ commit }, payload) {
    commit('addDocument', payload)
  },
  ADD_MESSAGE({ commit }, payload) {
    commit('addMessage', payload)
  },
  ADD_ACTIVITY({ commit }, payload) {
    commit('addActivity', payload)
  },
  ADD_SERVICE_DATA({ commit }, payload) {
    commit('addServiceData', payload)
  },
  DISMISS_NOTIFICATION({ commit }, payload) {
    commit('dismissNotification', payload)
  },
}
