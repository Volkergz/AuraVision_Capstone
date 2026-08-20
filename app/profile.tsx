// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Importación de iconos
import { Ionicons } from '@expo/vector-icons';

// Importación de estilos
import { styles } from '../constants/styles';
import { styles_profile } from '../constants/styles_profile';

//Importaciín navegación entre pantallas
import { router } from 'expo-router';

// Importación de hook para manejar estados
import { useEffect, useState } from 'react';

// Importación de SecureStore para guardar tokens de sesión
import * as SecureStore from 'expo-secure-store';

// URL del backend
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function Profile() {

  // Estado para guardar los datos reales del usuario autenticado
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const insets = useSafeAreaInsets();

  // Obtiene los datos del usuario usando el token guardado al iniciar sesión
  useEffect(() => {
    const loadProfile = async () => {
      const token = await SecureStore.getItemAsync('access_token');

      if (!token) {
        setError('No se encontró el token de sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json().catch(() => ({}));

        // Si el token venció o no es válido, elimina la sesión
        if (response.status === 401 || response.status === 403) {
          setError(`El backend rechazó el token. Código: ${response.status}`);
          return;
        }

        if (!response.ok) {
          setError(
            data.detail || `No fue posible cargar el perfil. Código: ${response.status}`,
          );
          return;
        }

        // Permite recibir los datos directamente o dentro de la propiedad "user"
        const profileData = data.user || data;

        setUser({
          nombre: profileData.nombre || profileData.nombres || '',
          apellido: profileData.apellido || profileData.apellidos || '',
          email: profileData.email || '',
        });
      } catch {
        setError('No fue posible cargar los datos del perfil.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Elimina los tokens guardados y finaliza la sesión del usuario
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');

    router.replace('/login');
  };

  return (
    <LinearGradient
      colors={['#DEAFFF', '#773DC7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.homeContainer}>

      {/* Logo pequeño en derecha superior */}
      <Image
        source={require('../assets/images/logo.png')}
        style={[
          styles.logoSmall,
          { top: insets.top + 5 },
        ]}
      />

      {/* Contenido adaptable */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 70,
            paddingBottom: insets.bottom + 95,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Card datos personales */}
        <View style={[styles_profile.profileCard, styles.secondaryCard]}>
          <View style={styles.homeTextBox}>
            <Text style={styles_profile.profileTittle}>Datos personales</Text>
            {error !== '' && (
              <Text style={styles_profile.profileInputText}>{error}</Text>
            )}

            <Text style={styles_profile.profileLabel}>Nombres</Text>
            <View style={styles_profile.profileInput}>
              <Text style={styles_profile.profileInputText}>
                {loading ? 'Cargando...' : user.nombre || '-'}
              </Text>
            </View>
            <Text style={styles_profile.profileLabel}>Apellidos</Text>
            <View style={styles_profile.profileInput}>
              <Text style={styles_profile.profileInputText}>
                {loading ? 'Cargando...' : user.apellido || '-'}
              </Text>
            </View>

            <Text style={styles_profile.profileLabel}>Email</Text>
            <View style={styles_profile.profileInput}>
              <Text style={styles_profile.profileInputText}>
                {loading ? 'Cargando...' : user.email || '-'}
              </Text>
            </View>

            {/* Botones pequeños */}
            <View style={styles_profile.profileButtonRow}>
              <TouchableOpacity style={styles_profile.profileSmallButton}
                onPress={() => router.push('/change_profile')}>
                <Text style={styles_profile.profileSmallButtonText}>
                  Modificar{'\n'}perfil
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles_profile.profileSmallButton}
                onPress={() => router.push('/change_passprofile')}>
                <Text style={styles_profile.profileSmallButtonText}>
                  Cambiar{'\n'}contraseña
                </Text>
              </TouchableOpacity>
            </View>

            {/* Botón cerrar sesión */}
            <TouchableOpacity
              style={styles_profile.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles_profile.logoutButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card historial de alertas */}
        <View style={[styles_profile.profileCardT, styles.secondaryCard]}>
          <View style={styles_profile.profileContent}>
            <Text style={styles_profile.profileTittle}>Historial de alertas</Text>
            <Text style={styles_profile.profileLabel}>Tipo de Alerta</Text>
            <Text style={styles_profile.profileValue}>Detección semáforo</Text>
            <Text style={styles_profile.profileLabel}>Fecha y hora</Text>
            <Text style={styles_profile.profileValue}>05-05-2026 12:38 horas</Text>
            <TouchableOpacity style={styles_profile.moreButton}>
              <Text style={styles_profile.moreButtonText}>
                Ver más
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Nav Bar */}
      <View style={[
        styles.bottomNav,
        { bottom: insets.bottom + 14 }
      ]}>

        {/* Botón inicio */}
        <TouchableOpacity style={[styles.navItem, styles.bottomHome2]}
          onPress={() => router.push('/home')}>
          <Ionicons name="home-outline" size={22} color="#555" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>

        {/* Botón ajustes */}
        <TouchableOpacity style={[styles.navItem, styles.bottomHome2]}
          onPress={() => router.push('/settings')}>
          <Ionicons name="options-outline" size={26} color="#555" />
          <Text style={styles.navText}>Ajustes</Text>
        </TouchableOpacity>

        {/* Botón perfil */}
        <TouchableOpacity style={[styles.navItem, styles_profile.bottomProfile]}
          onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={26} color="#9B00FF" />
          <Text style={styles.navTextActive}>Perfil</Text>
          <View style={styles.activeLine} />
        </TouchableOpacity>
      </View>
    </LinearGradient >
  );
}