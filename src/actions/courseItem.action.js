import { createActions } from 'redux-actions'

const { courseItem } = createActions({
  courseItem: {
    set: courseName => courseName,
    setName: id => dispatch => dispatch(courseItem.set(id)),
  },
})

export default courseItem
