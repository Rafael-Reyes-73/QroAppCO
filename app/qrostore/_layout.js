import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function QroStoreLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f7faf7' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tienda" options={{ headerShown: false }} />
        <Stack.Screen name="carrito" options={{ headerShown: false }} />
        <Stack.Screen name="favoritos" options={{ headerShown: false }} />
        <Stack.Screen name="perfil" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
