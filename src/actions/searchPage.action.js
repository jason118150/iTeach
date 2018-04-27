import { createActions } from 'redux-actions'

/*  if you call nav.openDrawer()
    the returned action will be
    {
      type: 'searchPage/startSearch',
      payload: null,
    }

*/

const { searchPage } = createActions({
  searchPage: {
    startSearch: () => null,
  },
})

export default searchPage
