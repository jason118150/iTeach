import {
  AsyncStorage,
  Alert,
} from 'react-native'


export default {
  classList: {
    get: async () => {
      const classes = JSON.parse(await AsyncStorage.getItem('iTeachStore:Class'))
      if (classes) {
        if (classes.length > 0) {
          return {
            type: 'classMenu/classList/get',
            payload: classes,
          }
        }
      }
      return {
        type: 'classMenu/classList/get',
        payload: [],
      }
    },
    set: async (classes) => {
      let success = false
      await AsyncStorage.setItem('iTeachStore:Class', JSON.stringify(classes), (error) => {
        if (error) {
          Alert.alert(
            '課程更新錯誤',
            [{ text: 'OK' }],
          )
        } else {
          success = true
        }
      })
      if (success) {
        return {
          type: 'classMenu/classList/set',
          payload: classes,
        }
      }
      return {
        type: 'classMenu/classList/set',
      }
    },
  },
}
