import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  //Estilo para contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#7B2CBF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  //Estilo para card
  cardWrapper: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#2A134A',
    borderRadius: 35,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 35,
  },

  //Estilos logo
  logo: {
    width: '60%',
    height: 180,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  //Estilos para logo pequeño 
  logoSmall: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 80,
    height: 60,
    resizeMode: 'contain',
  },

  //Estilos para título y subtítulo
  tittle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 600,
    marginBottom: 20,
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

  subtittleForgot: {
    marginTop: 25,
  },

  //Estilos label
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#24123A',
    marginBottom: 6,
  },

  //Estilos input
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 1,
    paddingVertical: 0,
    includeFontPadding: false
  },

  inputGradient: {
    height: 40,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#000',
    paddingHorizontal: 18,
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },

  //Estilos para enlace de olvidaste tu contraseña
  forgotPassword: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#24123A',
    fontSize: 14,
    marginBottom: 20,
    marginTop: 20,
  },

  //Estilos botón
  buttonContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 10,
  },

  buttonForgot: {
    alignSelf: 'center',
    position: 'relative',
    marginTop: 20,
    marginBottom: 15,
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

  //Estilos para bordes de botón
  edge: {
    position: 'absolute',
    borderColor: '#24123A',
    width: 16,
    height: 16,
  },

  leftEdge: {
    top: -3,
    left: -6,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 35,
  },

  rightEdge: {
    bottom: -3,
    right: -6,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 35,
  },

  //Estilos para ya tienes una cuenta (iniciar sesión)
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  textBelow: {
    color: '#24123A',
    fontWeight: '700',
    fontSize: 14,
  },

  //Estilos para mensaje de error
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    textAlign: 'center',
  },

  //Estilo para botón volver
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    padding: 5,
  },

  // Estilos para modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },

  closeModal: {
    position: 'absolute',
    top: 5,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },


  modalTitle: {
    color: '#9B00FF',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 35,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 3,
  },

  modalButton: {
    backgroundColor: '#9B00FF',
    width: 150,
    height: 30,
    borderRadius: 4,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },

  //Estilos inicio
  homeContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },

  homeTextBox: {
    flex: 1,
  },

  homeTitle: {
    color: '#9B00FF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },

  homeValue: {
    color: '#24123A',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 18,
    left: 25,
    right: 25,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,

  },

  bottomHome: {
    paddingTop: 9,
  },

   bottomHome2: {
    paddingTop: 4,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  navTextActive: {
    color: '#9B00FF',
    fontSize: 11,
    fontWeight: '700',
  },

  navText: {
    color: '#555',
    fontSize: 11,
    fontWeight: '600',
  },

  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },

  activeLine: {
    width: 55,
    height: 4,
    backgroundColor: '#9B00FF',
    borderRadius: 2,
    marginTop: 1,
  },

  secondaryCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  scroll: {
    flex: 1,
    width: '100%',
  },

  scrollContent: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});