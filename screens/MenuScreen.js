import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Importar todas las pantallas
import QroStoreHomeScreen from './QroStoreHomeScreen';
import QroPlayHomeScreen from './QroPlayHomeScreen';
import QroPlayScreen from './QroPlayScreen';
import PlayerScreen from './PlayerScreen';
import AddCardScreen from './AddCardScreen';
import CartScreen from './CartScreen';
import ConfirmationScreen from './ConfirmationScreen';
import ProductDetailScreen from './ProductDetailScreen';
import AddressScreen from './AddressScreen';
import ProfileScreen from './ProfileScreen';

export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');

  switch (screen) {
    case 'qroStoreHome':
      return <QroStoreHomeScreen />;
    case 'qroPlayHome':
      return <QroPlayHomeScreen />;
    case 'qroPlay':
      return <QroPlayScreen />;
    case 'player':
      return <PlayerScreen />;
    case 'addCard':
      return <AddCardScreen />;
    case 'cart':
      return <CartScreen />;
    case 'confirmation':
      return <ConfirmationScreen />;
    case 'productDetail':
      return <ProductDetailScreen />;
    case 'address':
      return <AddressScreen />;
    case 'profile':
      return <ProfileScreen />;

    case 'menu':
    default:
      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
          <ScrollView style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>QroStore</Text>
              <Text style={styles.subtitle}>Menú de Navegación</Text>
              <Text style={styles.count}>10 Pantallas</Text>
            </View>

            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setScreen('qroStoreHome')}>
                <Text style={styles.buttonText}>Inicio QroStore</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('qroPlayHome')}>
                <Text style={styles.buttonText}>QroPlay - Inicio</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('qroPlay')}>
                <Text style={styles.buttonText}>QroPlay - Catálogo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('player')}>
                <Text style={styles.buttonText}>QroPlay - Reproductor</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('addCard')}>
                <Text style={styles.buttonText}>Agregar Tarjeta</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('cart')}>
                <Text style={styles.buttonText}>Carrito de Compras</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('confirmation')}>
                <Text style={styles.buttonText}>Confirmación de Compra</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('productDetail')}>
                <Text style={styles.buttonText}>Detalle de Producto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setScreen('address')}>
                <Text style={styles.buttonText}>Dirección de Envío</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.lastButton]} onPress={() => setScreen('profile')}>
                <Text style={styles.buttonText}>Perfil de Usuario</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>QroStore v1.0 - Todas las pantallas</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f9f7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0b2a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#4a7a5e',
    marginTop: 4,
  },
  count: {
    fontSize: 13,
    color: '#8ab89a',
    marginTop: 4,
  },
  menuContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: '#0b3a1e',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastButton: {
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#8ab89a',
  },
});