// Importación de hook para manejar estados
import { useState } from 'react';
// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';
// Importación para navegación
import { router } from 'expo-router';
// Importación para iconos
import { Ionicons } from '@expo/vector-icons';
// Importación de estilos
import { styles } from '../constants/styles';
// Importación de componentes
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Definición de estados para guardar los datos del usuario
export default function Register() {
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [names, setNames] = useState('');
  const [surnames, setSurnames] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  // Contraseña
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');

  // Validar los datos
  const handleNext = () => {
    setError('');

    // Eliminar espacios de los campos
    const valNames = names.trim();
    const valSurnames = surnames.trim();
    const valDate = birthdate.trim();
    const valEmail = email.trim();

    // Formato de email
    const valEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Validación permitir solo números
    const valNumbers = /^[0-9]+$/;

    // Validar todos los campos completados
    if (!valNames || !valSurnames || !valDate || !valEmail) {
      setError('Completa todos los campos.');
      return;
    }

    // Validar al menos 1 nombre ingresado
    if (valNames.split(/\s+/).length < 1) {
      setError('Ingresa al menos un nombre.');
      return;
    }


    // Validar que se ingresen ambos apellidos
    if (valSurnames.split(/\s+/).length < 2) {
      setError('Ingresa ambos apellidos.');
      return;
    }

    // Validar que la fecha solo tenga números
    if (!valNumbers.test(valDate)) {
      setError('La fecha de nacimiento debe contener solo números.');
      return;
    }

    // Validar que el email tenga el formato correcto
    if (!valEmailRegex.test(valEmail)) {
      setError('Ingresa un email válido.');
      return;
    }

    setShowPasswordCard(true);
  };

  // Función para validar contraseña y terminar el registro
  const handleRegister = () => {
    setError('');

    // Validación para que los campos no esten vacios
    if (!password.trim() || !repeatPassword.trim()) {
      setError('Completa todos los campos.');
      return;
    }
    // Validación para longitud de contraseña (8  caracteres)
    if (password.length !== 8 || repeatPassword.length !== 8) {
      setError('Las contraseñas deben tener 8 caracteres.');
      return;
    }
    // Validar que las contraseñas coincidan
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    // Verificar que no hayan espacios
    if (password.includes(' ') || repeatPassword.includes(' ')) {
      setError('La contraseña no debe tener espacios.');
      return;
    }
    // Validar que tenga al menos una letra (evitar que sean solo números)
    if (!/[a-zA-Z]/.test(password)) {
      setError('La contraseña debe tener al menos una letra.');
      return;
    }
    // Validar que la contraseña tenga al menos un número
    if (!/\d/.test(password)) {
      setError('La contraseña debe tener al menos un número.');
      return;
    }

    console.log('Usuario registrado con éxito.');
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

          <View style={styles.card}>

            {/* Logo */}
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo} />

            {/* Subtítulo registro */}
            <Text style={styles.subtittle}>Registro</Text>

            {/* Cambiar entre cards */}
            {!showPasswordCard ? ( <>

                {/* Campo nombres */}
                <Text style={styles.label}>Nombres</Text>
                <LinearGradient
                  colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                  locations={[0, 0.15, 0.5, 0.85, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={names}
                    onChangeText={setNames} />
                </LinearGradient>

                {/* Campo apellidos */}
                <Text style={styles.label}>Apellidos</Text>
                <LinearGradient
                  colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                  locations={[0, 0.15, 0.5, 0.85, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={surnames}
                    onChangeText={setSurnames} />
                </LinearGradient>

                {/* Campo fecha de nacimiento */}
                <Text style={styles.label}>Fecha de nacimiento</Text>
                <LinearGradient
                  colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                  locations={[0, 0.15, 0.5, 0.85, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#666"
                    value={birthdate}
                    onChangeText={setBirthdate} />
                </LinearGradient>

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
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail} />
                </LinearGradient>

                {/* Mensaje de error campos vacíos */}
                {error !== '' && (
                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                )}

                {/* Botón siguiente */}
                <View style={styles.buttonContainer}>
                  <View style={styles.leftEdge} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleNext}
                    activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Siguiente</Text>
                  </TouchableOpacity>
                  <View style={styles.rightEdge} />
                </View>

                {/* Enlace inicio de sesión */}
                <View style={styles.registerContainer}>
                  <Text style={styles.textBelow}>¿Ya tienes una cuenta?</Text>
                  <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.textBelow}>Entra aquí.</Text>
                  </TouchableOpacity>
                </View> </>
            ) : ( <>

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
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword} />
                </LinearGradient>

                {/* Repetir contraseña */}
                <Text style={styles.label}>Repetir contraseña</Text>
                <LinearGradient
                  colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                  locations={[0, 0.15, 0.5, 0.85, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={repeatPassword}
                    onChangeText={setRepeatPassword} />
                </LinearGradient>

                {/* Mensaje de error campos vacíos */}
                {error !== '' && (
                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                )}

                {/* Botón aceptar */}
                <View style={styles.buttonContainer}>
                  <View style={styles.leftEdge} />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                    activeOpacity={0.8}>
                    <Text style={styles.buttonText}>Aceptar</Text>
                  </TouchableOpacity>
                  <View style={styles.rightEdge} />
                </View>

                {/* Icono volver */}
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setShowPasswordCard(false)}>
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#2A134A" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}