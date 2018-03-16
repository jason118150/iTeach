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
  title: {
    marginHorizontal: 10,
    color: 'powderblue',
    fontFamily: 'Avenir',
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
  },
})
