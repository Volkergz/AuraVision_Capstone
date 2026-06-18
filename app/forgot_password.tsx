// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

//Importaciín navegación entre pantallas
import { router } from 'expo-router';

// Importación para iconos
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPassword() {

  // Estado para guardar los datos del usuario
  const [email, setEmail] = useState('');

  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');

  // Estado que muestra el modal
  const [showModal, setShowModal] = useState(false);

  // Estado para guardar el código de verificación
  const [code, setCode] = useState(['', '', '', '', '', '']);

  //Función para manejar error de modal
  const [modalError, setModalError] = useState('');

  //Función para verificar código este completo antes de enviar
  const handleVerifyCode = () => {
    const verificationCode = code.join('');
    setModalError('');

    // Validar que los campos esten completos
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

    //Función para validar email
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Ingresa tu email.');
      return;
    }

    if (email !== cleanEmail) {
      setError('El email no debe contener espacios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError('Ingresa un email válido.');
      return;
    }

    console.log('Código enviado al email.');

    // Limpiar modal antes de abrirlo
    setModalError('');
    setCode(['', '', '', '', '', '']);

    //Se abre el modal al email ser válido
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
            style={styles.logoSmall} />

          {/* Título principal */}
          <View style={styles.card}>
            <Text style={[styles.subtittle, styles.subtittleForgot]}>
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
              <View style={[styles.leftEdge, styles.edge]} />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSend}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <View style={[styles.rightEdge, styles.edge]} />
            </View>

            {/* Icono volver */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push('/login')}>
              <Ionicons
                name="arrow-back"
                size={28}
                color="#2A134A" />
            </TouchableOpacity>
          </View>

          {/* Modal */}
          <Modal
            visible={showModal}
            transparent
            animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>

                {/* Botón para cerrar el modal */}
                <TouchableOpacity
                  style={styles.closeModal}
                  onPress={() => setShowModal(false)}>
                  <Text style={styles.closeModalText}>×</Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>
                  Ingresa el código de verificación
                </Text>

                {/* Contenedor de código de verificación */}
                <View style={styles.codeContainer}>
                  {code.map((value, index) => (
                    <TextInput
                      key={index}
                      style={styles.codeInput}
                      value={value}
                      onChangeText={(text) => {
                        const onlyNumber = text.replace(/[^0-9]/g, '');
                        const newCode = [...code];
                        newCode[index] = onlyNumber.slice(-1);
                        setCode(newCode);
                      }}
                      keyboardType="number-pad"
                      maxLength={1} />
                  ))}
                </View>
                {modalError !== '' && (
                  <Text style={styles.modalErrorText}>{modalError}</Text>
                )}

                {/* Botón aceptar */}
                <TouchableOpacity
                  style={styles.modalButton}
                  activeOpacity={0.8}
                  onPress={handleVerifyCode}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}