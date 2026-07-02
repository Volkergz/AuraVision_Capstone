// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Importación de iconos
import { Ionicons } from '@expo/vector-icons';

// Importación de estilos
import { styles } from '../constants/styles';
import { styles_home } from '../constants/styles_home';

//Importaciín navegación entre pantallas
import { router } from 'expo-router';

export default function Home() {
  const insets = useSafeAreaInsets();

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
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 70,
            paddingBottom: insets.bottom + 95,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        {/* Card estado de conexión */}
        <View style={[styles_home.homeCard, styles.secondaryCard]}>
          <Ionicons name="git-network-outline" size={58} color="#9B00FF" accessible={false}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Dispositivo</Text>
            <Text style={styles.homeValue}>Sin conexión</Text>
          </View>
        </View>

        {/* Card porcentaje de batería */}
        <View style={[styles_home.homeCard, styles.secondaryCard]}>
          <Ionicons name="battery-half-outline" size={58} color="#9B00FF" accessible={false}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Porcentaje de batería</Text>
            <Text style={styles.homeValue}>50%</Text>
          </View>
        </View>

        {/* Card tiempo restante de funcionamiento */}
        <View style={[styles_home.homeCard, styles.secondaryCard]}>
          <Ionicons name="time-outline" size={58} color="#9B00FF" accessible={false}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Tiempo restante</Text>
            <Text style={styles.homeValue}>4 horas</Text>
          </View>
        </View>

        {/* Card última alerta detectada */}
        <View style={[styles_home.homeCard, styles.secondaryCard]}>
          <Ionicons name="notifications-outline" size={52} color="#9B00FF" accessible={false}
            accessibilityElementsHidden={true}
            importantForAccessibility="no-hide-descendants" />
          <View style={styles.homeTextBox}>
            <Text style={styles.homeTitle}>Última alerta detectada</Text>
            <Text style={styles.homeValue}>21-06-2026 18:40</Text>
          </View>
        </View>
      </ScrollView>

      {/* Nav Bar */}
      <View style={[
        styles.bottomNav,
        { bottom: insets.bottom + 14 }
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
          <Ionicons name="options-outline" size={26} color="#555" />
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