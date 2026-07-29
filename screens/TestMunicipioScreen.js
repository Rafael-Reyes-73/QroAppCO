// screens/TestMunicipioScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function TestMunicipioScreen({ onClose, hideMenu = false }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const municipios = [
    { id: 1, icon: 'city-variant-outline', name: 'Querétaro' },
    { id: 2, icon: 'castle', name: 'Corregidora' },
    { id: 3, icon: 'tractor', name: 'El Marqués' },
    { id: 4, icon: 'pine-tree', name: 'Huimilpan' },
    { id: 5, icon: 'water-outline', name: 'San Juan del Río' },
    { id: 6, icon: 'flower-outline', name: 'Tequisquiapan' },
  ];

  const handleSelect = (id) => {
    setSelectedItem(id);
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
            <Text style={styles.headerTitle}>Test</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={20} color="#0a3a1a" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTop}>
              <View style={styles.progressLabel}>
                <Feather name="bar-chart-2" size={16} color="#0d8a4e" />
                <Text style={styles.progressText}>Progreso del Test</Text>
              </View>
              <Text style={styles.percentText}>33%</Text>
            </View>

            <View style={styles.progressBg}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>¿En qué municipio te encuentras?</Text>

          <Text style={styles.description}>
            Selecciona tu ubicación actual para personalizar tu experiencia de
            cultivo y recomendaciones botánicas.
          </Text>

          {/* Lista de municipios */}
          {municipios.map((item) => (
            <Animated.View
              key={item.id}
              style={[
                styles.itemWrapper,
                {
                  transform: [{ 
                    scale: selectedItem === item.id ? scaleAnim : 1 
                  }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItem === item.id && styles.itemSelected,
                ]}
                onPress={() => handleSelect(item.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.itemIcon,
                  selectedItem === item.id && styles.itemIconSelected,
                ]}>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={22} 
                    color={selectedItem === item.id ? '#ffffff' : '#0a3a1a'} 
                  />
                </View>

                <Text style={[
                  styles.itemText,
                  selectedItem === item.id && styles.itemTextSelected,
                ]}>
                  {item.name}
                </Text>

                {selectedItem === item.id && (
                  <View style={styles.checkBadge}>
                    <Feather name="check" size={14} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}

          {/* Imagen de fondo */}
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.fieldImage}
            imageStyle={styles.fieldImageRadius}
          >
            <View style={styles.imageOverlay}>
              <View style={styles.imageContent}>
                <Feather name="map-pin" size={24} color="#ffffff" />
                <Text style={styles.imageText}>Querétaro</Text>
              </View>
            </View>
          </ImageBackground>

          {/* Botón Siguiente */}
          <TouchableOpacity 
            style={[
              styles.nextButton,
              selectedItem !== null && styles.nextButtonActive,
            ]}
            activeOpacity={0.8}
            disabled={selectedItem === null}
          >
            <Text style={[
              styles.nextText,
              selectedItem !== null && styles.nextTextActive,
            ]}>
              Siguiente
            </Text>
            <Feather 
              name="arrow-right" 
              size={18} 
              color={selectedItem !== null ? '#ffffff' : '#8a9a8e'} 
            />
          </TouchableOpacity>
        </ScrollView>
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
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  progressContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a6a4e',
    letterSpacing: 0.3,
  },
  percentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d8a4e',
  },
  progressBg: {
    height: 6,
    backgroundColor: '#e8ede8',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#0d8a4e',
    borderRadius: 3,
  },
  title: {
    fontSize: 24,
    color: '#0a3a1a',
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 24,
  },
  itemWrapper: {
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  itemSelected: {
    borderColor: '#0d8a4e',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemIconSelected: {
    backgroundColor: '#0d8a4e',
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  itemTextSelected: {
    color: '#0d8a4e',
    fontWeight: '600',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldImage: {
    height: 150,
    marginTop: 24,
    marginBottom: 28,
    borderRadius: 14,
    overflow: 'hidden',
  },
  fieldImageRadius: {
    borderRadius: 14,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 138, 78, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  imageText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 14,
    backgroundColor: '#e8ede8',
    gap: 8,
  },
  nextButtonActive: {
    backgroundColor: '#0d8a4e',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  nextText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8a9a8e',
    letterSpacing: 0.3,
  },
  nextTextActive: {
    color: '#ffffff',
  },
});