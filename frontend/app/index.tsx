import { Redirect } from 'expo-router';

export default function Index() {
    // Al abrir la app redirige automáticamente a login
    return <Redirect href="/login" />;
}