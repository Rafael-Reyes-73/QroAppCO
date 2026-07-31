import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="ubicacion" options={{ headerShown: true, title: 'Ubicación' }} />
        <Stack.Screen name="notificaciones" options={{ headerShown: true, title: 'Notificaciones' }} />
        <Stack.Screen name="producto/[id]" options={{ headerShown: true, title: 'Detalle del Producto' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}