// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { Image, Modal, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Importación de iconos
import { Ionicons } from '@expo/vector-icons';

// Importación para navegación entre pantallas
import { router } from 'expo-router';

// Importación de estilos
import { styles } from '../constants/styles';
import { styles_settings } from '../constants/styles_settings';

export default function Settings() {

  //Interfaz
  const insets = useSafeAreaInsets();

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
        showsVerticalScrollIndicator={false}>

        {/* Card nivel de volumen */}
        <View style={[styles_settings.settingCard, styles.secondaryCard]}>
          <Text style={styles_settings.settingTitle}>Nivel de volumen</Text>
          <Text style={styles_settings.settingNumber}>{volume}</Text>

          {/* Botón modificar */}
          <TouchableOpacity
            style={styles_settings.settingButton}
            onPress={() => {
              setTempVolume(volume);
              setShowVolumeModal(true);
            }}>
            <Text style={styles_settings.settingButtonText}>Modificar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal nivel de volumen (se almacena temporalmente) */}
        <Modal
          visible={showVolumeModal}
          transparent
          animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles_settings.settingModalCard}>

              {/* Botón cerrar modal */}
              <TouchableOpacity
                style={styles.closeModal}
                onPress={() => setShowVolumeModal(false)}>
                <Ionicons name="close" size={20} color="#000" />
              </TouchableOpacity>

              {/* Título modal */}
              <Text style={styles_settings.settingModalTitle}>
                Nivel de volumen
              </Text>

              {/* Configuración de volumen */}
              <View style={styles_settings.settingCounterRow}>

                {/* Botón bajar volumen */}
                <TouchableOpacity
                  onPress={() => setTempVolume(tempVolume > 0 ? tempVolume - 1 : 0)}>
                  <Text style={[styles_settings.settingButtons, styles_settings.settingCounterButton]}>-</Text>
                </TouchableOpacity>
                <Text style={[styles_settings.settingButtons, styles_settings.settingCounterNumber]}>
                  {tempVolume}
                </Text>

                {/*Botón subir volumen (limite 100) */}
                <TouchableOpacity
                  onPress={() => setTempVolume(tempVolume < 100 ? tempVolume + 1 : 100)}>
                  <Text style={[styles_settings.settingButtons, styles_settings.settingCounterButton]}>+</Text>
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
        <View style={[styles_settings.settingCard, styles.secondaryCard]}>
          <Text style={styles_settings.settingTitle}>Nivel de vibración</Text>
          <Text style={styles_settings.settingNumber}>{vibration}</Text>

          {/* Botón modificar */}
          <TouchableOpacity style={styles_settings.settingButton} onPress={() => {
            setTempVibration(vibration);
            setShowVibrationModal(true);
          }}>
            <Text style={styles_settings.settingButtonText}>Modificar</Text>
          </TouchableOpacity>
        </View>

        {/* Modal nivel de vibración(se almacena temporalmente) */}
        <Modal
          visible={showVibrationModal}
          transparent
          animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles_settings.settingModalCard}>

              {/* Botón cerrar modal */}
              <TouchableOpacity
                style={styles.closeModal}
                onPress={() => setShowVibrationModal(false)}>
                <Ionicons name="close" size={20} color="#000" />
              </TouchableOpacity>

              {/* Título modal */}
              <Text style={styles_settings.settingModalTitle}>
                Nivel de vibración
              </Text>

              {/* Configuración de vibración */}
              <View style={styles_settings.settingCounterRow}>

                {/*  Botón bajar vibración */}
                <TouchableOpacity
                  onPress={() => setTempVibration(tempVibration > 0 ? tempVibration - 1 : 0)}>
                  <Text style={[styles_settings.settingButtons, styles_settings.settingCounterButton]}>-</Text>
                </TouchableOpacity>

                <Text style={[styles_settings.settingButtons, styles_settings.settingCounterNumber]}>
                  {tempVibration}
                </Text>

                {/*  Botón subir vibración */}
                <TouchableOpacity
                  onPress={() => setTempVibration(tempVibration < 100 ? tempVibration + 1 : 100)}>
                  <Text style={[styles_settings.settingButtons, styles_settings.settingCounterButton]}>+</Text>
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
        <View style={[styles_settings.settingCardSmall, styles.secondaryCard]}>
          <Text style={styles_settings.settingTitle}>Nuevo dispositivo</Text>

          {/* Botón añadir */}
          <TouchableOpacity
            style={styles_settings.settingButton}
            onPress={() => setShowAddDeviceModal(true)}>
            <Text style={styles_settings.settingButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>

        {/* Card eliminar dispositivo */}
        <View style={[styles_settings.settingCardSmall, styles.secondaryCard]}>
          <Text style={styles_settings.settingTitle}>Eliminar dispositivo</Text>

          {/* Botón ver dispositivos */}
          <TouchableOpacity
            style={styles_settings.settingButton}
            onPress={() => setShowDeviceHistoryModal(true)}>
            <Text style={styles_settings.settingButtonText}>Ver dispositivos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showAddDeviceModal}
        transparent
        animationType="fade">

        <View style={styles.modalOverlay}>
          <View style={styles_settings.addDeviceModalCard}>

            <TouchableOpacity
              style={styles_settings.addDeviceBack}
              onPress={() => setShowAddDeviceModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#24123A" />
            </TouchableOpacity>

            <Text style={styles_settings.addDeviceTitle}>Añadir dispositivo</Text>

            <Text style={styles_settings.addDeviceInfo}>
              Recuerda estar conectado a internet.
            </Text>

            <TouchableOpacity
              style={styles_settings.settingButton}
              onPress={handleSearchDevice}>
              <Text style={styles_settings.settingButtonText}>Buscar</Text>
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
          <View style={styles_settings.devicesModalCard}>

            <TouchableOpacity
              style={styles_settings.devicesBack}
              onPress={() => setShowDevicesModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#24123A" />
            </TouchableOpacity>

            <Text style={styles_settings.devicesTitle}>
              Dispositivos{'\n'}encontrados
            </Text>

            <View style={styles_settings.devicesList}>
              <TouchableOpacity
                style={styles_settings.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-d1')}>
                <Text style={styles_settings.deviceText}>AuraVisión-d1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles_settings.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-d2')}>
                <Text style={styles_settings.deviceText}>AuraVisión-d2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles_settings.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-d3')}>
                <Text style={styles_settings.deviceText}>AuraVisión-d3</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles_settings.deviceItem}
                onPress={() => handleSelectDevice('AuraVisión-AV2')}>
                <Text style={styles_settings.deviceText}>AuraVisión-AV2</Text>
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
          <View style={styles_settings.confirmDeviceModalCard}>

            <Text style={styles_settings.confirmDeviceText}>
              ¿Quieres agregar{'\n'}este dispositivo?
            </Text>

            <View style={styles_settings.confirmDeviceButtonRow}>

              <TouchableOpacity
                style={styles_settings.cancelDeviceButton}
                onPress={() => {
                  setShowConfirmDeviceModal(false);
                  setShowDevicesModal(true);
                }}>
                <Text style={styles_settings.cancelDeviceButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles_settings.acceptDeviceButton}
                onPress={() => {
                  console.log('Dispositivo agregado:', selectedDevice);
                  setShowConfirmDeviceModal(false);
                }}>
                <Text style={styles_settings.acceptDeviceButtonText}>Aceptar</Text>
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
          <View style={styles_settings.deviceHistoryModalCard}>

            <TouchableOpacity
              style={styles_settings.deviceHistoryBack}
              onPress={() => setShowDeviceHistoryModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#24123A" />
            </TouchableOpacity>

            <Text style={styles_settings.deviceHistoryTitle}>
              Historial de{'\n'}dispositivos
            </Text>

            <View style={styles_settings.deviceHistoryList}>
              {devices.map((device) => (
                <View key={device} style={styles_settings.deviceHistoryItem}>
                  <Text style={styles_settings.deviceHistoryText}>{device}</Text>

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
          <View style={styles_settings.confirmDeviceModalCard}>

            <Text style={styles_settings.confirmDeviceText}>
              ¿Estas seguro de eliminar{'\n'}este dispositivo?
            </Text>

            <View style={styles_settings.confirmDeviceButtonRow}>

              <TouchableOpacity
                style={styles_settings.cancelDeviceButton}
                onPress={() => {
                  setShowDeleteDeviceModal(false);
                  setShowDeviceHistoryModal(true);
                }}>
                <Text style={styles_settings.cancelDeviceButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles_settings.acceptDeviceButton}
                onPress={() => {
                  console.log('Dispositivo eliminado:', deviceToDelete);
                  setShowDeleteDeviceModal(false);
                }}>
                <Text style={styles_settings.acceptDeviceButtonText}>Aceptar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      {/* Nav Bar */}
      <View style={[
        styles.bottomNav,
        { bottom: insets.bottom + 14 }
      ]}>

        {/* Botón inicio */}
        <TouchableOpacity
          style={[styles.navItem, styles.bottomHome2]}
          onPress={() => router.push('/home')}>
          <Ionicons name="home-outline" size={22} color="#555" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>

        {/* Botón ajustes */}
        <TouchableOpacity style={[styles.navItem, styles.bottomHome]}>
          <Ionicons name="options-outline" size={26} color="#9B00FF" />
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