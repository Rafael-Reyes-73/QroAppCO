import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,  // ← ESTO ES LO QUE FALTABA
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function UbicacionProveedoresScreen({ onClose }) {
  const [selectedChip, setSelectedChip] = useState('Querétaro');
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const chips = ['Querétaro', 'Corregidora', 'El Marqués', 'San Juan del Río'];

  const handleChipPress = (chip) => {
    setSelectedChip(chip);
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
      <StatusBar style="dark" backgroundColor="#f5faf7" />

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
            <Text style={styles.headerTitle}>Ubicación</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={20} color="#0a3a1a" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#0a3a1a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Feather name="search" size={20} color="#4a6a4e" />
            <TextInput
              placeholder="Buscar proveedores orgánicos..."
              placeholderTextColor="#8a9a8e"
              style={styles.searchInput}
              returnKeyType="search"
            />
            <TouchableOpacity>
              <Feather name="sliders" size={20} color="#0d8a4e" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
            {chips.map((chip) => (
              <Animated.View
                key={chip}
                style={{ transform: [{ scale: selectedChip === chip ? scaleAnim : 1 }] }}
              >
                <TouchableOpacity
                  style={[
                    styles.chip,
                    selectedChip === chip && styles.chipActive,
                  ]}
                  onPress={() => handleChipPress(chip)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.chipText,
                    selectedChip === chip && styles.chipTextActive,
                  ]}>
                    {chip}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Map Area */}
        <View style={styles.mapArea}>
          <View style={styles.phone}>
            <View style={styles.phoneTop}>
              <View style={styles.phoneNotch} />
            </View>

            <View style={styles.mockMap}>
              <MapMarker top={55} left={40} large />
              <MapMarker top={145} left={120} />
              <MapMarker top={190} left={65} />
              <MapMarker top={220} left={160} large />
              <MapMarker top={265} left={225} large />
              <MapMarker top={310} left={130} />
              <MapMarker top={365} left={210} />
              
              <View style={styles.mapLabel}>
                <View style={styles.mapLabelDot} />
                <Text style={styles.mapLabelText}>6 proveedores cerca</Text>
              </View>
            </View>

            <View style={styles.phoneBottom}>
              <TouchableOpacity style={styles.phoneIcon}>
                <Feather name="book-open" size={16} color="#0d8a4e" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.phoneIcon, styles.phoneIconActive]}>
                <Feather name="map-pin" size={16} color="#0d8a4e" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.phoneIcon}>
                <Feather name="user" size={16} color="#4a6a4e" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.listButton} activeOpacity={0.8}>
            <Feather name="list" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function MapMarker({ top, left, large }) {
  return (
    <View
      style={[
        styles.markerHalo,
        { top, left },
        large && styles.markerHaloLarge,
      ]}
    >
      <View style={[styles.marker, large && styles.markerLarge]}>
        <Feather name="map-pin" size={large ? 18 : 14} color="#ffffff" />
      </View>
    </View>
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
    fontSize: 22,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#d71920',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  notificationText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#f5faf7',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0a3a1a',
    paddingVertical: 12,
    fontWeight: '400',
  },
  chipsRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingHorizontal: 2,
  },
  chip: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  chipActive: {
    backgroundColor: '#0d8a4e',
    borderColor: '#0d8a4e',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4a6a4e',
    letterSpacing: 0.2,
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#e8ede8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  phone: {
    width: 220,
    height: 420,
    borderRadius: 24,
    borderWidth: 6,
    borderColor: '#1a2a1a',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  phoneTop: {
    height: 36,
    backgroundColor: '#f5faf7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneNotch: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#1a2a1a',
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#eeecd9',
    position: 'relative',
  },
  mapLabel: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  mapLabelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d71920',
  },
  mapLabelText: {
    fontSize: 9,
    fontWeight: '500',
    color: '#0a3a1a',
  },
  phoneBottom: {
    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
  },
  phoneIcon: {
    padding: 4,
    opacity: 0.5,
  },
  phoneIconActive: {
    opacity: 1,
  },
  markerHalo: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(13, 138, 78, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHaloLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(13, 138, 78, 0.12)',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerLarge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0d8a4e',
  },
  listButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
});