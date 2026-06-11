// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';
// Importación de componentes para interfaz
import { View, Text, Image, TouchableOpacity } from 'react-native';
//Importación de iconos
import { Ionicons } from '@expo/vector-icons';
// Importación de estilos
import { styles } from '../constants/styles';

export default function Home() {
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
        style={styles.logoSmall} />

      {/* Cards */}
      <View style={styles.homeCard}>
        <Ionicons name="git-network-outline" size={58} color="#9B00FF" />
        <View style={styles.homeTextBox}>
          <Text style={styles.homeTitle}>Dispositivo conectado</Text>
          <Text style={styles.homeValue}>Sin conexión</Text>
        </View>
      </View>

      <View style={styles.homeCard}>
        <Ionicons name="battery-half-outline" size={58} color="#9B00FF" />
        <View style={styles.homeTextBox}>
          <Text style={styles.homeTitle}>Porcentaje de batería</Text>
          <Text style={styles.homeValue}>-</Text>
        </View>
      </View>

      <View style={styles.homeCard}>
        <Ionicons name="time-outline" size={58} color="#9B00FF" />
        <View style={styles.homeTextBox}>
          <Text style={styles.homeTitle}>Tiempo restante</Text>
          <Text style={styles.homeValue}>-</Text>
        </View>
      </View>

      <View style={styles.homeCard}>
        <Ionicons name="notifications-outline" size={52} color="#9B00FF" />
        <View style={styles.homeTextBox}>
          <Text style={styles.homeTitle}>Última alerta detectada</Text>
          <Text style={styles.homeValue}>-</Text>
        </View>
      </View>

      {/* Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.bottomHome]}>
          <Ionicons name="home-outline" size={22} color="#9B00FF" />
          <Text style={styles.navTextActive}>Inicio</Text>
          <View style={styles.activeLine} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="options-outline" size={22} color="#555" />
          <Text style={styles.navText}>Ajustes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-circle-outline" size={24} color="#555" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}