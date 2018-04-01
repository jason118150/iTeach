import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleBar: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#E5F2FF',
  },
  drawerIconContainer: {
    width: 40,
    height: 40,
    margin: 10,
    position: 'absolute',
    zIndex: 2,
  },
  drawerIcon: {
    width: 40,
    height: 40,
    zIndex: 1,
  },
  addSearchIconContainer: {
    width: 35,
    height: 35,
    margin: 12.5,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  addSearchIcon: {
    width: 35,
    height: 35,
    zIndex: 1,
  },
  title: {
    marginHorizontal: 10,
    color: '#3A8FB7',
    fontFamily: 'Avenir',
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
  },
  listContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-around',
  },
  welcomeMsgContainer: {
    height: 300,
  },
  welcomeMsg: {
    fontFamily: 'Avenir',
    fontSize: 16,
    lineHeight: 30,
  },
  list: {
    flex: 1,
  },
  noDisplay: {
    display: 'none',
  },
})
