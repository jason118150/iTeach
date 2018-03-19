import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Login from './src/pages/Login'
import Home from './src/pages/Home'

const App = SwitchNavigator({
  Login: {
    screen: Login,
  },
  Pages: DrawerNavigator({
    Home: {
      screen: Home,
    },
  }),
})

export default App