import categories from '@/data/categories.json'

export const state = () => ({
  categories,
})

export const getters = {
  getCategories: (state) => state.categories,
}
