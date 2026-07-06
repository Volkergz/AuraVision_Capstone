// Importación de hook para manejar estados
import { useState } from 'react';

// Importación para fondo degradado
import { LinearGradient } from 'expo-linear-gradient';

// Importación de estilos
import { styles } from '../constants/styles';

// Importación de componentes para interfaz
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Importación navegación entre pantallas
import { router } from 'expo-router';

// Importación para iconos
import { Ionicons } from '@expo/vector-icons';

export default function ChangeProfile() {
    const insets = useSafeAreaInsets();

    // Estado para guardar el nuevo nombre
    const [names, setNames] = useState('');

    // Estado para guardar el nuevo apellido
    const [surnames, setSurnames] = useState('');

    // Estado para mostrar mensajes de error
    const [error, setError] = useState('');

    // Función para validar y actualizar contraseña
    const handleChangeProfile = () => {
        setError('');

        console.log('Datos actualizados correctamente.');
        router.replace('/profile');
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
                                secureTextEntry />
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
                                secureTextEntry />
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
                                activeOpacity={0.8}>
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