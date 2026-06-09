// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Modal } from 'react-native';

//Importaciín navegación entre pantallas
import { router } from 'expo-router';

// Definición de estados
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);

  //Función para manejar error de modal
  const [modalError, setModalError] = useState('');

  //Función para verificar código este completo antes de enviar
  const handleVerifyCode = () => {
    const verificationCode = code.join('');

    setModalError('');

    if (verificationCode.length !== 6) {
      setModalError('Ingresa el código completo.');
      return;
    }

    setShowModal(false);
    router.push('/change_password');
  };

  //Función al presionar botón enviar
  const handleSend = () => {
    setError('');

    //Función para validar campo completo y formato de email
    if (!email) {
      setError('Ingresa tu email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingresa un email válido.');
      return;
    }
    console.log('Código enviado al email.');

    //Se abre elmodal al email ser válido
    setShowModal(true);
  };

  return (
    // Comportamiento de la interfaz en dispositivos
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">

        {/* Fondo degrade */}
        <LinearGradient
          colors={['#DEAFFF', '#773DC7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}>

          {/* Logo pequeño en derecha superior */}
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoSmall}/>

          {/* Título principal */}
          <View style={styles.card}>
            <Text style={styles.subtittleForgot}>
              ¿Olvidaste tu contraseña?
            </Text>

            {/* Texto de información */}
            <Text style={styles.infoText}>
              Ingresa tu email y te enviaremos un código de verificación.
            </Text>

            {/* Campo email */}
            <Text style={styles.label}>Email</Text>
            <LinearGradient
              colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
              locations={[0, 0.15, 0.5, 0.85, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none" />
            </LinearGradient>

            {/* Mensaje de error campos vacíos */}
            {error !== '' && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {/* Botón enviar */}
            <View style={styles.buttonForgot}>
              <View style={styles.leftEdge} />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSend}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <View style={styles.rightEdge} />
            </View>
          </View>

          {/* Modal */}
          <Modal
            visible={showModal}
            transparent
            animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <TouchableOpacity
                  style={styles.closeModal}
                  onPress={() => setShowModal(false)}>
                  <Text style={styles.closeModalText}>×</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>
                  Ingresa el código de verificación
                </Text>
                <View style={styles.codeContainer}>
                  {code.map((value, index) => (
                    <TextInput
                      key={index}
                      style={styles.codeInput}
                      value={value}
                      onChangeText={(text) => {
                        const newCode = [...code];
                        newCode[index] = text.slice(-1);
                        setCode(newCode);
                      }}
                      keyboardType="number-pad"
                      maxLength={1}/>
                  ))}
                </View>
                {modalError !== '' && (
                  <Text style={styles.modalErrorText}>{modalError}</Text>
                )}
                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.8}
                  onPress={handleVerifyCode}>
                  <Text style={styles.modalButtonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}