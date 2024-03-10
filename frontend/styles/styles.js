import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
  },
  colorPart: {
    flex: 1,
    backgroundColor: '#213246',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  whitePart: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 300,
    height: 300,
    position:"relative",
    bottom:350
  },
  formContainer: {
    width: '80%', 
    alignItems: 'center',
    position:"absolute",
    top:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius:10,
  },
  button: {
    backgroundColor: '#7fa142', // Button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:300,
    borderRadius:10
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:"center"
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});
