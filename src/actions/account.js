import {
  AsyncStorage,
  Alert,
} from 'react-native'

export default {
  set: async (account) => {
    let success = false
    await AsyncStorage.setItem('iTeachStore:Account', JSON.stringify(account), (error) => {
      if (error) {
        Alert.alert(
          '註冊錯誤',
          [{ text: 'OK' }],
        )
      } else {
        success = true
      }
    })
    if (success) {
      return {
        type: 'account/set',
        payload: account,
      }
    }
    return {
      type: 'account/set',
      payload: {
        status: '',
        username: '',
        email: '',
      },
    }
  },
  get: async () => {
    let account = JSON.parse(await AsyncStorage.getItem('iTeachStore:Account'))
    if (account == null) {
      account = {
        status: '',
        username: '',
        email: '',
      }
    }
    return {
      type: 'account/get',
      payload: account,
    }
  },
}
