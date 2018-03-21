import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Login from './src/pages/Login'
import Home from './src/pages/Home'
import EditProfile from './src/pages/EditProfile'

const App = SwitchNavigator({
  Login: {
    screen: Login,
  },
  Pages: DrawerNavigator({
    Home: {
      screen: Home,
    },
    EditProfile: {
      screen: EditProfile,
    },
  }),
})

export default App
