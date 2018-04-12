import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import PropTypes from 'prop-types'
import reducer from './src/reducers'
import RootNavigator from './src/navigator/RootNavigator'
import accountAction from './src/actions/account.action'
// import classMenu from './src/actions/classMenu'
import middlewares from './src/util/middlewares'

const addListener = createReduxBoundAddListener('root')
const store = createStore(reducer, applyMiddleware(...middlewares))

const initStore = async () => {
  // Load data from local storage
  store.dispatch({
    type: 'classMenu/classList/set',
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
  store.dispatch(accountAction.get())
}

initStore()

const mapStateToProps = state => ({
  nav: state.nav,
})

class Root extends Component {
  render() {
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
