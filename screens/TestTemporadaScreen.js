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

export default function TestTemporadaScreen({ onClose }) {
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedTab, setSelectedTab] = useState('test');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const seasons = [
    { id: 1, title: 'Primavera', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80' },
    { id: 2, title: 'Verano', image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80' },
    { id: 3, title: 'Otoño', image: 'https://images.unsplash.com/photo-1506917728037-b6af01a7d403?auto=format&fit=crop&w=900&q=80' },
    { id: 4, title: 'Invierno', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80' },
  ];

  const handleSelect = (id) => {
    setSelectedSeason(id);
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
                <Text style={styles.progressText}>Paso 2 de 3</Text>
              </View>
              <Text style={styles.percentText}>66%</Text>
            </View>

            <View style={styles.progressBg}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>¿En qué temporada quieres sembrar?</Text>

          <Text style={styles.description}>
            Selecciona la época del año en la que planeas comenzar tu huerto
            orgánico para ofrecerte las mejores recomendaciones.
          </Text>

          {/* Tarjetas de temporada */}
          {seasons.map((season) => (
            <Animated.View
              key={season.id}
              style={[
                styles.seasonCardWrapper,
                {
                  transform: [{ 
                    scale: selectedSeason === season.id ? scaleAnim : 1 
                  }],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.seasonCard,
                  selectedSeason === season.id && styles.seasonCardSelected,
                ]}
                onPress={() => handleSelect(season.id)}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={{ uri: season.image }}
                  style={styles.seasonImage}
                  imageStyle={styles.seasonImageRadius}
                >
                  {selectedSeason === season.id && (
                    <View style={styles.seasonOverlay}>
                      <View style={styles.seasonCheck}>
                        <Feather name="check" size={20} color="#ffffff" />
                      </View>
                    </View>
                  )}
                </ImageBackground>

                <View style={styles.seasonInfo}>
                  <Text style={[
                    styles.seasonTitle,
                    selectedSeason === season.id && styles.seasonTitleSelected,
                  ]}>
                    {season.title}
                  </Text>
                  {selectedSeason === season.id && (
                    <View style={styles.seasonBadge}>
                      <Text style={styles.seasonBadgeText}>Seleccionado</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}

          {/* Botones */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[
                styles.nextButton,
                selectedSeason !== null && styles.nextButtonActive,
              ]}
              activeOpacity={0.8}
              disabled={selectedSeason === null}
            >
              <Text style={[
                styles.nextText,
                selectedSeason !== null && styles.nextTextActive,
              ]}>
                Siguiente
              </Text>
              <Feather 
                name="arrow-right" 
                size={18} 
                color={selectedSeason !== null ? '#ffffff' : '#8a9a8e'} 
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.prevButton} activeOpacity={0.7}>
              <Feather name="arrow-left" size={16} color="#4a6a4e" />
              <Text style={styles.prevText}>Anterior</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 100,
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
    width: '66%',
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
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 24,
  },
  seasonCardWrapper: {
    marginBottom: 12,
  },
  seasonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  seasonCardSelected: {
    borderColor: '#0d8a4e',
  },
  seasonImage: {
    height: 180,
    width: '100%',
  },
  seasonImageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  seasonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 138, 78, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seasonCheck: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(13, 138, 78, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  seasonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  seasonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  seasonTitleSelected: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
  seasonBadge: {
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.1)',
  },
  seasonBadgeText: {
    fontSize: 10,
    color: '#0d8a4e',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonsContainer: {
    marginTop: 24,
    gap: 8,
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
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.15)',
    gap: 6,
    backgroundColor: '#ffffff',
  },
  prevText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a6a4e',
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