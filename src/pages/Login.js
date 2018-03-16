import React, { Component } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Alert,
  AsyncStorage,
} from 'react-native'
import { Picker } from 'react-native-picker-dropdown'
import PropTypes from 'prop-types'
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
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{ uri: '' }} />
      </View>
      <View style={styles.form}>
        <View style={styles.formInput}>
          <Text style={styles.text}>
            身份 ：
          </Text>
          <Picker
            style={styles.picker}
            textStyle={styles.text}
            selectedValue={this.state.status}
            onValueChange={itemValue => this.setState({ status: itemValue })}>
            <Picker.Item label='老師' value='teacher' />
            <Picker.Item label='學生' value='student' />
          </Picker>
          <Text style={styles.text}>
            暱稱 ：
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={username => this.setState({ username })}
            value={this.state.username} />
          <Text style={styles.text}>
            E-mail :
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            value={this.state.email} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            underlayColor='steelblue'
            onPress={this.onPress}
            style={styles.button}>
            <Text style={styles.buttonLabel}>
              註冊
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
