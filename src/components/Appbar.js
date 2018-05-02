import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './styles/Header.styles'
import CloseImage from '../../asset/close.png'
import DrawerImage from '../../asset/drawer.png'
import navAction from '../actions/nav.action'

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.course()) },
  },
})

class Appbar extends Component {
  render() {
    return (
      <View style={styles.titleBar}>
        <TouchableHighlight style={styles.drawerIconContainer} onPress={this.props.navAction.openDrawer} underlayColor='#3A8FB7'>
          <Image style={styles.drawerIcon} source={DrawerImage} />
        </TouchableHighlight>
        <Text style={styles.title}>
          課程資訊
        </Text>
        <TouchableHighlight style={styles.addSearchIconContainer} onPress={this.props.navAction.onExit} underlayColor='#3A8FB7'>
          <Image style={styles.addSearchIcon} source={CloseImage} />
        </TouchableHighlight>
      </View>
    )
  }
}

Appbar.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }),
}

export default connect(() => ({}), mapDispatchToProps)(Appbar)
