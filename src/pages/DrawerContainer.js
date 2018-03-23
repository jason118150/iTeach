import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, AsyncStorage } from 'react-native'
import styles from './styles/DrawerContainer.styles'


export default class DrawerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      username: '',
      email: '',
    }
  }

  async componentWillMount() {
    // 從本地資料庫中撈出舊帳戶資料
    const storeState = await AsyncStorage.getItem('iTeachStore')
    this.setState(JSON.parse(storeState))
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text
            style={styles.usernameItem}>
            {this.state.username}
          </Text>
          <Text
            onPress={() => navigation.navigate('Home')}
            style={styles.drawerItem}>
            主頁
          </Text>
          <Text
            onPress={() => navigation.navigate('Edit')}
            style={styles.drawerItem}>
            修改個人資料
          </Text>
          <Text
            onPress={() => navigation.navigate('Channels')}
            style={styles.drawerItem}>
            切換頻道
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <Text
            onPress={() => navigation.navigate('DrawerClose')}
            style={styles.drawerItem}>
            取消
          </Text>
        </View>
      </View>
    )
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
