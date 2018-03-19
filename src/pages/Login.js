import React, { Component } from 'react'
import {
  Text,
  View,
  Alert,
  AsyncStorage,
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'
import PropTypes from 'prop-types'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextFormInput from '../components/TextFormInput'
import styles from './styles/Login.styles'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: '',
      username: '',
      email: '',
    }
    this.onPress = this.onPress.bind(this)
  }

  componentWillMount() {
    AsyncStorage.getItem('iTeachStore', (error, result) => {
      if (result) {
        this.props.navigation.navigate('Home')
      }
    })
  }

  onPress = () => {
    AsyncStorage.setItem('iTeachStore', JSON.stringify(this.state), (error) => {
      if (error) {
        Alert.alert(
          '註冊錯誤',
          '該暱稱已經存在',
          [{ text: 'OK' }],
        )
      } else {
        this.props.navigation.navigate('Home')
      }
    })
  }

  render() {
    return <View style={styles.container}>
      <Logo />
      <View style={styles.form}>
        <View style={styles.formInput}>
          <Text style={styles.text}>
            身份 ：
          </Text>
          <Picker
            style={styles.picker}
            textStyle={styles.text}
            selectedValue={this.state.status}
            onValueChange={(itemValue) => { this.setState({ status: itemValue }) }}>
            <Picker.Item label='老師' value='teacher' />
            <Picker.Item label='學生' value='student' />
          </Picker>
          <TextFormInput
            label='暱稱 :'
            onChangeText={(username) => { this.setState({ username }) }}
            value={this.state.username} />
          <TextFormInput
            label='E-mail :'
            onChangeText={(email) => { this.setState({ email }) }}
            value={this.state.email} />
        </View>
        <Button label='註冊' onPress={this.onPress} />
      </View>
    </View>
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
