import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function AddCardScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '').slice(0, 16);
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      setExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setExpiry(cleaned);
    }
  };

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

  const displayCardNumber = cardNumber || '•••• •••• •••• ••••';
  const displayCardHolder = cardHolder.toUpperCase() || 'NOMBRE DEL TITULAR';
  const displayExpiry = expiry || 'MM/AA';
  const displayCvv = cvv || '•••';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
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
          <Text style={styles.headerTitle}>Agregar Tarjeta</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Tarjeta de crédito */}
          <Animated.View style={[styles.creditCard, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.cardTop}>
              <View style={styles.cardChip}>
                <View style={styles.chipLine} />
                <View style={styles.chipLine} />
                <View style={styles.chipLine} />
              </View>
              <View style={styles.cardBrand}>
                <View style={styles.brandCircle} />
                <View style={[styles.brandCircle, styles.brandCircleRight]} />
              </View>
            </View>
            
            <Text style={styles.cardNumber}>{displayCardNumber}</Text>
            
            <View style={styles.cardFooter}>
              <View style={styles.cardFooterItem}>
                <Text style={styles.cardLabel}>Titular</Text>
                <Text style={styles.cardValue} numberOfLines={1}>
                  {displayCardHolder}
                </Text>
              </View>
              <View style={styles.cardFooterItem}>
                <Text style={styles.cardLabel}>Expira</Text>
                <Text style={styles.cardValue}>{displayExpiry}</Text>
              </View>
              <View style={styles.cardFooterItem}>
                <Text style={styles.cardLabel}>CVV</Text>
                <Text style={styles.cardValue}>{displayCvv}</Text>
              </View>
            </View>
          </Animated.View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Número de tarjeta</Text>
              <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                <Feather name="credit-card" size={18} color="#6a8a6e" />
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={formatCardNumber}
                  placeholder="0000 0000 0000 0000"
                  placeholderTextColor="#8a9a8e"
                  keyboardType="numeric"
                  maxLength={19}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre del titular</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={18} color="#6a8a6e" />
                <TextInput
                  style={styles.input}
                  value={cardHolder}
                  onChangeText={setCardHolder}
                  placeholder="Juan Pérez"
                  placeholderTextColor="#8a9a8e"
                  autoCapitalize="characters"
                />
              </View>
            </View>

            <View style={styles.rowDuo}>
              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>Fecha (MM/AA)</Text>
                <View style={styles.inputWrapper}>
                  <Feather name="calendar" size={18} color="#6a8a6e" />
                  <TextInput
                    style={styles.input}
                    value={expiry}
                    onChangeText={formatExpiry}
                    placeholder="12/28"
                    placeholderTextColor="#8a9a8e"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>
              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.inputWrapper}>
                  <Feather name="lock" size={18} color="#6a8a6e" />
                  <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="•••"
                    placeholderTextColor="#8a9a8e"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Seguridad */}
          <View style={styles.secureBadge}>
            <View style={styles.secureIconContainer}>
              <Feather name="shield" size={18} color="#0d8a4e" />
            </View>
            <Text style={styles.secureText}>
              <Text style={styles.secureBold}>Pago Seguro</Text>
              {'  '}Tus datos están encriptados
            </Text>
          </View>

          {/* Botón Registrar */}
          <TouchableOpacity 
            style={styles.registerBtn}
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <Text style={styles.registerBtnText}>Registrar Tarjeta</Text>
            <Feather name="arrow-right" size={18} color="#ffffff" />
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.navItem,
                tab.id === 'catalog' && styles.navItemActive
              ]}
              activeOpacity={0.7}
            >
              <Feather 
                name={tab.icon} 
                size={20} 
                color={tab.id === 'catalog' ? '#0d8a4e' : '#6a8a6e'} 
              />
              <Text style={[
                styles.navText,
                tab.id === 'catalog' && styles.navTextActive
              ]}>
                {tab.label}
              </Text>
              {tab.id === 'catalog' && (
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
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  // Tarjeta de crédito
  creditCard: {
    backgroundColor: '#0a3a1a',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardChip: {
    width: 44,
    height: 30,
    backgroundColor: '#c6e9b0',
    borderRadius: 6,
    padding: 4,
    justifyContent: 'space-around',
  },
  chipLine: {
    height: 2,
    backgroundColor: '#8ab37a',
    borderRadius: 1,
    marginHorizontal: 3,
  },
  cardBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
  },
  brandCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    position: 'absolute',
    right: 4,
  },
  brandCircleRight: {
    right: 0,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 3,
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  cardFooterItem: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 3,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 13,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  // Formulario
  formContainer: {
    marginBottom: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4a6a4e',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  inputWrapperFocused: {
    borderColor: '#0d8a4e',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  rowDuo: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  // Seguridad
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    marginVertical: 20,
    gap: 10,
  },
  secureIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secureText: {
    fontSize: 13,
    color: '#4a6a4e',
    fontWeight: '400',
  },
  secureBold: {
    fontWeight: '600',
    color: '#0a3a1a',
  },
  // Botón
  registerBtn: {
    backgroundColor: '#0d8a4e',
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    marginBottom: 10,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  registerBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  // Bottom Navigation
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