import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function QroStoreLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#0d8a4e',
        tabBarInactiveTintColor: '#8a9a8e',
        headerStyle: {
          backgroundColor: '#f5faf7',
        },
        headerTitleStyle: {
          color: '#0a3a1a',
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(13, 138, 78, 0.06)',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Evita la navegación por defecto
            router.replace('/(tabs)'); // Navega al inicio principal
          },
        }}
      />
      <Tabs.Screen
        name="tienda"
        options={{
          title: 'QroStore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Evita la navegación por defecto
            router.replace('/(tabs)/perfil'); // Navega al perfil principal
          },
        }}
      />
    </Tabs>
  );
}