import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'powderblue',
  },
  form: {
    flex: 3,
    margin: 20,
    alignItems: 'stretch',
  },
  formInput: {
    alignItems: 'flex-start',
    padding: 20,
  },
  text: {
    marginHorizontal: 10,
    color: 'powderblue',
    fontFamily: 'Avenir',
    fontSize: 18,
  },
  picker: {
    height: 40,
    width: 270,
    margin: 10,
    borderColor: 'powderblue',
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: 270,
    padding: 10,
    margin: 10,
    borderColor: 'powderblue',
    borderWidth: 1,
    borderRadius: 10,
    color: 'powderblue',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'powderblue',
  },
  buttonLabel: {
    marginHorizontal: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: 24,
  },
});
