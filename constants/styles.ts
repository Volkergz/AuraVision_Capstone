import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  bienvenido: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 600,
    marginBottom: 20,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    paddingTop: 10,
    paddingBottom: 30,
    paddingRight: 35,
    paddingLeft: 35,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity:0.5,
    shadowRadius: 15,
    elevation: 5,

    borderTopWidth: 10,
    borderTopColor: '#2A134A',
  },

  logo: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    color: '#24123A',
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#24123A',
    marginBottom: 6,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 25,
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  forgotPassword: {
    textAlign: 'right',
    color: '#666',
    fontSize: 12,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#24123A',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  registerText: {
    color: '#555',
    marginBottom: 5,
  },

  registerLink: {
    color: '#24123A',
    fontWeight: 'bold',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
});