import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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

  tittle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 600,
    marginBottom: 20,
  },

  logo: {
    width: '60%',
    height: 180,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  subtittle: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 600,
    color: '#24123A',
    marginBottom: 25,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 4,
  },

  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#24123A',
    marginBottom: 6,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  inputGradient: {
    height: 36,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#000',
    paddingHorizontal: 18,
    justifyContent: 'center',
    marginBottom: 20,
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

  buttonContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 10,
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

  leftEdge: {
    position: 'absolute',
    top: -3,
    left: -6,
    width: 16,
    height: 16,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#24123A',
    borderTopLeftRadius: 35,
  },

  rightEdge: {
    position: 'absolute',
    bottom: -3,
    right: -6,
    width: 16,
    height: 16,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#24123A',
    borderBottomRightRadius: 35,
  },

  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  textBelow: {
    color: '#24123A',
    fontWeight: '700',
    fontSize: 14,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    textAlign: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    padding: 5,
  },
});