import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import DrawerImage from '../../asset/drawer.png'
import styles from './styles/ClassMenu.styles'
import navAction from '../actions/nav.action'
import CloseImage from '../../asset/close.png'
import Button from '../components/Button'


const mapStateToProps = state => ({
  status: state.account.status,
  ...state.classMenu,
  // ?
})

const mapDispatchToProps = dispatch => ({
  navAction: {
    openDrawer: () => { dispatch(navAction.openDrawer()) },
    onExit: () => { dispatch(navAction.courseMenu()) },
    // 課程主畫面 而非 classMenu
  },
})

// <Button label='抽籤' onPress : TODO/>
class DrawLots extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <TouchableHighlight style={styles.drawerIconContainer} onPress={this.props.navAction.openDrawer} underlayColor='#3A8FB7'>
            <Image style={styles.drawerIcon} source={DrawerImage} />
          </TouchableHighlight>
          <Text style={styles.title}>
            隨機抽籤
          </Text>
          <TouchableHighlight style={styles.addSearchIconContainer} onPress={this.props.navAction.onExit} underlayColor='#3A8FB7'>
            <Image style={styles.addSearchIcon} source={CloseImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <Text style={styles.centerWelcomeMsg}>
              歡迎進入隨機抽籤
          </Text>
          <Button label='抽籤' onPress={this.props.navAction.onExit}/>
        </View>
      </View>
    )
  }
}

// .propTypes  ~= constructor
// course : proptypes.string,isRequired --> course 「必須」是string
DrawLots.propTypes = {
  navAction: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
  }).isRequired,
  status: PropTypes.string.isRequired,
}
//  connect react component & redux store
export default connect(mapStateToProps, mapDispatchToProps)(DrawLots)

