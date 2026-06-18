// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { View, Text, Image, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';

//Importación de iconos
import { Ionicons } from '@expo/vector-icons';

// Importación de estilos
import { styles } from '../constants/styles';

//Importaciín navegación entre pantallas
import { router } from 'expo-router';

export default function Profile() {
  return (
    // Comportamiento de la interfaz en dispositivos
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">

        <LinearGradient
          colors={['#DEAFFF', '#773DC7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.homeContainer}>

          {/* Logo pequeño en derecha superior */}
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoSmall} />

          {/* Card datos personales */}
          <View style={[styles.profileCard, styles.secondaryCard]}>
            <View style={styles.homeTextBox}>
              <Text style={styles.subtittle}>Datos personales</Text>

              <Text style={styles.profileLabel}>Nombres</Text>
              <View style={styles.profileInput}>
                <Text style={styles.profileInputText}>Juan Antonio</Text>
              </View>
              <Text style={styles.profileLabel}>Apellidos</Text>
              <View style={styles.profileInput}>
                <Text  style={styles.profileInputText}>Pérez Castillo
                </Text>
              </View>
              <Text style={styles.profileLabel}>Email</Text>
              <View style={styles.profileInput}>
                <Text  style={styles.profileInputText}>jperez@gmail.com</Text>
              </View>
            </View>
          </View>

          {/* Card historial de alertas */}
          <View style={[styles.profileCardT, styles.secondaryCard]}>
            <View style={styles.homeTextBox}>
              <Text style={styles.homeTitle}>Historial de alertas</Text>
              <Text style={styles.homeValue}></Text>
            </View>
          </View>

          {/* Nav Bar */}
          <View style={styles.bottomNav}>

            {/* Botón inicio */}
            <TouchableOpacity style={[styles.navItem, styles.bottomHome]}
              onPress={() => router.push('/home')}>
              <Ionicons name="home-outline" size={22} color="#555" />
              <Text style={styles.navTextActive}>Inicio</Text>
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
              <Ionicons name="person-circle-outline" size={24} color="#9B00FF" />
              <Text style={styles.navText}>Perfil</Text>
              <View style={styles.activeLine} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}