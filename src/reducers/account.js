const initialState = {
  status: '',
  username: '',
  email: '',
}

const reducerMap = {
  set: (state, action) => ({ ...state, account: action.payload }),
}

export default { initialState, reducerMap }
