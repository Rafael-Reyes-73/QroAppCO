import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function AddressScreen() {
  const [selectedAddress, setSelectedAddress] = useState('Hogar');
  const [showForm, setShowForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggleForm = () => {
    setShowForm(!showForm);
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
          <Text style={styles.headerTitle}>Dirección de Envío</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.subtitle}>Seleccionar dirección</Text>
          <Text style={styles.addressCount}>2 Registradas</Text>

          {/* Address Cards */}
          <TouchableOpacity 
            style={[
              styles.addressCard, 
              selectedAddress === 'Hogar' && styles.addressCardActive
            ]} 
            onPress={() => setSelectedAddress('Hogar')}
            activeOpacity={0.7}
          >
            <View style={styles.addressHeader}>
              <View style={styles.addressNameContainer}>
                <Feather name="home" size={16} color="#0d8a4e" />
                <Text style={styles.addressName}>Hogar</Text>
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Predeterminada</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>Av. Constituyentes 124, Int. 4B</Text>
            <Text style={styles.addressCity}>Centro, Querétaro, QRO. 76000</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.addressCard, 
              selectedAddress === 'Trabajo' && styles.addressCardActive
            ]} 
            onPress={() => setSelectedAddress('Trabajo')}
            activeOpacity={0.7}
          >
            <View style={styles.addressHeader}>
              <View style={styles.addressNameContainer}>
                <Feather name="briefcase" size={16} color="#0a3a1a" />
                <Text style={styles.addressName}>Trabajo</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>Parque Industrial Bernardo Quintana</Text>
            <Text style={styles.addressCity}>El Marqués, Querétaro, QRO. 76246</Text>
          </TouchableOpacity>

          {/* New Address Button */}
          <TouchableOpacity 
            style={styles.newAddressBtn} 
            onPress={handleToggleForm}
            activeOpacity={0.7}
          >
            <Feather name="plus" size={18} color="#0d8a4e" />
            <Text style={styles.newAddressText}>Registrar nueva dirección</Text>
          </TouchableOpacity>

          {/* Form */}
          {showForm && (
            <Animated.View style={[styles.formContainer, { transform: [{ scale: scaleAnim }] }]}>
              <View style={styles.formHeader}>
                <Feather name="map-pin" size={20} color="#0d8a4e" />
                <Text style={styles.formTitle}>Detalles de Entrega</Text>
              </View>
              <Text style={styles.formSubtitle}>Completa los campos requeridos (*)</Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Calle *</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Calle" 
                    placeholderTextColor="#8a9a8e" 
                  />
                  <Text style={styles.charCount}>0/100</Text>
                </View>
                <Text style={styles.helperText}>Ej. Calle de la Amargura</Text>
              </View>

              <View style={styles.rowDuo}>
                <View style={[styles.formGroup, styles.flex1]}>
                  <Text style={styles.label}>Núm. Ext.</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Ej. 12" 
                      placeholderTextColor="#8a9a8e" 
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={[styles.formGroup, styles.flex1]}>
                  <Text style={styles.label}>Núm. Int.</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      style={styles.input} 
                      placeholder="Ej. Depto 4" 
                      placeholderTextColor="#8a9a8e" 
                    />
                  </View>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Municipio *</Text>
                <TouchableOpacity style={styles.selectWrapper}>
                  <Text style={styles.selectPlaceholder}>Selecciona municipio</Text>
                  <Feather name="chevron-down" size={18} color="#4a6a4e" />
                </TouchableOpacity>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Código Postal *</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Ej. 76000" 
                    placeholderTextColor="#8a9a8e" 
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.saveBtn} activeOpacity={0.8}>
                <Text style={styles.saveBtnText}>Guardar y Continuar</Text>
                <Feather name="arrow-right" size={18} color="#ffffff" />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Secure Payment */}
          <View style={styles.secureContainer}>
            <Feather name="shield" size={16} color="#0d8a4e" />
            <Text style={styles.secureText}>
              <Text style={styles.secureBold}>PAGO SEGURO</Text> POR QROSTORE
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
    paddingTop: 16,
    paddingBottom: 100,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  addressCount: {
    fontSize: 14,
    color: '#4a6a4e',
    marginBottom: 16,
    fontWeight: '400',
  },
  addressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  addressCardActive: {
    borderColor: '#0d8a4e',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  addressNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  defaultBadge: {
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  defaultBadgeText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#0d8a4e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  editText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0d8a4e',
  },
  addressText: {
    fontSize: 14,
    color: '#0a3a1a',
    marginBottom: 2,
    fontWeight: '400',
  },
  addressCity: {
    fontSize: 13,
    color: '#4a6a4e',
    fontWeight: '400',
  },
  newAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(13, 138, 78, 0.12)',
    borderStyle: 'dashed',
    marginBottom: 16,
    gap: 8,
  },
  newAddressText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0d8a4e',
    letterSpacing: 0.2,
  },
  formContainer: {
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
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  formSubtitle: {
    fontSize: 13,
    color: '#4a6a4e',
    marginBottom: 16,
    fontWeight: '400',
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: '#0a3a1a',
    paddingVertical: 10,
  },
  charCount: {
    fontSize: 11,
    color: '#8a9a8e',
    fontWeight: '400',
  },
  helperText: {
    fontSize: 12,
    color: '#8a9a8e',
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '400',
  },
  rowDuo: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  selectWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectPlaceholder: {
    fontSize: 15,
    color: '#8a9a8e',
    fontWeight: '400',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d8a4e',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    marginTop: 4,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  secureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    marginTop: 4,
    gap: 8,
  },
  secureText: {
    fontSize: 12,
    color: '#0d8a4e',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  secureBold: {
    fontWeight: '700',
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