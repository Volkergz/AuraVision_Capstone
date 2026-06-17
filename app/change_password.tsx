// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

//Importación navegación entre pantallas
import { router } from 'expo-router';

// Importación para iconos
import { Ionicons } from '@expo/vector-icons';

export default function ChangePassword() {

  // Estado para guardar la nueva contraseña
  const [password, setPassword] = useState('');

  // Estado para guardar la repetición de la contraseña 
  const [repeatPassword, setRepeatPassword] = useState('');

  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');

  // Función para validar y actualizar contraseña
  const handleChangePassword = () => {
    setError('');

    // Validación para que los campos no esten vacios
    if (!password.trim() || !repeatPassword.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    // Validar longitud de contraseña (8  caracteres)
    if (password.length !== 8 || repeatPassword.length !== 8) {
      setError('Las contraseñas deben tener 8 caracteres.');
      return;
    }

    // Validar que la contraseña no tenga espacios
    if (password.includes(' ') || repeatPassword.includes(' ')) {
      setError('La contraseña no debe tener espacios.');
      return;
    }

    // Validar que tenga al menos una letra (evitar que sean solo números)
    if (!/[a-zA-Z]/.test(password)) {
      setError('La contraseña debe tener al menos una letra.');
      return;
    }

    // Validar que tenga al menos un número
    if (!/\d/.test(password)) {
      setError('La contraseña debe tener al menos un número.');
      return;
    }
    
    // Validar que las contraseñas coincidan
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    console.log('Contraseña actualizada correctamente.');
    router.replace('/login');
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
          <View style={styles.card}>

            {/* Icono volver */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push('/forgot_password')}>
              <Ionicons
                name="arrow-back"
                size={28}
                color="#2A134A"/>
            </TouchableOpacity>

            {/* Título principal */}
            <Text style={styles.subtittleForgot}>
              Cambiar contraseña
            </Text>

            {/* Campo nueva contraseña */}
            <Text style={styles.label}>
              Nueva contraseña
            </Text>
            <LinearGradient
              colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
              locations={[0, 0.15, 0.5, 0.85, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry />
            </LinearGradient>

            {/* Campo repetir contraseña */}
            <Text style={styles.label}>
              Repetir contraseña
            </Text>

            <LinearGradient
              colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
              locations={[0, 0.15, 0.5, 0.85, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.input}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry />
            </LinearGradient>

            {/* Mensaje de error campos vacíos */}
            {error !== '' && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {/* Botón aceptar */}
            <View style={styles.buttonForgot}>
              <View style={styles.leftEdge} />
              <TouchableOpacity
                style={styles.button}
                onPress={handleChangePassword}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>
                  Aceptar
                </Text>
              </TouchableOpacity>
              <View style={styles.rightEdge} />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}