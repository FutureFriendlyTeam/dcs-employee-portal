import checklist from '@/data/checklist.json'
import lists from '@/data/lists.json'

export const state = () => ({
  checklist,
  lists,
})

export const getters = {
  getChecklist: (state) => state.checklist,
  getLists: (state) => state.lists,
  getTasksByList: (state) => (list) =>
    state.checklist.filter((task) => task.list === list),
}
