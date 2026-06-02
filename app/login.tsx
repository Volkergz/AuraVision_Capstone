// Importación de hook para manejar estados
import { useState } from 'react';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView,
  KeyboardAvoidingView, Platform} from 'react-native';

// Definición de estados
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

// Función simulada para manejar el inicio de sesión (evitar enviar campos vacíos)
  const handleLogin = () => {
    setError('');

    if (!email || !password) {
      setError('Completa todos los campos');
      return;
    }

    console.log('Inicio de sesión correcta');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >

     {/* Contenedor principal */}
        <View style={styles.container}>
          <Text style={styles.bienvenido}>¡Bienvenido!</Text>

          <View style={styles.card}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
            />

            <Text style={styles.title}>Inicio de sesión</Text>

            {error !== '' && (
              <Text style={styles.errorText}>{error}</Text>
            )}

           {/* Campo Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Campo Contraseña */}
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                ¿No tienes cuenta?
              </Text>

              <TouchableOpacity>
                <Text style={styles.registerLink}>
                  Regístrate aquí
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}