import CourseItemData from '../components/CourseItemData'

const initialState = {
  courseItem: CourseItemData,
}

const reducerMap = {
  set: (state, action) => {
    if (action.payload) {
      const menu = CourseItemData.filter(item => item.id === action.payload)[0]
      const { onclick } = state.courseItem.courseItem[menu.id]
      const menuState = menu.id === 1 ? [{
        id: menu.id,
        title: menu.title,
        imgSrc: menu.imgSrc,
        user: menu.user,
        onclick: !onclick,
      }] : [{
        id: action.payload,
        title: menu.title,
        imgSrc: menu.imgSrc,
        user: menu.user,
      }]
      const newState = state.courseItem.courseItem.slice(0, action.payload)
        .concat(
          menuState,
          state.courseItem.courseItem.slice(action.payload + 1),
        )
      return {
        ...state,
        courseItem: {
          courseItem: newState,
        },
      }
    }
    return state
  },
}

export default { reducerMap, initialState }
