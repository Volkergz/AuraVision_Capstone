// Importación de hook para manejar estados
import { useState, useEffect } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de componentes para interfaz
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Importación de iconos
import { Ionicons } from '@expo/vector-icons';

// Importación para navegación entre pantallas
import { router } from 'expo-router';

// Importación de estilos
import { styles } from '../constants/styles';
import { styles_settings } from '../constants/styles_settings';

// Importación de SecureStore para guardar tokens de sesión
import * as SecureStore from 'expo-secure-store';

// URL del backend
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function Settings() {

  //Interfaz
  const insets = useSafeAreaInsets();

  // Modal volumen
  const [showVolumeModal, setShowVolumeModal] = useState(false);

  // Valor guardado volumen
  const [volume, setVolume] = useState(40);

  // Valor temporal volumen
  const [tempVolume, setTempVolume] = useState(40);

  // Valor requerido por el backend para guardar la configuración
  const [autoConnection, setAutoConnection] = useState(false);

  // Estados para cargar y mostrar errores
  const [error, setError] = useState('');

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

  // Carga la configuración actual del usuario
  useEffect(() => {
    const loadConfiguration = async () => {
      const token = await SecureStore.getItemAsync('access_token');

      if (!token) {
        setError('No se encontró el token de sesión.');
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/v1/configuracion/mi`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setError('No fue posible cargar la configuración.');
          return;
        }

        setVolume(data.volumen ?? 40);
        setTempVolume(data.volumen ?? 40);
        setAutoConnection(data.auto_conexion ?? false);
      } catch {
        setError('No fue posible conectar con el servidor.');
      } finally {
      }
    };

    loadConfiguration();
  }, []);

  // Guarda la configuración en el backend
  const saveConfiguration = async (
    newVolume: number,
    newAutoConnection: boolean,
  ) => {
    const token = await SecureStore.getItemAsync('access_token');

    if (!token) {
      setError('No se encontró el token de sesión.');
      return false;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/configuracion/mi`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            volumen: newVolume,
            auto_conexion: newAutoConnection,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.detail || 'No fue posible guardar la configuración.');
        return false;
      }

      setVolume(data.volumen ?? newVolume);
      setTempVolume(data.volumen ?? newVolume);
      setAutoConnection(data.auto_conexion ?? newAutoConnection);

      return true;
    } catch {
      setError('No fue posible conectar con el servidor.');
      return false;
    }
  };

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

        {error !== '' && (
          <Text style={styles.errorText}>{error}</Text>
        )}

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

        {/* Modal nivel de volumen  */}
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
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Bajar volumen"
                  onPress={() => setTempVolume(tempVolume > 0 ? tempVolume - 1 : 0)}>
                  <Text
                    style={[styles_settings.settingButtons, styles_settings.settingCounterButton]}
                    accessible={false}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text
                  style={[styles_settings.settingButtons, styles_settings.settingCounterNumber]}
                  accessibilityLabel={`Volumen actual ${tempVolume}`}>
                  {tempVolume}
                </Text>

                {/* Botón subir volumen */}
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Subir volumen"
                  onPress={() => setTempVolume(tempVolume < 100 ? tempVolume + 1 : 100)}>
                  <Text
                    style={[styles_settings.settingButtons, styles_settings.settingCounterButton]}
                    accessible={false}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Botón aceptar */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={async () => {
                  const saved = await saveConfiguration(tempVolume, autoConnection);

                  if (saved) {
                    setShowVolumeModal(false);
                  }
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

                  <TouchableOpacity
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Eliminar"
                    onPress={() => handleDeleteDevice(device)}>
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color="red"
                      accessible={false}
                      importantForAccessibility="no"
                    />
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