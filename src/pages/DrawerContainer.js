import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './styles/DrawerContainer.styles'
import nav from '../actions/nav'

const mapStateToProps = state => ({
  username: state.account.username,
})

const mapDispatchToProps = dispatch => ({
  nav: {
    classMenu: () => { dispatch(nav.classMenu()) },
    editProfile: () => { dispatch(nav.editProfile()) },
    channels: () => { dispatch(nav.channels()) },
    closeDrawer: () => { dispatch(nav.closeDrawer()) },
  },
})

class DrawerContainer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text
            style={styles.usernameItem}>
            {this.props.username}
          </Text>
          <Text
            onPress={this.props.nav.classMenu}
            style={styles.drawerItem}>
            課程選單
          </Text>
          <Text
            onPress={this.props.nav.editProfile}
            style={styles.drawerItem}>
            修改個人資料
          </Text>
          <Text
            onPress={this.props.nav.channels}
            style={styles.drawerItem}>
            切換頻道
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <Text
            onPress={this.props.nav.closeDrawer}
            style={styles.drawerItem}>
            取消
          </Text>
        </View>
      </View>
    )
  }
}

DrawerContainer.propTypes = {
  nav: PropTypes.shape({
    classMenu: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired,
    channels: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer)
