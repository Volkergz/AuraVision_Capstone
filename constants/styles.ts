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
    shadowOpacity: 0.5,
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
    fontWeight: 700,
    color: '#24123A',
    marginBottom: 25,
  },

  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#24123A',
    marginBottom: 6,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },

  inputGradient: {
    borderRadius: 25,
    height: 35,
    justifyContent: 'center',
    paddingHorizontal: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000000',
  },

  inputWrapper: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000000',
    overflow: 'hidden',
  },

  forgotPassword: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#24123A',
    fontSize: 14,
    marginBottom: 20,
    marginTop: 20,
  },

  button: {
    backgroundColor: '#24123A',
    height: 40,
    width: 180,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  registerText: {
    color: '#24123A',
    fontWeight: '700',
    fontSize: 14,
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