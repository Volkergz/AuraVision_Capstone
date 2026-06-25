// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación para navegación entre pantallas
import { router } from 'expo-router';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setError('');

    // Validación para que los campos no esten vacios
    if (!email.trim() || !password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    // Validar email
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError('Ingresa un email válido.');
      return;
    }

    if (email !== cleanEmail) {
      setError('El email no debe contener espacios.');
      return;
    }

    //Validación contrañeseña
    
    // Validación campos vacios
    if (!password.trim()) {
      setError('Completa todos los campos.');
      return;
    }

    // Validación longitud mínimo 8 caracteres y máximo 20
    if (password.length < 8 || password.length > 20) {
      setError('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }

    // Validación para no permitir espacios
    if (password.includes(' ')) {
      setError('La contraseña no debe contener espacios.');
      return;
    }

    // Validación que al menos debe contener una letra
    if (!/[a-zA-Z]/.test(password)) {
      setError('La contraseña debe contener al menos una letra.');
      return;
    }

    // Validación que al menos debe contener un número
    if (!/\d/.test(password)) {
      setError('La contraseña debe contener al menos un número.');
      return;
    }

    // Validación que al menos debe contener un caracter especial
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(password)) {
      setError('La contraseña debe contener al menos un carácter especial.');
      return;
    }

    console.log('Inicio de sesión con éxito.');
    router.replace('/home');
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

          {/* Título principal */}
          <Text style={styles.tittle}>¡Bienvenido!</Text>

          {/* Logo */}
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo} />

              {/* Subtítulo inicio de sesión */}
              <Text style={styles.subtittle}>Inicio de sesión</Text>

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
                  placeholder=""
                  placeholderTextColor=""
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none" />
              </LinearGradient>

              {/* Campo contraseña */}
              <Text style={styles.label}>Contraseña</Text>
              <LinearGradient
                colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                locations={[0, 0.15, 0.5, 0.85, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor=""
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry />
              </LinearGradient>

              {/* Mensaje de error campos vacíos */}
              {error !== '' && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              {/* Enlace para recuperar contraseña */}
              <TouchableOpacity onPress={() => router.push('/forgot_password')}>
                <Text style={styles.forgotPassword}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>

              {/* Botón aceptar */}
              <View style={styles.buttonContainer}>
                <View style={[styles.leftEdge, styles.edge]} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}
                  activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
                <View style={[styles.rightEdge, styles.edge]} />
              </View>

              {/* Enlace registro */}
              <View style={styles.registerContainer}>
                <Text style={styles.textBelow}>¿No tienes cuenta?</Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                  <Text style={styles.textBelow}>Regístrate aquí.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}