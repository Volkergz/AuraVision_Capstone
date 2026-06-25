// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';

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

  // Modal añadir dispositivo
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);

  // Modal dispositivos encontrados
  const [showDevicesModal, setShowDevicesModal] = useState(false);

  // Modal confirmar dispositivo
  const [showConfirmDeviceModal, setShowConfirmDeviceModal] = useState(false);

  // Dispositivo seleccionado
  const [selectedDevice, setSelectedDevice] = useState('');

  // Modal historial de dispositivos
  const [showDeviceHistoryModal, setShowDeviceHistoryModal] = useState(false);

  // Modal confirmar eliminación
  const [showDeleteDeviceModal, setShowDeleteDeviceModal] = useState(false);

  // Dispositivo seleccionado para eliminar
  const [deviceToDelete, setDeviceToDelete] = useState('');

  const handleSearchDevice = () => {
    setShowAddDeviceModal(false);
    setShowDevicesModal(true);
  };

  const handleSelectDevice = (deviceName: string) => {
    setSelectedDevice(deviceName);
    setShowDevicesModal(false);
    setShowConfirmDeviceModal(true);
  };

  const devices = [
    'AuraVisión-d1',
    'AuraVisión-d2',
    'AuraVisión-d3',
    'AuraVisión-AV2',
  ];

  const handleDeleteDevice = (deviceName: string) => {
    setDeviceToDelete(deviceName);
    setShowDeviceHistoryModal(false);
    setShowDeleteDeviceModal(true);
  };

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
              <Ionicons name="close" size={20} color="#000" />
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
                <Text style={[styles.settingButtons, styles.settingCounterButton]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.settingButtons, styles.settingCounterNumber]}>
                {tempVolume}
              </Text>

              {/*Botón subir volumen (limite 100) */}
              <TouchableOpacity
                onPress={() => setTempVolume(tempVolume < 100 ? tempVolume + 1 : 100)}>
                <Text style={[styles.settingButtons, styles.settingCounterButton]}>+</Text>
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
              <Ionicons name="close" size={20} color="#000" />
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
                <Text style={[styles.settingButtons, styles.settingCounterButton]}>-</Text>
              </TouchableOpacity>

              <Text style={[styles.settingButtons, styles.settingCounterNumber]}>
                {tempVibration}
              </Text>

              {/*  Botón subir vibración */}
              <TouchableOpacity
                onPress={() => setTempVibration(tempVibration < 100 ? tempVibration + 1 : 100)}>
                <Text style={[styles.settingButtons, styles.settingCounterButton]}>+</Text>
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
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => setShowAddDeviceModal(true)}>
          <Text style={styles.settingButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>

      {/* Card eliminar dispositivo */}
      <View style={[styles.settingCardSmall, styles.secondaryCard]}>
        <Text style={styles.settingTitle}>Eliminar dispositivo</Text>

        {/* Botón ver dispositivos */}
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => setShowDeviceHistoryModal(true)}>
          <Text style={styles.settingButtonText}>Ver dispositivos</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAddDeviceModal}
        transparent
        animationType="fade">

        <View style={styles.modalOverlay}>
          <View style={styles.addDeviceModalCard}>

            <TouchableOpacity
              style={styles.addDeviceBack}
              onPress={() => setShowAddDeviceModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#24123A" />
            </TouchableOpacity>

            <Text style={styles.addDeviceTitle}>Añadir dispositivo</Text>

            <Text style={styles.addDeviceInfo}>
              Recuerda estar conectado a internet.
            </Text>

            <TouchableOpacity
              style={styles.settingButton}
              onPress={handleSearchDevice}>
              <Text style={styles.settingButtonText}>Buscar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* Modal dispositivos encontrados */}
      <Modal
        visible={showDevicesModal}
        transparent
        animationType="fade">

        <View style={styles.modalOverlay}>
          <View style={styles.devicesModalCard}>

            <TouchableOpacity
              style={styles.devicesBack}
              onPress={() => setShowDevicesModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#24123A" />
            </TouchableOpacity>

            <Text style={styles.devicesTitle}>
              Dispositivos{'\n'}encontrados
            </Text>

            <View style={styles.devicesList}>
              <TouchableOpacity
                style={styles.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-d1')}>
                <Text style={styles.deviceText}>AuraVisión-d1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-d2')}>
                <Text style={styles.deviceText}>AuraVisión-d2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-d3')}>
                <Text style={styles.deviceText}>AuraVisión-d3</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-AV2')}>
                <Text style={styles.deviceText}>AuraVisión-AV2</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* Modal confirmar agregar dispositivo */}
      <Modal
        visible={showConfirmDeviceModal}
        transparent
        animationType="fade">

        <View style={styles.modalOverlay}>
          <View style={styles.confirmDeviceModalCard}>

            <Text style={styles.confirmDeviceText}>
              ¿Quieres agregar{'\n'}este dispositivo?
            </Text>

            <View style={styles.confirmDeviceButtonRow}>

              <TouchableOpacity
                style={styles.cancelDeviceButton}
                onPress={() => {
                  setShowConfirmDeviceModal(false);
                  setShowDevicesModal(true);
                }}>
                <Text style={styles.cancelDeviceButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptDeviceButton}
                onPress={() => {
                  console.log('Dispositivo agregado:', selectedDevice);
                  setShowConfirmDeviceModal(false);
                }}>
                <Text style={styles.acceptDeviceButtonText}>Aceptar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      {/* Modal historial de dispositivos */}
      <Modal
        visible={showDeviceHistoryModal}
        transparent
        animationType="fade">

        <View style={styles.modalOverlay}>
          <View style={styles.deviceHistoryModalCard}>

            <TouchableOpacity
              style={styles.deviceHistoryBack}
              onPress={() => setShowDeviceHistoryModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#24123A" />
            </TouchableOpacity>

            <Text style={styles.deviceHistoryTitle}>
              Historial de{'\n'}dispositivos
            </Text>

            <View style={styles.deviceHistoryList}>
              {devices.map((device) => (
                <View key={device} style={styles.deviceHistoryItem}>
                  <Text style={styles.deviceHistoryText}>{device}</Text>

                  <TouchableOpacity onPress={() => handleDeleteDevice(device)}>
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

          </View>
        </View>
      </Modal>

      {/* Modal confirmar eliminar dispositivo */}
      <Modal
        visible={showDeleteDeviceModal}
        transparent
        animationType="fade">

        <View style={styles.modalOverlay}>
          <View style={styles.confirmDeviceModalCard}>

            <Text style={styles.confirmDeviceText}>
              ¿Estas seguro de eliminar{'\n'}este dispositivo?
            </Text>

            <View style={styles.confirmDeviceButtonRow}>

              <TouchableOpacity
                style={styles.cancelDeviceButton}
                onPress={() => {
                  setShowDeleteDeviceModal(false);
                  setShowDeviceHistoryModal(true);
                }}>
                <Text style={styles.cancelDeviceButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.acceptDeviceButton}
                onPress={() => {
                  console.log('Dispositivo eliminado:', deviceToDelete);
                  setShowDeleteDeviceModal(false);
                }}>
                <Text style={styles.acceptDeviceButtonText}>Aceptar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

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