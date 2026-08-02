import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import InicioScreen from './screens/InicioScreen';
import CrearCultivoScreen from './screens/CrearCultivoScreen';
import MetodoPagoScreen from './screens/MetodoPagoScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import MisHuertosScreen from './screens/MisHuertosScreen';
import ActividadesScreen from './screens/ActividadesScreen';
import ConoceTuCultivoDetalleScreen from './screens/ConoceTuCultivoDetalleScreen';

import ResultadosTestScreen from './screens/ResultadosTestScreen';
import SeguimientoCultivoDetalleScreen from './screens/SeguimientoCultivoDetalleScreen';
import TestEspacioDisponibleScreen from './screens/TestEspacioDisponibleScreen';
import NotificacionesScreen from './screens/NotificacionesScreen';
import UbicacionProveedoresScreen from './screens/UbicacionProveedoresScreen';
import TestMunicipioScreen from './screens/TestMunicipioScreen';
import TestTemporadaScreen from './screens/TestTemporadaScreen';
import QroStoreScreen from './screens/QroStoreScreen';
import ProfileScreen from './screens/ProfileScreen';
import CarritoScreen from './screens/CarritoScreen';

const pantallas = {
  inicio: InicioScreen,
  crear: CrearCultivoScreen,
  pago: MetodoPagoScreen,
  favoritos: FavoritosScreen,
  huertos: MisHuertosScreen,
  actividades: ActividadesScreen,
  cultivoDetalle: ConoceTuCultivoDetalleScreen,
  resultadosTest: ResultadosTestScreen,
  seguimientoCultivo: SeguimientoCultivoDetalleScreen,
  testEspacio: TestEspacioDisponibleScreen,
  notificaciones: NotificacionesScreen,
  ubicacionProveedores: UbicacionProveedoresScreen,
  testMunicipio: TestMunicipioScreen,
  testTemporada: TestTemporadaScreen,
  qrostore: QroStoreScreen,
  perfil: ProfileScreen,
  carrito: CarritoScreen,
};

const opciones = [
  {
    id: 'inicio',
    titulo: 'Inicio',
    descripcion: 'Pantalla principal de SemillasApp',
    icono: 'home',
    imagen:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'crear',
    titulo: 'Crear Cultivo',
    descripcion: 'Formulario para seleccionar semillas',
    icono: 'plus-circle',
    imagen:
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pago',
    titulo: 'Método de Pago',
    descripcion: 'Selección de tarjeta o método guardado',
    icono: 'credit-card',
    imagen:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'favoritos',
    titulo: 'Favoritos',
    descripcion: 'Semillas y cultivos guardados',
    icono: 'heart',
    imagen:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'huertos',
    titulo: 'Mis Huertos',
    descripcion: 'Panel de control de cultivos',
    icono: 'grid',
    imagen:
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'actividades',
    titulo: 'Actividades',
    descripcion: 'Lista de tareas pendientes del huerto',
    icono: 'check-square',
    imagen:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'cultivoDetalle',
    titulo: 'Detalle de Cultivo',
    descripcion: 'Información completa del Tomate Cherry',
    icono: 'book-open',
    imagen:
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'resultadosTest',
    titulo: 'Resultados del Test',
    descripcion: 'Recomendaciones ideales según el test',
    icono: 'award',
    imagen:
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'seguimientoCultivo',
    titulo: 'Seguimiento de Cultivo',
    descripcion: 'Detalle del avance de Tomate Roma',
    icono: 'activity',
    imagen:
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'testEspacio',
    titulo: 'Test - Espacio',
    descripcion: 'Selección del espacio disponible',
    icono: 'layers',
    imagen:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'notificaciones',
    titulo: 'Notificaciones',
    descripcion: 'Avisos y recordatorios del huerto',
    icono: 'bell',
    imagen:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ubicacionProveedores',
    titulo: 'Ubicación',
    descripcion: 'Vista de proveedores orgánicos',
    icono: 'map-pin',
    imagen:
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'testMunicipio',
    titulo: 'Test - Municipio',
    descripcion: 'Selección del municipio actual',
    icono: 'map',
    imagen:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'testTemporada',
    titulo: 'Test - Temporada',
    descripcion: 'Época del año para sembrar',
    icono: 'sun',
    imagen:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'qrostore',
    titulo: 'QroStore',
    descripcion: 'Tienda de productos para huerto',
    icono: 'shopping-bag',
    imagen:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'perfil',
    titulo: 'Perfil',
    descripcion: 'Información del usuario y configuración',
    icono: 'user',
    imagen:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'carrito',
    titulo: 'Carrito',
    descripcion: 'Productos agregados al carrito',
    icono: 'shopping-cart',
    imagen:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',
  },
];

export default function App() {
  const [pantallaActiva, setPantallaActiva] = useState(null);

  if (pantallaActiva) {
    const Pantalla = pantallas[pantallaActiva];

    return (
      <Pantalla
        onClose={() => setPantallaActiva(null)}
        onNavigate={(screenName) => setPantallaActiva(screenName)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>QroHuerto</Text>
            <Text style={styles.title}>Menú de Vistas</Text>
          </View>

          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="sprout" size={30} color="#ffffff" />
          </View>
        </View>

        <Text style={styles.subtitle}>
          Selecciona una vista y toca Ver para entrar. Cada pantalla tiene una X
          para regresar al menú.
        </Text>

        {opciones.map((item) => (
          <View key={item.id} style={styles.menuCard}>
            <ImageBackground
              source={{ uri: item.imagen }}
              style={styles.cardImage}
              imageStyle={styles.cardImageRadius}
            >
              <View style={styles.imageOverlay} />

              <View style={styles.cardIcon}>
                <Feather name={item.icono} size={23} color="#154f1f" />
              </View>
            </ImageBackground>

            <View style={styles.cardBody}>
              <View style={styles.cardTextBox}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardDesc}>{item.descripcion}</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.viewButton}
                onPress={() => setPantallaActiva(item.id)}
              >
                <Text style={styles.viewButtonText}>Ver</Text>
                <Feather name="arrow-right" size={17} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  content: {
    padding: 22,
    paddingBottom: 35,
  },
  header: {
    marginTop: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 15,
    color: '#6a7768',
    fontWeight: '700',
  },
  title: {
    fontSize: 34,
    color: '#154f1f',
    fontWeight: '900',
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#154f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#596258',
    lineHeight: 23,
    marginBottom: 22,
    fontWeight: '500',
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  cardImage: {
    height: 138,
    justifyContent: 'flex-end',
  },
  cardImageRadius: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 50, 14, 0.25)',
  },
  cardIcon: {
    position: 'absolute',
    right: 18,
    bottom: -24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d1f0ca',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  cardBody: {
    padding: 20,
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextBox: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 23,
    color: '#154f1f',
    fontWeight: '900',
  },
  cardDesc: {
    marginTop: 4,
    fontSize: 14,
    color: '#5c665b',
    fontWeight: '500',
    lineHeight: 20,
  },
  viewButton: {
    height: 43,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: '#105219',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    marginRight: 7,
  },
});