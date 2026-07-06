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
import { styles_register } from '../constants/styles_register';

// Importación de componentes
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Register() {
  const insets = useSafeAreaInsets();

  // Controlar la primera y segunda parte del registro (contraseña)
  const [showPasswordCard, setShowPasswordCard] = useState(false);

  //Datos personales
  const [names, setNames] = useState('');
  const [surnames, setSurnames] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');

  // Datos contraseña
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');

  // Formato automático a la fecha de nacimiento
  const handleBirthdateChange = (text: string) => {
    // Solo números
    const numbers = text.replace(/\D/g, '');

    let formatted = numbers;

    if (numbers.length > 2) {
      formatted = `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    }

    if (numbers.length > 4) {
      formatted = `${numbers.slice(0, 2)}-${numbers.slice(2, 4)}-${numbers.slice(4, 8)}`;
    }

    setBirthdate(formatted);
  };

  // Validar los primeros datos del registro
  const handleNext = () => {
    setError('');

    // Eliminar espacios vacíos
    const valNames = names.trim();
    const valSurnames = surnames.trim();
    const valDate = birthdate.trim();
    const valEmail = email.trim();

    // Formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Formato fecha de nacimiento
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

    // Validar campos vacíos
    if (!valNames || !valSurnames || !valDate || !valEmail) {
      setError('Completa todos los campos.');
      return;
    }

    // Validación nombres
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valNames)) {
      setError('Los nombres solo pueden contener letras.');
      return;
    }

    // Validación máximo 3 nombres
    const nameCount = valNames.trim().split(/\s+/).length;

    if (nameCount > 3) {
      setError('Ingresa máximo tres nombres.');
      return;
    }

    // Validación apellidos
    const surnameCount = valSurnames.trim().split(/\s+/).length;

    if (surnameCount > 2) {
      setError('Ingresa máximo dos apellidos.');
      return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valSurnames)) {
      setError('Los apellidos solo pueden contener letras.');
      return;
    }

    // Validación formato fecha (DD-MM-AAAA)
    if (!dateRegex.test(valDate)) {
      setError('Ingresa la fecha en formato DD-MM-AAAA.');
      return;
    }

    // Separar día, mes y año
    const [day, month, year] = valDate.split('-').map(Number);

    // Crear fecha
    const birthDate = new Date(year, month - 1, day);

    // Validar que la fecha exista
    if (
      birthDate.getFullYear() !== year ||
      birthDate.getMonth() !== month - 1 ||
      birthDate.getDate() !== day
    ) {
      setError('Ingresa una fecha válida.');
      return;
    }

    // Validar que la fecha no sea futura
    const today = new Date();

    if (birthDate > today) {
      setError('La fecha de nacimiento no puede ser posterior a la fecha actual.');
      return;
    }

    // Validar formato email
    if (!emailRegex.test(valEmail)) {
      setError('Ingresa un email válido.');
      return;
    }
    // Si esta todo correcto se muestra la segunda parte del registro (contraseñas)
    setShowPasswordCard(true);
  };

  // Validar contraseña y terminar el registro
  const handleRegister = () => {
    setError('');

    // Validación campos vacios
    if (!password.trim() || !repeatPassword.trim()) {
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

    // Validación coincidencia de contraseñas ingresadas
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    console.log('Usuario registrado con éxito.');
    router.replace('/home');
  };

  return (
    // Fondo degrade
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
              paddingTop: insets.top + 30,
              paddingBottom: insets.bottom + 30,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          <View style={styles.cardWrapper}>
            <View style={styles.card}>

              {/* Logo */}
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo} />

              {/* Subtítulo registro */}
              <Text style={styles.subtittle}>Registro</Text>

              {/* Cambiar entre cards */}
              {!showPasswordCard ? (
                <>

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
                      onChangeText={setNames}
                      placeholder="Ingresa tus nombres"
                      placeholderTextColor="#777" />
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
                      onChangeText={setSurnames}
                      placeholder="Ingresa tus apellidos"
                      placeholderTextColor="#777" />
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
                      keyboardType="numeric"
                      maxLength={10}
                      value={birthdate}
                      onChangeText={handleBirthdateChange}
                      placeholder="Ingresa tu fecha de nacimiento"
                      placeholderTextColor="#666" />
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
                      onChangeText={setEmail}
                      placeholder="Ingresa tu email"
                      placeholderTextColor="#777" />
                  </LinearGradient>

                  {/* Mensaje de error campos vacíos */}
                  {error !== '' && (
                    <Text style={styles.errorText}>
                      {error}
                    </Text>
                  )}

                  {/* Botón siguiente */}
                  <View style={styles.buttonContainer}>
                    <View style={[styles.leftEdge, styles.edge]
                    } />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleNext}
                      activeOpacity={0.8}>
                      <Text style={styles.buttonText}>Siguiente</Text>
                    </TouchableOpacity>
                    <View style={[styles.rightEdge, styles.edge]} />
                  </View>

                  {/* Enlace inicio de sesión */}
                  <View style={styles.registerContainer}>
                    <Text style={styles.textBelow}>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => router.push('/login')}>
                      <Text style={styles.textBelow}>Entra aquí.</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>

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
                      onChangeText={setPassword}
                      placeholder="Ingresa tu contraseña"
                      placeholderTextColor="#777" />
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
                      onChangeText={setRepeatPassword}
                      placeholder="Repite tu contraseña"
                      placeholderTextColor="#777" />
                  </LinearGradient>

                  {/* Mensaje de error campos vacíos */}
                  {error !== '' && (
                    <Text style={styles.errorText}>
                      {error}
                    </Text>
                  )}

                  {/* Botón aceptar */}
                  <View style={styles.buttonContainer}>
                    <View style={[styles.leftEdge, styles.edge]} />
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleRegister}
                      activeOpacity={0.8}>
                      <Text style={styles.buttonText}>Aceptar</Text>
                    </TouchableOpacity>
                    <View style={[styles.rightEdge, styles.edge]} />
                  </View>

                  {/* Icono volver */}
                  <TouchableOpacity
                    style={styles.backButton}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Volver"
                    onPress={() => setShowPasswordCard(false)}>
                    <Ionicons
                      name="arrow-back"
                      size={28}
                      color="#2A134A"
                      accessible={false}
                      importantForAccessibility="no"
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}