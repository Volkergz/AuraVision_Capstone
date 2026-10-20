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

export default function ChangePassProfile() {
    const insets = useSafeAreaInsets();

    // Estado para guardar la nueva contraseña
    const [password, setPassword] = useState('');

    // Estado para guardar la repetición de la contraseña 
    const [repeatPassword, setRepeatPassword] = useState('');

    // Estado para mostrar mensajes de error
    const [error, setError] = useState('');

    // Función para validar y actualizar contraseña
    const handleChangePassword = () => {
        setError('');

        // Validación para que los campos no esten vacios
        if (!password.trim() || !repeatPassword.trim()) {
            setError('Completa todos los campos.');
            return;
        }

        // Validar longitud de contraseña (8  caracteres)
        if (password.length !== 8 || repeatPassword.length !== 8) {
            setError('Las contraseñas deben tener 8 caracteres.');
            return;
        }

        // Validar que la contraseña no tenga espacios
        if (password.includes(' ') || repeatPassword.includes(' ')) {
            setError('La contraseña no debe tener espacios.');
            return;
        }

        // Validar que tenga al menos una letra (evitar que sean solo números)
        if (!/[a-zA-Z]/.test(password)) {
            setError('La contraseña debe tener al menos una letra.');
            return;
        }

        // Validar que tenga al menos un número
        if (!/\d/.test(password)) {
            setError('La contraseña debe tener al menos un número.');
            return;
        }

        // Validar que las contraseñas coincidan
        if (password !== repeatPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        console.log('Contraseña actualizada correctamente.');
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
                            Cambiar contraseña
                        </Text>

                        {/* Campo  contraseña actual */}
                        <Text style={styles.label}>
                            Contraseña actual
                        </Text>
                        <LinearGradient
                            colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                            locations={[0, 0.15, 0.5, 0.85, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.inputGradient}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry />
                        </LinearGradient>
                        {/* Campo nueva contraseña */}
                        <Text style={styles.label}>
                            Nueva contraseña
                        </Text>
                        <LinearGradient
                            colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                            locations={[0, 0.15, 0.5, 0.85, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.inputGradient}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry />
                        </LinearGradient>

                        {/* Campo repetir contraseña */}
                        <Text style={styles.label}>
                            Repetir contraseña
                        </Text>

                        <LinearGradient
                            colors={['#B4AEAE', '#EBEBEB', '#E6E6E6', '#EBEBEB', '#B4AEAE']}
                            locations={[0, 0.15, 0.5, 0.85, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.inputGradient}>
                            <TextInput
                                style={styles.input}
                                value={repeatPassword}
                                onChangeText={setRepeatPassword}
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
                                onPress={handleChangePassword}
                                activeOpacity={0.8}>
                                <Text style={styles.buttonText}>
                                    Aceptar
                                </Text>
                            </TouchableOpacity>
                            <View style={[styles.rightEdge, styles.edge]} />
                        </View>
                        {/* Enlace registro */}
                        <View style={styles.registerContainer}>
                            <Text style={styles.textBelow}>¿Olvidaste tu contraseña?</Text>
                            <TouchableOpacity onPress={() => router.push('/forgot_password')}>
                                <Text style={styles.textBelow}>Haz clic aquí.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}