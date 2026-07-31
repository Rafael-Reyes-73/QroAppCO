import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function MetodoPagoScreen({ onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const paymentMethods = [
    { id: 1, icon: 'credit-card-outline', title: 'Visa •••• 4242', subtitle: 'Expira 12/26' },
    { id: 2, icon: 'cash', title: 'Mastercard •••• 8888', subtitle: 'Expira 09/25' },
    { id: 3, icon: 'bank-outline', title: 'Transferencia Bancaria', subtitle: 'Pago directo' },
  ];

  const handleSelect = (index) => {
    setSelectedMethod(index);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
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
      <StatusBar style="dark" backgroundColor="#f5faf7" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton}>
              <Feather name="arrow-left" size={22} color="#0a3a1a" />
            </TouchableOpacity>
            <View style={styles.headerLogoContainer}>
              <Image 
                source={logoImage}
                style={styles.headerLogo}
                resizeMode="cover"
              />
            </View>
          </View>

          <Text style={styles.headerTitle}>Método de Pago</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={20} color="#0a3a1a" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionLabel}>Métodos Guardados</Text>

          {paymentMethods.map((method, index) => (
            <Animated.View
              key={method.id}
              style={[
                styles.paymentCardWrapper,
                {
                  transform: [{ 
                    scale: selectedMethod === index ? scaleAnim : 1 
                  }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.paymentCard,
                  selectedMethod === index && styles.paymentCardSelected,
                ]}
                onPress={() => handleSelect(index)}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.cardIconBox,
                  selectedMethod === index && styles.cardIconBoxSelected,
                ]}>
                  <MaterialCommunityIcons 
                    name={method.icon} 
                    size={22} 
                    color={selectedMethod === index ? '#ffffff' : '#0a3a1a'} 
                  />
                </View>

                <View style={styles.paymentInfo}>
                  <Text style={[
                    styles.paymentTitle,
                    selectedMethod === index && styles.paymentTitleSelected,
                  ]}>
                    {method.title}
                  </Text>
                  <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
                </View>

                <View style={[
                  styles.radioOuter,
                  selectedMethod === index && styles.radioOuterSelected,
                ]}>
                  {selectedMethod === index && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}

          {/* Agregar nuevo método */}
          <TouchableOpacity style={styles.addBox} activeOpacity={0.7}>
            <View style={styles.addIconContainer}>
              <Feather name="plus" size={20} color="#0d8a4e" />
            </View>
            <Text style={styles.addText}>Agregar nuevo método</Text>
          </TouchableOpacity>

          {/* Seguridad */}
          <View style={styles.securityBox}>
            <View style={styles.securityIconContainer}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#0d8a4e" />
            </View>
            <View style={styles.securityTextBox}>
              <Text style={styles.securityTitle}>Seguridad Garantizada</Text>
              <Text style={styles.securityText}>
                Tus transacciones están cifradas y protegidas. QroStore nunca almacena el código CVV de tus tarjetas.
              </Text>
            </View>
          </View>
        </View>

        {/* Botón Confirmar */}
        <TouchableOpacity 
          style={styles.confirmButton}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmText}>Confirmar y Continuar</Text>
          <Feather name="arrow-right" size={18} color="#ffffff" />
        </TouchableOpacity>
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
    gap: 8,
  },
  backButton: {
    padding: 4,
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
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#4a6a4e',
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  paymentCardWrapper: {
    marginBottom: 14,
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  paymentCardSelected: {
    borderColor: '#0d8a4e',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
  },
  cardIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
  },
  cardIconBoxSelected: {
    backgroundColor: '#0d8a4e',
    borderColor: '#0d8a4e',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 15,
    color: '#0a3a1a',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  paymentTitleSelected: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
  paymentSubtitle: {
    fontSize: 12,
    color: '#6a7a6e',
    fontWeight: '400',
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#c8d4c8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#0d8a4e',
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#0d8a4e',
  },
  addBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#c8d4c8',
    marginTop: 6,
    marginBottom: 20,
    gap: 10,
  },
  addIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#0a3a1a',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  securityBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    borderRadius: 14,
    padding: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  securityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  securityTextBox: {
    flex: 1,
  },
  securityTitle: {
    color: '#0a3a1a',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  securityText: {
    color: '#4a6a4e',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    marginTop: 4,
  },
  confirmButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 85,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0d8a4e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
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