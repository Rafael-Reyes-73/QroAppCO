import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function ConfirmationScreen() {
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogoContainer}>
              <Image 
                source={logoImage}
                style={styles.headerLogo}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.headerTitle}>Confirmación</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Confirmation Header */}
          <View style={styles.confirmationHeader}>
            <View style={styles.successIcon}>
              <Feather name="check" size={32} color="#ffffff" />
            </View>
            <Text style={styles.confirmationTitle}>¡Gracias por tu compra!</Text>
            <Text style={styles.confirmationText}>
              Tu pedido ha sido procesado con éxito y pronto estará en camino hacia tu jardín.
            </Text>
            <View style={styles.orderBadge}>
              <Feather name="hash" size={14} color="#ffffff" />
              <Text style={styles.orderBadgeText}>Pedido: #QS-2024-0042</Text>
            </View>
          </View>

          {/* Información de Envío */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="truck" size={16} color="#0d8a4e" />
              <Text style={styles.sectionTitle}>Información de Envío</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha estimada</Text>
              <Text style={styles.infoValue}>15 - 18 de Mayo, 2024</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Dirección de entrega</Text>
              <Text style={styles.infoValue}>Av. de los Constituyentes 1024, Col. Centro, Querétaro, CP 76000</Text>
            </View>
          </View>

          {/* Resumen de Productos */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="package" size={16} color="#0d8a4e" />
              <Text style={styles.sectionTitle}>Resumen de Productos</Text>
            </View>
            <View style={styles.productItem}>
              <View>
                <Text style={styles.productName}>Fertilizante Orgánico Pro</Text>
                <Text style={styles.productDetail}>Cantidad: 1 unidad (5kg)</Text>
              </View>
              <Text style={styles.productPrice}>$54.50</Text>
            </View>
            <View style={styles.productDivider} />
            <View style={styles.productItem}>
              <View>
                <Text style={styles.productName}>Semillas de Tomate Cherry</Text>
                <Text style={styles.productDetail}>Cantidad: 2 sobres (50u)</Text>
              </View>
              <Text style={styles.productPrice}>$22.40</Text>
            </View>
          </View>

          {/* Detalle del Pago */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="credit-card" size={16} color="#0d8a4e" />
              <Text style={styles.sectionTitle}>Detalle del Pago</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Subtotal</Text>
              <Text style={styles.paymentValue}>$76.90</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Envío</Text>
              <Text style={[styles.paymentValue, styles.freeText]}>¡Gratis!</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Impuestos (IVA)</Text>
              <Text style={styles.paymentValue}>$0.00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Pagado</Text>
              <Text style={styles.totalValue}>$76.90</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.trackBtn} activeOpacity={0.8}>
              <Feather name="map-pin" size={18} color="#ffffff" />
              <Text style={styles.trackBtnText}>Rastrear Pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeBtn} activeOpacity={0.8}>
              <Feather name="home" size={18} color="#0d8a4e" />
              <Text style={styles.homeBtnText}>Volver al Inicio</Text>
            </TouchableOpacity>
          </View>

          {/* Invoice Note */}
          <View style={styles.invoiceNote}>
            <Feather name="mail" size={16} color="#0d8a4e" />
            <Text style={styles.invoiceNoteText}>
              Hemos enviado una copia de tu factura a tu correo electrónico registrado.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.navItem,
                selectedTab === tab.id && styles.navItemActive
              ]}
              onPress={() => setSelectedTab(tab.id)}
              activeOpacity={0.7}
            >
              <Feather 
                name={tab.icon} 
                size={20} 
                color={selectedTab === tab.id ? '#0d8a4e' : '#6a8a6e'} 
              />
              <Text style={[
                styles.navText,
                selectedTab === tab.id && styles.navTextActive
              ]}>
                {tab.label}
              </Text>
              {selectedTab === tab.id && (
                <View style={styles.navIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5faf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5faf7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
  },
  headerLogo: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  confirmationHeader: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  confirmationText: {
    fontSize: 14,
    color: '#4a6a4e',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
    fontWeight: '400',
  },
  orderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d8a4e',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  orderBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 138, 78, 0.06)',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoRowLast: {
    marginBottom: 0,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4a6a4e',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    color: '#0a3a1a',
    fontWeight: '500',
    lineHeight: 20,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  productDetail: {
    fontSize: 12,
    color: '#4a6a4e',
    fontWeight: '400',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d8a4e',
  },
  productDivider: {
    height: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    marginVertical: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#4a6a4e',
    fontWeight: '400',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0a3a1a',
  },
  freeText: {
    color: '#0d8a4e',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 6,
    borderTopWidth: 2,
    borderTopColor: 'rgba(13, 138, 78, 0.08)',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a3a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d8a4e',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  trackBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d8a4e',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  trackBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  homeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#0d8a4e',
    gap: 6,
  },
  homeBtnText: {
    color: '#0d8a4e',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  invoiceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    gap: 10,
    marginBottom: 8,
  },
  invoiceNoteText: {
    flex: 1,
    fontSize: 13,
    color: '#4a6a4e',
    lineHeight: 18,
    fontWeight: '400',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 65,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
  },
  navText: {
    fontSize: 10,
    color: '#6a8a6e',
    fontWeight: '500',
    marginTop: 2,
  },
  navTextActive: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
  navIndicator: {
    position: 'absolute',
    top: -1,
    width: 16,
    height: 2.5,
    backgroundColor: '#0d8a4e',
    borderRadius: 2,
  },
});