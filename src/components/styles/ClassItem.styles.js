import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  classItemContainer: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
  },
  scroll: {
    alignItems: 'center',
    width: '120%',
  },
  colorBox: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 0.85,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 20,
  },
  deleteContainer: {
    flex: 0.15,
    height: 50,
    backgroundColor: '#C20C02',
    alignItems: 'center',
  },
  delete: {
    height: 25,
    margin: 12.5,
    aspectRatio: 0.9,
  },
})
