import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#3A8FB7',
  },
  titleBar: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#3A8FB7',
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
    width: 45,
    height: 45,
    margin: 12.5,
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  addSearchIcon: {
    width: 45,
    height: 45,
    zIndex: 1,
  },
  title: {
    marginHorizontal: 10,
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
  },
  itemContainer: {
    padding: '5%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
})
