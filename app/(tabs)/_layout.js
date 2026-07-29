// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            index: 'home',
            catalogo: 'grid',
            test: 'help-circle',
            perfil: 'user',
          };
          return <Feather name={icons[route.name]} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0d8a4e',
        tabBarInactiveTintColor: '#6a8a6e',
        tabBarStyle: {
          height: 65,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.04)',
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 2,
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="catalogo" options={{ title: 'Catálogo' }} />
      <Tabs.Screen name="test" options={{ title: 'Test' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}