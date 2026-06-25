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

  //Estilos para texto de información en olvidaste tu contraseña
  infoText: {
    color: '#8A00FF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 4,
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

  closeModalText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
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

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 35,
  },

  codeInput: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#000',
    backgroundColor: '#EFEFEF',
    textAlign: 'center',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
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

  modalErrorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },

  //Estilos inicio
  homeContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },

  homeTextBox: {
    flex: 1,
  },

  homeCard: {
    width: '100%',
    minHeight: 130,
    borderRadius: 15,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginBottom: 22,
    flexDirection: 'row',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
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
    marginTop: 0,
  },

  //Estilos ajustes
  settingCardSmall: {
    width: '86%',
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#000',
  },

  settingTitle: {
    color: '#9B00FF',
    fontSize: 22,
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },

  settingNumber: {
    color: '#9B00FF',
    fontSize: 42,
    fontWeight: '700',
    lineHeight: 45,
  },

  settingButton: {
    minWidth: 102,
    height: 24,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  settingButtonText: {
    color: '#9B00FF',
    fontSize: 12,
    fontWeight: '700',
  },

  settingModalCard: {
    width: '85%',
    maxWidth: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },

  settingModalTitle: {
    color: '#9B00FF',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
  },

  settingCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '75%',
    marginBottom: 25,
  },

  settingButtons: {
    color: '#9B00FF',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4,
  },

  settingCounterButton: {
    fontSize: 36,
    fontWeight: '800',

  },

  settingCounterNumber: {
    fontSize: 46,
    fontWeight: '700',
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

  settingCard: {
    width: '86%',
    height: 160,
    borderRadius: 8,
    paddingVertical: 14,
    alignSelf: 'center',
    marginBottom: 26,
    borderWidth: 1,
    borderColor: '#000',
  },

  // Estilos para interfaz profile

  profileCard: {
    width: '100%',
    height: 400,
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },

  profileCardT: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },

  profileInput: {
    width: '100%',
    height: 30,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  profileInputText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },

  profileLabel: {
    color: '#9B00FF',
    fontSize: 22,
    marginTop: 8,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },


  // Estilos modal añadir dispositivo
  addDeviceModalCard: {
    width: '86%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 28,
    paddingHorizontal: 25,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  addDeviceBack: {
    position: 'absolute',
    top: 18,
    left: 18,
  },

  addDeviceTitle: {
    color: '#24123A',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
  },

  addDeviceInfo: {
    color: '#9B00FF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },

  devicesModalCard: {
    width: '86%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  devicesBack: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
  },

  devicesTitle: {
    color: '#24123A',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  devicesList: {
    width: '100%',
  },

  deviceItem: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
  },

  deviceText: {
    color: '#9B00FF',
    fontSize: 16,
    fontWeight: '700',
  },

  confirmDeviceModalCard: {
    width: '75%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  confirmDeviceText: {
    color: '#9B00FF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 22,
  },

  confirmDeviceButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  cancelDeviceButton: {
    width: '45%',
    height: 28,
    backgroundColor: '#555',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  acceptDeviceButton: {
    width: '45%',
    height: 28,
    backgroundColor: '#9B00FF',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelDeviceButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  acceptDeviceButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  deviceHistoryModalCard: {
    width: '86%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },

  deviceHistoryBack: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 1,
  },

  deviceHistoryTitle: {
    color: '#24123A',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  deviceHistoryList: {
    width: '100%',
  },

  deviceHistoryItem: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderTopColor: '#CFCFCF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  deviceHistoryText: {
    color: '#9B00FF',
    fontSize: 16,
    fontWeight: '700',
  },

  homeScroll: {
    flex: 1,
    width: '100%',
  },

  homeScrollContent: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});