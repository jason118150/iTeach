import { createActions } from 'redux-actions'

const { course } = createActions({
  course: {
    set: courseName => courseName,
    setName: title => dispatch => dispatch(course.set(title)),
  },
})

export default course
