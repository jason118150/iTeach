import CourseItemData from '../components/CourseItemData'

const initialState = {
  courseItem: CourseItemData,
}

const reducerMap = {
  set: (state, action) => {
    if (action.payload) {
      const menu = CourseItemData.filter(item => item.id === action.payload)[0]
      const { onclick } = state.courseItem.courseItem[menu.id]
      const newState = menu.id === 1 ? {
        id: menu.id,
        title: !onclick ? menu.clicked.title : menu.title,
        imgSrc: !onclick ? menu.clicked.imgSrc : menu.imgSrc,
        user: menu.user,
        onclick: !onclick,
        clicked: menu.clicked,
      } : {
        id: action.payload,
        title: menu.title,
        imgSrc: menu.imgSrc,
        user: menu.user,
      }
      state.courseItem.courseItem.splice(action.payload, 1, newState)
      return state
    }
    return state
  },
}

export default { reducerMap, initialState }
