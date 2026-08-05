import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import QroStoreBottomNav from './QroStoreBottomNav';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

const productosIniciales = [
  {
    id: 1,
    nombre: 'Fertilizante Orgánico',
    categoria: 'Fertilizantes',
    precio: 189,
    cantidad: 1,
    imagen:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    nombre: 'Tierra Preparada',
    categoria: 'Sustratos',
    precio: 135,
    cantidad: 2,
    imagen:
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    nombre: 'Playera QroHuerto',
    categoria: 'Ropa',
    precio: 249,
    cantidad: 1,
    imagen:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  },
];

export default function CarritoScreen({ onClose, onNavigate }) {
  const [productos, setProductos] = useState(productosIniciales);

  const subtotal = productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  const envio = 79;
  const total = subtotal + envio;

  const aumentar = (id) => {
    setProductos(
      productos.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuir = (id) => {
    setProductos(
      productos.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const eliminar = (id) => {
    setProductos(productos.filter((item) => item.id !== id));
  };

  const finalizarCompra = () => {
    Alert.alert('Compra simulada', 'Tu pedido fue preparado correctamente.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => onNavigate('qrostore')}>
              <Feather name="arrow-left" size={24} color="#154f1f" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Carrito</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={21} color="#154f1f" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Mi carrito</Text>
          <Text style={styles.subtitle}>
            Revisa tus productos antes de confirmar la compra.
          </Text>

          {productos.map((producto) => (
            <View key={producto.id} style={styles.cartCard}>
              <ImageBackground
                source={{ uri: producto.imagen }}
                style={styles.productImage}
                imageStyle={styles.productImageRadius}
              />

              <View style={styles.productInfo}>
                <Text style={styles.category}>{producto.categoria}</Text>
                <Text style={styles.productName}>{producto.nombre}</Text>
                <Text style={styles.price}>${producto.precio} MXN</Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => disminuir(producto.id)}
                  >
                    <Feather name="minus" size={16} color="#154f1f" />
                  </TouchableOpacity>

                  <Text style={styles.quantity}>{producto.cantidad}</Text>

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => aumentar(producto.id)}
                  >
                    <Feather name="plus" size={16} color="#154f1f" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminar(producto.id)}
              >
                <Feather name="trash-2" size={19} color="#c71920" />
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumen de compra</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal} MXN</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Envío</Text>
              <Text style={styles.summaryValue}>${envio} MXN</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total} MXN</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.checkoutButton}
            onPress={finalizarCompra}
          >
            <Text style={styles.checkoutText}>Finalizar compra</Text>
            <Feather name="arrow-right" size={20} color="#ffffff" />
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom nav persistente compartido */}
        <QroStoreBottomNav active="carrito" onNavigate={onNavigate} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7faf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7faf7',
  },
  header: {
    height: 66,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#edf0ed',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#154f1f',
    fontSize: 25,
    fontWeight: '900',
    marginLeft: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 118,
  },
  title: {
    color: '#154f1f',
    fontSize: 31,
    fontWeight: '900',
  },
  subtitle: {
    color: '#5a6259',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 6,
    marginBottom: 24,
  },
  cartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: 96,
    height: 110,
  },
  productImageRadius: {
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    paddingHorizontal: 14,
  },
  category: {
    color: '#5a7c58',
    fontSize: 12,
    fontWeight: '900',
  },
  productName: {
    color: '#154f1f',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 5,
  },
  price: {
    color: '#6d542f',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 6,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#c9efc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    marginHorizontal: 14,
    color: '#154f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#f5eeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    marginTop: 14,
    marginBottom: 18,
  },
  summaryTitle: {
    color: '#154f1f',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#5a6259',
    fontSize: 15,
    fontWeight: '700',
  },
  summaryValue: {
    color: '#222822',
    fontSize: 15,
    fontWeight: '900',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e7e1',
    marginVertical: 8,
  },
  totalLabel: {
    color: '#154f1f',
    fontSize: 18,
    fontWeight: '900',
  },
  totalValue: {
    color: '#154f1f',
    fontSize: 18,
    fontWeight: '900',
  },
  checkoutButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#105219',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    marginRight: 8,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#edf0ed',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#3d463c',
    fontWeight: '700',
    marginTop: 3,
  },
});