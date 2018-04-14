import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DrawerImage from '../../asset/drawer.png'
import navAction from '../actions/nav.action'
import styles from './styles/ClassMenu.styles'

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
  },
})

class Channels extends Component {
  render() {
    return <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableHighlight style={styles.drawerIconContainer} onPress={this.props.navAction.openDrawer} underlayColor='#3A8FB7'>
          <Image style={styles.drawerIcon} source={DrawerImage} />
        </TouchableHighlight>
        <Text style={styles.title}>
          切換頻道的頁面
        </Text>
      </View>
    </View>
  }
}

Channels.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(null, mapDispatchToProps)(Channels)
