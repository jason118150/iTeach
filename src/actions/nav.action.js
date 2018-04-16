import { createActions } from 'redux-actions'

/*  if you call nav.openDrawer()
    the returned action will be
    {
      type: 'nav/openDrawer',
      payload: null,
    }

*/

const { nav } = createActions({
  nav: {
    openDrawer: () => null,
    closeDrawer: () => null,
    editProfile: () => null,
    classMenu: () => null,
    channels: () => null,
    searchPage: () => null,
  },
})

export default nav
