// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación para navegación entre pantallas
import { router } from 'expo-router';

// Importación de estilos
import { styles } from '../constants/styles';
import { styles_login } from '../constants/styles_login';

// Importación de componentes para interfaz
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function Login() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
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
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: cleanEmail,
            password: password,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.detail || 'Email o contraseña incorrectos.');
        return;
      }

      router.replace('/home');
    } catch {
      setError('No fue posible conectar con el servidor.');
    }


  };

  return (
    //  Fondo degrade 
    <LinearGradient
      colors={['#DEAFFF', '#773DC7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 20,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

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
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  placeholder="Ingresa tu email"
                  placeholderTextColor="#666" />
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
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#666" />
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
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}