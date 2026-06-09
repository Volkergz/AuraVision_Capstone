// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

//Importaciín navegación entre pantallas
import { router } from 'expo-router';

// Definición de estados
export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = () => {
    setError('');
    if (!password || !repeatPassword) {
      setError('Completa todos los campos.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
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

          {/* Título principal */}
          <View style={styles.card}>
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