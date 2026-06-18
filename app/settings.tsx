// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';

//Importación de iconos
import { Ionicons } from '@expo/vector-icons';

// Importación para navegación entre pantallas
import { router } from 'expo-router';

// Importación de estilos
import { styles } from '../constants/styles';

export default function Settings() {

  // Modal volumen
  const [showVolumeModal, setShowVolumeModal] = useState(false);

  // Valor guardado volumen
  const [volume, setVolume] = useState(40);

  // Valor temporal volumen
  const [tempVolume, setTempVolume] = useState(40);

  // Modal vibración
  const [showVibrationModal, setShowVibrationModal] = useState(false);

  // Valor guardado vibración
  const [vibration, setVibration] = useState(15);

  // Valor temporalvibración
  const [tempVibration, setTempVibration] = useState(15);

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

      {/* Card nivel de volumen */}
      <View style={[styles.settingCard, styles.secondaryCard]}>
        <Text style={styles.settingTitle}>Nivel de volumen</Text>
        <Text style={styles.settingNumber}>{volume}</Text>

        {/* Botón modificar */}
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => {
            setTempVolume(volume);
            setShowVolumeModal(true);
          }}>
          <Text style={styles.settingButtonText}>Modificar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal nivel de volumen (se almacena temporalmente) */}
      <Modal
        visible={showVolumeModal}
        transparent
        animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.settingModalCard}>

            {/* Botón cerrar modal */}
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setShowVolumeModal(false)}>
              <Text style={styles.closeModalText}>×</Text>
            </TouchableOpacity>

            {/* Título modal */}
            <Text style={styles.settingModalTitle}>
              Nivel de volumen
            </Text>

            {/* Configuración de volumen */}
            <View style={styles.settingCounterRow}>

              {/* Botón bajar volumen */}
              <TouchableOpacity
                onPress={() => setTempVolume(tempVolume > 0 ? tempVolume - 1 : 0)}>
                <Text style={[styles.settingButton, styles.settingCounterButton]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.settingButton, styles.settingCounterNumber]}>
                {tempVolume}
              </Text>

              {/*Botón subir volumen (limite 100) */}
              <TouchableOpacity
                onPress={() => setTempVolume(tempVolume < 100 ? tempVolume + 1 : 100)}>
                <Text style={[styles.settingButton, styles.settingCounterButton]}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Botón aceptar */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setVolume(tempVolume);
                setShowVolumeModal(false);
              }}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Card nivel de vibración */}
      <View style={[styles.settingCard, styles.secondaryCard]}>
        <Text style={styles.settingTitle}>Nivel de vibración</Text>
        <Text style={styles.settingNumber}>{vibration}</Text>

        {/* Botón modificar */}
        <TouchableOpacity style={styles.settingButton} onPress={() => {
          setTempVibration(vibration);
          setShowVibrationModal(true);
        }}>
          <Text style={styles.settingButtonText}>Modificar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal nivel de vibración(se almacena temporalmente) */}
      <Modal
        visible={showVibrationModal}
        transparent
        animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.settingModalCard}>

            {/* Botón cerrar modal */}
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => setShowVibrationModal(false)}>
              <Text style={styles.closeModalText}>×</Text>
            </TouchableOpacity>

            {/* Título modal */}
            <Text style={styles.settingModalTitle}>
              Nivel de vibración
            </Text>

            {/* Configuración de vibración */}
            <View style={styles.settingCounterRow}>

              {/*  Botón bajar vibración */}
              <TouchableOpacity
                onPress={() => setTempVibration(tempVibration > 0 ? tempVibration - 1 : 0)}>
                <Text style={[styles.settingButton, styles.settingCounterButton]}>-</Text>
              </TouchableOpacity>

              <Text style={[styles.settingButton, styles.settingCounterNumber]}>
                {tempVibration}
              </Text>

              {/*  Botón subir vibración */}
              <TouchableOpacity
                onPress={() => setTempVibration(tempVibration < 100 ? tempVibration + 1 : 100)}>
                <Text style={[styles.settingButton, styles.settingCounterButton]}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Botón aceptar */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setVibration(tempVibration);
                setShowVibrationModal(false);
              }}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Card agregar dispositivo */}
      <View style={[styles.settingCardSmall, styles.secondaryCard]}>
        <Text style={styles.settingTitle}>Nuevo dispositivo</Text>

        {/* Botón añadir */}
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      {/* Card eliminar dispositivo */}
      <View style={[styles.settingCardSmall, styles.secondaryCard]}>
        <Text style={styles.settingTitle}>Eliminar dispositivo</Text>

        {/* Botón ver dispositivos */}
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Ver dispositivos</Text>
        </TouchableOpacity>
      </View>

      {/* Nav Bar */}
      <View style={styles.bottomNav}>

        {/* Botón inicio */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/home')}>
          <Ionicons name="home-outline" size={22} color="#555" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>

        {/* Botón ajustes */}
        <TouchableOpacity style={[styles.navItem, styles.bottomHome]}>
          <Ionicons name="options-outline" size={22} color="#9B00FF" />
          <Text style={styles.navTextActive}>Ajustes</Text>
          <View style={styles.activeLine} />
        </TouchableOpacity>

        {/* Botón perfil */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={24} color="#555" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}