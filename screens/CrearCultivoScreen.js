import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function CrearCultivoScreen({ onClose }) {
  const [selectedSeed, setSelectedSeed] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const seeds = [
    { id: 1, title: 'Tomate Roma', subtitle: 'Solanum lycopersicum', image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80' },
    { id: 2, title: 'Brócoli', subtitle: 'Brassica oleracea', image: 'https://images.unsplash.com/photo-1585515320310-2593db2e7d9f?auto=format&fit=crop&w=900&q=80' },
    { id: 3, title: 'Albahaca', subtitle: 'Ocimum basilicum', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80' },
    { id: 4, title: 'Zanahoria', subtitle: 'Daucus carota', image: 'https://images.unsplash.com/photo-1598170848812-5a3f1aeb0e12?auto=format&fit=crop&w=900&q=80' },
  ];

  const handleSeedSelect = (index) => {
    setSelectedSeed(index);
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

  const steps = [
    { number: 1, label: 'Semilla' },
    { number: 2, label: 'Detalles' },
    { number: 3, label: 'Guía' },
    { number: 4, label: 'Resumen' },
  ];

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

          <Text style={styles.headerTitle}>Crear Cultivo</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={20} color="#0a3a1a" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Steps */}
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <View style={styles.stepItem}>
                  <View style={[
                    styles.stepCircle,
                    currentStep >= step.number && styles.stepCircleActive,
                    currentStep === step.number && styles.stepCircleCurrent,
                  ]}>
                    <Text style={[
                      styles.stepNumber,
                      currentStep >= step.number && styles.stepNumberActive,
                    ]}>
                      {step.number}
                    </Text>
                  </View>
                  <Text style={[
                    styles.stepLabel,
                    currentStep >= step.number && styles.stepLabelActive,
                  ]}>
                    {step.label}
                  </Text>
                </View>
                {index < steps.length - 1 && (
                  <View style={[
                    styles.stepLine,
                    currentStep > step.number && styles.stepLineActive,
                  ]} />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Title */}
          <Text style={styles.title}>Selecciona tu semilla</Text>

          {/* Search */}
          <View style={styles.searchBox}>
            <Feather name="search" size={20} color="#6a8a6e" />
            <TextInput
              placeholder="Buscar semilla..."
              placeholderTextColor="#8a9a8e"
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>

          {/* Seeds Grid */}
          <View style={styles.seedsGrid}>
            {seeds.map((seed, index) => (
              <Animated.View
                key={seed.id}
                style={[
                  styles.seedCardWrapper,
                  {
                    transform: [{ 
                      scale: selectedSeed === index ? scaleAnim : 1 
                    }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.seedCard,
                    selectedSeed === index && styles.seedCardSelected,
                  ]}
                  onPress={() => handleSeedSelect(index)}
                  activeOpacity={0.8}
                >
                  <ImageBackground
                    source={{ uri: seed.image }}
                    style={styles.seedImage}
                    imageStyle={styles.seedImageRadius}
                  >
                    {selectedSeed === index && (
                      <View style={styles.selectedBadge}>
                        <Feather name="check" size={14} color="#ffffff" />
                      </View>
                    )}
                    {selectedSeed === index && (
                      <View style={styles.seedOverlay} />
                    )}
                  </ImageBackground>

                  <Text style={[
                    styles.seedTitle,
                    selectedSeed === index && styles.seedTitleSelected,
                  ]}>
                    {seed.title}
                  </Text>
                  <Text style={styles.seedSubtitle}>{seed.subtitle}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            style={[
              styles.continueButton,
              selectedSeed === null && styles.continueButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={selectedSeed === null}
          >
            <Text style={styles.continueText}>Continuar</Text>
            <Feather name="arrow-right" size={18} color="#ffffff" />
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
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8ede8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stepCircleActive: {
    backgroundColor: '#0d8a4e',
    borderColor: '#0d8a4e',
  },
  stepCircleCurrent: {
    backgroundColor: '#0d8a4e',
    borderColor: '#0d8a4e',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  stepNumber: {
    color: '#6a7a6e',
    fontSize: 14,
    fontWeight: '700',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLabel: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '600',
    color: '#6a7a6e',
    letterSpacing: 0.5,
  },
  stepLabelActive: {
    color: '#0a3a1a',
    fontWeight: '700',
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: '#d4ddd4',
    marginHorizontal: 4,
    marginBottom: 16,
  },
  stepLineActive: {
    backgroundColor: '#0d8a4e',
  },
  title: {
    fontSize: 22,
    color: '#0a3a1a',
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  searchBox: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#0a2a1a',
  },
  seedsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  seedCardWrapper: {
    width: '48%',
    marginBottom: 14,
  },
  seedCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  seedCardSelected: {
    borderColor: '#0d8a4e',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
  },
  seedImage: {
    height: 110,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  seedImageRadius: {
    borderRadius: 8,
  },
  seedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    borderRadius: 8,
  },
  selectedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  seedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  seedTitleSelected: {
    color: '#0d8a4e',
  },
  seedSubtitle: {
    fontSize: 11,
    color: '#6a7a6e',
    fontWeight: '400',
    marginTop: 2,
    fontStyle: 'italic',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0d8a4e',
    marginTop: 10,
    gap: 8,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: '#b8c8b8',
    shadowOpacity: 0,
  },
  continueText: {
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