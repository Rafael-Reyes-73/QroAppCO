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

export default function TestEspacioDisponibleScreen({ onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTab, setSelectedTab] = useState('test');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const options = [
    { 
      id: 1, 
      icon: 'flower-tulip-outline', 
      title: 'Macetas/Balcón', 
      text: 'Ideal para espacios urbanos y cultivo vertical.' 
    },
    { 
      id: 2, 
      icon: 'greenhouse', 
      title: 'Huerto pequeño', 
      text: 'Menos de 5m². Perfecto para un autoconsumo básico.' 
    },
    { 
      id: 3, 
      icon: 'tractor', 
      title: 'Huerto mediano', 
      text: 'De 5 a 20m². Espacio para rotación de cultivos variados.' 
    },
    { 
      id: 4, 
      icon: 'image-filter-hdr', 
      title: 'Terreno amplio', 
      text: 'Más de 20m². Capacidad para frutales y grandes surcos.' 
    },
  ];

  const handleSelect = (id) => {
    setSelectedOption(id);
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
                <Text style={styles.progressText}>Paso 3 de 3</Text>
              </View>
              <Text style={styles.percentText}>100%</Text>
            </View>

            <View style={styles.progressBg}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>¿De cuánto espacio dispones?</Text>

          {/* Opciones */}
          {options.map((option) => (
            <Animated.View
              key={option.id}
              style={[
                styles.optionCardWrapper,
                {
                  transform: [{ 
                    scale: selectedOption === option.id ? scaleAnim : 1 
                  }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedOption === option.id && styles.optionCardSelected,
                ]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.optionIconBox,
                  selectedOption === option.id && styles.optionIconBoxSelected,
                ]}>
                  <MaterialCommunityIcons 
                    name={option.icon} 
                    size={24} 
                    color={selectedOption === option.id ? '#ffffff' : '#0a3a1a'} 
                  />
                </View>

                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    selectedOption === option.id && styles.optionTitleSelected,
                  ]}>
                    {option.title}
                  </Text>
                  <Text style={styles.optionText}>{option.text}</Text>
                </View>

                {selectedOption === option.id && (
                  <View style={styles.optionCheck}>
                    <Feather name="check" size={16} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>
          ))}

          {/* Plan Card */}
          <View style={styles.planCard}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
              }}
              style={styles.planImage}
              imageStyle={styles.planImageRadius}
            >
              <View style={styles.planOverlay}>
                <View style={styles.planIconContainer}>
                  <Feather name="check" size={24} color="#0d8a4e" />
                </View>
              </View>
            </ImageBackground>

            <Text style={styles.planTitle}>Preparando tu plan personalizado</Text>
            <Text style={styles.planText}>
              Al seleccionar tu espacio, calcularemos automáticamente las
              variedades de semillas más óptimas para tu clima y el rendimiento
              estimado de tu cosecha.
            </Text>

            <View style={styles.planBadges}>
              <View style={styles.planBadge}>
                <Feather name="calendar" size={14} color="#0d8a4e" />
                <Text style={styles.planBadgeText}>Ciclo de 12 meses</Text>
              </View>

              <View style={styles.planBadge}>
                <MaterialCommunityIcons name="water-outline" size={16} color="#0d8a4e" />
                <Text style={styles.planBadgeText}>Riego inteligente</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
            <Feather name="arrow-left" size={16} color="#4a6a4e" />
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.finishButton,
              selectedOption !== null && styles.finishButtonActive,
            ]}
            activeOpacity={0.8}
            disabled={selectedOption === null}
          >
            <Text style={[
              styles.finishText,
              selectedOption !== null && styles.finishTextActive,
            ]}>
              Finalizar y Ver Resultados
            </Text>
            <Feather 
              name="arrow-right" 
              size={16} 
              color={selectedOption !== null ? '#ffffff' : '#8a9a8e'} 
            />
          </TouchableOpacity>
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
    paddingBottom: 180,
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
    width: '100%',
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
    marginBottom: 20,
  },
  optionCardWrapper: {
    marginBottom: 12,
  },
  optionCard: {
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
  optionCardSelected: {
    borderColor: '#0d8a4e',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
  },
  optionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionIconBoxSelected: {
    backgroundColor: '#0d8a4e',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  optionTitleSelected: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
  optionText: {
    fontSize: 13,
    color: '#4a6a4e',
    fontWeight: '400',
    lineHeight: 18,
  },
  optionCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  planCard: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  planImage: {
    height: 140,
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  planImageRadius: {
    borderRadius: 10,
  },
  planOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 138, 78, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  planText: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 14,
  },
  planBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  planBadgeText: {
    fontSize: 12,
    color: '#0d8a4e',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 65,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.15)',
    backgroundColor: '#ffffff',
    gap: 6,
  },
  backText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a6a4e',
    letterSpacing: 0.3,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#e8ede8',
    gap: 8,
  },
  finishButtonActive: {
    backgroundColor: '#0d8a4e',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  finishText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8a9a8e',
    letterSpacing: 0.3,
  },
  finishTextActive: {
    color: '#ffffff',
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