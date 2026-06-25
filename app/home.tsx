// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { View, Text, Image, TouchableOpacity, ScrollView, useWindowDimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Importación de iconos
import { Ionicons } from '@expo/vector-icons';

// Importación de estilos
import { styles } from '../constants/styles';

//Importaciín navegación entre pantallas
import { router } from 'expo-router';

export default function Home() {

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 720;
  const isNarrowScreen = width < 380;

  const iconSize = isNarrowScreen ? 46 : 58;
  const cardHeight = isSmallScreen ? 125 : 150;
  const cardMargin = isSmallScreen ? 18 : 30;

  return (
    // Fondo degrade 
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
          {
            top: insets.top + 5,
          },
        ]}
      />
      {/* Contenido adaptable */}
      <ScrollView
        style={styles.homeScroll}
        contentContainerStyle={[
          styles.homeScrollContent,
          {
            paddingTop: insets.top + 70,
            paddingBottom: insets.bottom + 95,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Card estado de conexión */}
        <View style={[styles.homeCard, styles.secondaryCard]}>
          <Ionicons name="git-network-outline" size={58} color="#9B00FF" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Dispositivo conectado</Text>
            <Text style={styles.homeValue}>Sin conexión</Text>
          </View>
        </View>

        {/* Card porcentaje de batería */}
        <View style={[styles.homeCard, styles.secondaryCard]}>
          <Ionicons name="battery-half-outline" size={58} color="#9B00FF" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Porcentaje de batería</Text>
            <Text style={styles.homeValue}>-</Text>
          </View>
        </View>

        {/* Card tiempo restante de funcionamiento */}
        <View style={[styles.homeCard, styles.secondaryCard]}>
          <Ionicons name="time-outline" size={58} color="#9B00FF" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Tiempo restante</Text>
            <Text style={styles.homeValue}>-</Text>
          </View>
        </View>

        {/* Card última alerta detectada */}
        <View style={[styles.homeCard, styles.secondaryCard]}>
          <Ionicons name="notifications-outline" size={52} color="#9B00FF" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Última alerta detectada</Text>
            <Text style={styles.homeValue}>-</Text>
          </View>
        </View>
      </ScrollView>

      {/* Nav Bar */}
      <View style={[
        styles.bottomNav,
        { bottom: insets.bottom + 18 }
      ]}>

        {/* Botón inicio */}
        <TouchableOpacity style={[styles.navItem, styles.bottomHome]}>
          <Ionicons name="home-outline" size={22} color="#9B00FF" />
          <Text style={styles.navTextActive}>Inicio</Text>
          <View style={styles.activeLine} />
        </TouchableOpacity>

        {/* Botón ajustes */}
        <TouchableOpacity style={styles.navItem}
          onPress={() => router.push('/settings')}>
          <Ionicons name="options-outline" size={22} color="#555" />
          <Text style={styles.navText}>Ajustes</Text>
        </TouchableOpacity>

        {/* Botón perfil */}
        <TouchableOpacity style={styles.navItem}
          onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={24} color="#555" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}