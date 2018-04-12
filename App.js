import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { addNavigationHelpers } from 'react-navigation'
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import PropTypes from 'prop-types'
import reducer from './src/reducers'
import RootNavigator from './src/navigator/RootNavigator'
import account from './src/actions/account'
import nav from './src/actions/nav'
import initComplete from './src/actions/initComplete'
// import classMenu from './src/actions/classMenu'

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)
const addListener = createReduxBoundAddListener('root')
const store = createStore(reducer, applyMiddleware(middleware))

const initStore = async () => {
  // Load data from local storage
  store.dispatch({
    type: 'classMenu/classList/get',
    payload: [{
      title: '網路與多媒體實驗',
      color: 'red',
    }, {
      title: '機器學習及其深層與結構化',
      color: 'blue',
    }, {
      title: '資料庫系統-從SQL到NoSQL',
      color: 'green',
    }],
  })
  // store.dispatch(await classMenu.classList.get())
  store.dispatch(await account.get())
  if (store.getState().account.username !== '') {
    store.dispatch(nav.classMenu())
  }
  // Load Complete
  store.dispatch(initComplete())
}

initStore()

const mapStateToProps = state => ({
  nav: state.nav,
})

class Root extends Component {
  render() {
    StatusBar.setBarStyle('light-content', true)
    return (
      <RootNavigator navigation={ addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      }) } />
    )
  }
}

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const RootWithNavigation = connect(mapStateToProps)(Root)

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <RootWithNavigation />
      </Provider>
    )
  }
}
