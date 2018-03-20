import React, { Component } from 'react'
import {
  View,
  Alert,
  AsyncStorage,
} from 'react-native'
import PropTypes from 'prop-types'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextFormInput from '../components/TextFormInput'
import styles from './styles/Login.styles'
import signUpValidation from '../util/signUpValidation'


export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      username: '',
      email: '',
    }
    this.onPressConfirm = this.onPressConfirm.bind(this)
    this.onPressCancel = this.onPressCancel.bind(this)
  }

  async componentWillMount() {
    // 從本地資料庫中撈出舊帳戶資料
    const storeState = await AsyncStorage.getItem('iTeachStore')
    this.setState(JSON.parse(storeState))
  }

  onPressCancel = () => {
    this.props.navigation.navigate('Home')
  }

  onPressConfirm = () => {
    if (!signUpValidation(this.state).valid) {
      // 不符合規則，跳出警告視窗
      Alert.alert(
        '警告',
        signUpValidation(this.state).description,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      )
      // 檢查應該清除哪行
      switch (signUpValidation(this.state).errorCode) {
      case 1:
        this.setState({
          username: '',
        })
        break
      case 2:
        this.setState({
          email: '',
        })
        break
      default:
        this.setState({
          username: '',
          email: '',
        })
      }
    } else {
      // 符合規則，跳轉到HomePage
      AsyncStorage.setItem('iTeachStore', JSON.stringify(this.state), (error) => {
        if (error) {
          Alert.alert(
            '註冊錯誤',
            [{ text: 'OK' }],
          )
        } else {
          this.props.navigation.navigate('Home')
        }
      })
    }
  }

  render() {
    return <View style={styles.container}>
      <Logo />
      <View style={styles.form}>
        <View style={styles.formInput}>
          <TextFormInput
            label='新暱稱 :'
            onChangeText={(username) => { this.setState({ username }) }}
            value={this.state.username} />
          <TextFormInput
            label='新 E-mail :'
            onChangeText={(email) => { this.setState({ email }) }}
            value={this.state.email} />
        </View>
        <Button label='確認' onPress={this.onPressConfirm} />
        <Button label='取消' onPress={this.onPressCancel} />
      </View>
    </View>
  }
}

EditProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
