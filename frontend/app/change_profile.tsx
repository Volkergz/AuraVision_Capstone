// Importación de hook para manejar estados
import { useEffect, useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Importación navegación entre pantallas
import { router } from 'expo-router';

// Importación para iconos
import { Ionicons } from '@expo/vector-icons';

// Importación de SecureStore para guardar tokens de sesión
import * as SecureStore from 'expo-secure-store';

// URL del backend
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function ChangeProfile() {
    const insets = useSafeAreaInsets();

    // Estados para comparar los datos originales con los modificados
    const [originalNames, setOriginalNames] = useState('');
    const [originalSurnames, setOriginalSurnames] = useState('');
    const [loading, setLoading] = useState(true);

    // Estado para guardar el nuevo nombre
    const [names, setNames] = useState('');

    // Estado para guardar el nuevo apellido
    const [surnames, setSurnames] = useState('');

    // Estado para mostrar mensajes de error
    const [error, setError] = useState('');

    // Carga los datos actuales del usuario autenticado
    useEffect(() => {
        const loadCurrentProfile = async () => {
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

                if (!response.ok) {
                    setError('No fue posible cargar los datos actuales.');
                    return;
                }

                const profileData = data.user || data;
                const currentNames = profileData.nombre || profileData.nombres || '';
                const currentSurnames = profileData.apellido || profileData.apellidos || '';

                setNames(currentNames);
                setSurnames(currentSurnames);

                setOriginalNames(currentNames);
                setOriginalSurnames(currentSurnames);
            } catch {
                setError('No fue posible cargar los datos actuales.');
            } finally {
                setLoading(false);
            }
        };

        loadCurrentProfile();
    }, []);

    // Función para actualizar los datos del perfil
    // Actualiza solamente los datos que fueron modificados
    const handleChangeProfile = () => {
        setError('');

        const updatedData: { nombre?: string; apellido?: string } = {};

        if (names.trim() !== originalNames) {
            updatedData.nombre = names.trim();
        }

        if (surnames.trim() !== originalSurnames) {
            updatedData.apellido = surnames.trim();
        }

        if (Object.keys(updatedData).length === 0) {
            setError('No realizaste ningún cambio en el perfil.');
            return;
        }

        Alert.alert(
            'Confirmar modificación',
            '¿Estás seguro de guardar los cambios realizados en tu perfil?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        const token = await SecureStore.getItemAsync('access_token');

                        if (!token) {
                            setError('No se encontró el token de sesión.');
                            return;
                        }

                        try {
                            const response = await fetch(
                                `${BACKEND_URL}/api/v1/auth/me`,
                                {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify(updatedData),
                                },
                            );

                            const data = await response.json().catch(() => ({}));

                            if (!response.ok) {
                                setError(data.detail || 'No fue posible actualizar el perfil.');
                                return;
                            }

                            router.replace('/profile');
                        } catch {
                            setError('No fue posible conectar con el servidor.');
                        }
                    },
                },
            ],
        );
    };
    return (
        // Fondo degrade 
        <LinearGradient
            colors={['#DEAFFF', '#773DC7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>

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

                <View style={styles.cardWrapper}>
                    <View style={styles.card}>

                        {/* Icono volver */}
                        <TouchableOpacity
                            style={styles.backButton}
                            accessible={true}
                            accessibilityRole="button"
                            accessibilityLabel="Volver"
                            onPress={() => router.push('/profile')}>
                            <Ionicons
                                name="arrow-back"
                                size={28}
                                color="#2A134A"
                                accessible={false}
                                importantForAccessibility="no"
                            />
                        </TouchableOpacity>

                        {/* Título principal */}
                        <Text style={[styles.subtittle, styles.subtittleForgot]}>
                            Modificar perfil
                        </Text>

                        {/* Campo nombres */}
                        <Text style={styles.label}>
                            Nombres
                        </Text>
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
                                placeholder="Ingresa tus nuevos nombres"
                                placeholderTextColor="#666"
                                editable={!loading}
                            />
                        </LinearGradient>

                        {/* Campo apellidos */}
                        <Text style={styles.label}>
                            Apellidos
                        </Text>
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
                                placeholder="Ingresa tus nuevos apellidos"
                                placeholderTextColor="#666"
                                editable={!loading}
                            />
                        </LinearGradient>

                        {/* Mensaje de error campos vacíos */}
                        {error !== '' && (
                            <Text style={styles.errorText}>{error}</Text>
                        )}

                        {/* Botón aceptar */}
                        <View style={styles.buttonForgot}>
                            <View style={[styles.leftEdge, styles.edge]} />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleChangeProfile}
                                activeOpacity={0.8}
                                disabled={loading}>

                                <Text style={styles.buttonText}>
                                    Aceptar
                                </Text>
                            </TouchableOpacity>
                            <View style={[styles.rightEdge, styles.edge]} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}