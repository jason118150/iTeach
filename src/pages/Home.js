import React, { Component } from 'react'
import {
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import DrawerImage from '../../asset/drawer.png'
import styles from './styles/Home.styles'


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.openDrawer = this.openDrawer.bind(this)
  }

  static navigationOptions = {
    drawerLabel: '預設頻道',
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen')
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableHighlight style={styles.drawerIconContainer} onPress={this.openDrawer} underlayColor='white'>
          <Image style={styles.drawerIcon} source={DrawerImage} />
        </TouchableHighlight>
        <Text style={styles.title}>
          預設頻道
        </Text>
      </View>
    </View>
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
