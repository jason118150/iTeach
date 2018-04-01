const initialState = {
  classes: [],
}

const reducerMap = {
  classList: {
    get: (state, action) => ({ ...state, classMenu: { ...state.classMenu, classes: action.payload } }),
    set: (state, action) => {
      if (action.payload) {
        return { ...state, classMenu: { ...state.classMenu, classes: action.payload } }
      }
      return state
    },
  },
}

export default { reducerMap, initialState }
