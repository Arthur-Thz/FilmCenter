import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101014',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  formContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1C1C22',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    marginBottom: 15,
    fontSize: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#E50914',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});