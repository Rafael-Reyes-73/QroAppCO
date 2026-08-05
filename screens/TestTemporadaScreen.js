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
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, shadows, radius } from '../styles/theme';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function TestTemporadaScreen({ onClose }) {
  const [selectedSeason, setSelectedSeason] = useState(null);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor={colors.background} />

      <View style={styles.container}>
        {/* ===== HEADER PREMIUM ===== */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoWrapper}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.headerTitle}>Test de Cultivo</Text>
              <Text style={styles.headerSubtitle}>Personaliza tu huerto</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ===== PROGRESO ===== */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTop}>
              <View style={styles.progressLabel}>
                <LinearGradient
                  colors={[colors.primaryLight, colors.primaryMain]}
                  style={styles.progressIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Feather name="bar-chart-2" size={15} color="#ffffff" />
                </LinearGradient>
                <Text style={styles.progressText}>Paso 2 de 3</Text>
              </View>
              <Text style={styles.percentText}>66%</Text>
            </View>

            <View style={styles.progressBg}>
              <LinearGradient
                colors={[colors.primaryMain, colors.primary]}
                style={styles.progressFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          </View>

          {/* ===== TÍTULO ===== */}
          <View style={styles.titleBlock}>
            <Text style={styles.title}>¿En qué temporada quieres sembrar?</Text>
            <Text style={styles.description}>
              Selecciona la época del año en la que planeas comenzar tu huerto
              orgánico para ofrecerte las mejores recomendaciones.
            </Text>
          </View>

          {/* ===== TARJETAS DE TEMPORADA ===== */}
          <View style={styles.seasonsList}>
            {seasons.map((season) => {
              const active = selectedSeason === season.id;
              return (
                <Animated.View
                  key={season.id}
                  style={[
                    styles.seasonCardWrapper,
                    { transform: [{ scale: active ? scaleAnim : 1 }] },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.seasonCard, active && styles.seasonCardSelected]}
                    onPress={() => handleSelect(season.id)}
                    activeOpacity={0.85}
                  >
                    <ImageBackground
                      source={{ uri: season.image }}
                      style={styles.seasonImage}
                      imageStyle={styles.seasonImageRadius}
                    >
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.35)']}
                        style={styles.seasonImageOverlay}
                      />
                      {active && (
                        <View style={styles.seasonOverlay}>
                          <LinearGradient
                            colors={[colors.primaryMain, colors.primary]}
                            style={styles.seasonCheck}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                          >
                            <Feather name="check" size={20} color="#ffffff" />
                          </LinearGradient>
                        </View>
                      )}
                    </ImageBackground>

                    <View style={styles.seasonInfo}>
                      <Text style={[styles.seasonTitle, active && styles.seasonTitleSelected]}>
                        {season.title}
                      </Text>
                      {active && (
                        <View style={styles.seasonBadge}>
                          <Feather name="check-circle" size={12} color={colors.primary} />
                          <Text style={styles.seasonBadgeText}>Seleccionado</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* ===== BOTONES ===== */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.nextButton, selectedSeason !== null && styles.nextButtonActive]}
              activeOpacity={0.85}
              disabled={selectedSeason === null}
            >
              <Text style={[styles.nextText, selectedSeason !== null && styles.nextTextActive]}>
                Siguiente
              </Text>
              <Feather
                name="arrow-right"
                size={18}
                color={selectedSeason !== null ? '#ffffff' : colors.textLight}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.prevButton} activeOpacity={0.8}>
              <Feather name="arrow-left" size={16} color={colors.textBody} />
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
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ===== HEADER =====
  header: {
    height: 76,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginRight: 12,
  },
  logo: {
    width: 90,
    height: 32,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: fonts.xl,
    fontWeight: '900',
    color: colors.primary,
    lineHeight: 22,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ===== SCROLL =====
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  // ===== PROGRESO =====
  progressContainer: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 24,
    ...shadows.card,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: fonts.sm,
    fontWeight: '700',
    color: colors.textBody,
    letterSpacing: 0.3,
  },
  percentText: {
    fontSize: fonts.md,
    fontWeight: '800',
    color: colors.primaryMain,
  },
  progressBg: {
    height: 7,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    width: '66%',
    height: '100%',
    borderRadius: 4,
  },
  // ===== TÍTULO =====
  titleBlock: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: colors.textDark,
    fontWeight: '900',
    lineHeight: 32,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  description: {
    fontSize: fonts.md,
    color: colors.textBody,
    lineHeight: 22,
    fontWeight: '500',
  },
  // ===== TEMPORADAS =====
  seasonsList: {
    gap: 12,
  },
  seasonCardWrapper: {
    marginBottom: 0,
  },
  seasonCard: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.card,
  },
  seasonCardSelected: {
    borderColor: colors.primaryMain,
  },
  seasonImage: {
    height: 170,
    width: '100%',
  },
  seasonImageRadius: {
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  seasonImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    fontSize: fonts.lg,
    fontWeight: '700',
    color: colors.textDark,
    letterSpacing: 0.3,
  },
  seasonTitleSelected: {
    color: colors.primary,
    fontWeight: '800',
  },
  seasonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    gap: 4,
  },
  seasonBadgeText: {
    fontSize: fonts.xs,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  // ===== BOTONES =====
  buttonsContainer: {
    marginTop: 24,
    gap: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    gap: 8,
  },
  nextButtonActive: {
    backgroundColor: colors.primaryMain,
    ...shadows.green,
  },
  nextText: {
    fontSize: fonts.lg,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 0.3,
  },
  nextTextActive: {
    color: '#ffffff',
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.15)',
    gap: 6,
    backgroundColor: '#ffffff',
  },
  prevText: {
    fontSize: fonts.md,
    fontWeight: '700',
    color: colors.textBody,
    letterSpacing: 0.3,
  },
});
