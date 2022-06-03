import services from '@/data/services.json'
import providers from '@/data/providers.json'
import categories from '@/data/categories.json'

export const state = () => ({
  services,
  providers,
  categories,
})

export const getters = {
  getServices: (state) => state.services,
  getPopularServices: (state) =>
    state.services.filter((service) => service.isPopular === true),
  getServicesByProvider: (state) => (providerId) =>
    state.services.filter(
      (service) => service.serviceProviderId === providerId
    ),
  getRelatedServicesByProvider: (state) => (providerId) =>
    state.services.filter(
      (service) =>
        service.serviceProviderId === providerId && service.isRelated === true
    ),
  getServicesByCategory: (state) => (categoryId) =>
    state.services.filter((service) => service.categoryId === categoryId),
  getServiceProviders: (state) => state.providers,
  getServiceProviderCount: (state) => (providerId) =>
    state.services.filter((service) => service.serviceProviderId === providerId)
      .length,
  getServiceCategories: (state) => state.categories,
  getServiceCategoryCount: (state) => (categoryId) =>
    state.services.filter((service) => service.categoryId === categoryId)
      .length,
  getService: (state) => (serviceId) => {
    const index = state.services.findIndex(({ id }) => id === serviceId)
    return state.services[index]
  },
  getProvider: (state) => (providerId) => {
    const index = state.providers.findIndex(({ id }) => id === providerId)
    return state.providers[index]
  },
}

export const mutations = {
  addMessage(state, payload) {
    const index = state.services.findIndex(({ id }) => id === payload.id)

    if (index > -1) {
      const messageIndex = state.services[index].messages.findIndex(
        (message) => message === payload.message
      )

      if (messageIndex < 0) {
        state.services[index].messages.push(payload.message)
      }
    }
  },
}

export const actions = {
  ADD_MESSAGE({ commit }, payload) {
    commit('addMessage', payload)
  },
}
