import { DrawerNavigator, SwitchNavigator } from 'react-navigation'
import Login from '../pages/Login'
import Course from '../pages/Course'
import ClassMenu from '../pages/ClassMenu'
import EditProfile from '../pages/EditProfile'
import Channels from '../pages/Channels'
import DrawerContainer from '../pages/DrawerContainer'
import SearchPage from '../pages/SearchPage'
import AddNewCourse from '../pages/AddNewCourse'

export default SwitchNavigator({
  Login: {
    screen: Login,
  },
  Course: {
    screen: Course,
  },
  SearchPage: {
    screen: SearchPage,
  },
  Pages: DrawerNavigator({
    EditProfile: {
      screen: EditProfile, // Page for 修改個人資料
    },
    Channels: {
      screen: Channels, // Page for 切換頻道
    },
    ClassMenu: {
      screen: ClassMenu,
    },
    AddNewCourse: {
      screen: AddNewCourse, // Page for 新增課程
    },
  }, {
    contentComponent: DrawerContainer,
    drawerWidth: 300,
    drawerPosition: 'left',
  }),
}, {
  initialRouteName: 'Login',
})