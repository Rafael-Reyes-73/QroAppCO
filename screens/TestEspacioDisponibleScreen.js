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

export default function TestEspacioDisponibleScreen({ onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const options = [
    {
      id: 1,
      icon: 'flower-tulip-outline',
      title: 'Macetas/Balcón',
      text: 'Ideal para espacios urbanos y cultivo vertical.',
    },
    {
      id: 2,
      icon: 'greenhouse',
      title: 'Huerto pequeño',
      text: 'Menos de 5m². Perfecto para un autoconsumo básico.',
    },
    {
      id: 3,
      icon: 'tractor',
      title: 'Huerto mediano',
      text: 'De 5 a 20m². Espacio para rotación de cultivos variados.',
    },
    {
      id: 4,
      icon: 'image-filter-hdr',
      title: 'Terreno amplio',
      text: 'Más de 20m². Capacidad para frutales y grandes surcos.',
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
                <Text style={styles.progressText}>Paso 3 de 3</Text>
              </View>
              <Text style={styles.percentText}>100%</Text>
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
            <Text style={styles.title}>¿De cuánto espacio dispones?</Text>
            <Text style={styles.description}>
              Selecciona el área disponible para optimizar las recomendaciones
              de tu plan de cultivo.
            </Text>
          </View>

          {/* ===== OPCIONES ===== */}
          <View style={styles.optionsList}>
            {options.map((option) => {
              const active = selectedOption === option.id;
              return (
                <Animated.View
                  key={option.id}
                  style={[
                    styles.optionCardWrapper,
                    { transform: [{ scale: active ? scaleAnim : 1 }] },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.optionCard, active && styles.optionCardSelected]}
                    onPress={() => handleSelect(option.id)}
                    activeOpacity={0.85}
                  >
                    <View style={[styles.optionIconBox, active && styles.optionIconBoxSelected]}>
                      <MaterialCommunityIcons
                        name={option.icon}
                        size={24}
                        color={active ? '#ffffff' : colors.primary}
                      />
                    </View>

                    <View style={styles.optionContent}>
                      <Text style={[styles.optionTitle, active && styles.optionTitleSelected]}>
                        {option.title}
                      </Text>
                      <Text style={styles.optionText}>{option.text}</Text>
                    </View>

                    {active && (
                      <LinearGradient
                        colors={[colors.primaryMain, colors.primary]}
                        style={styles.optionCheck}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Feather name="check" size={16} color="#ffffff" />
                      </LinearGradient>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* ===== PLAN CARD ===== */}
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.planCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.planTop}>
              <LinearGradient
                colors={[colors.primaryLight, colors.accentGreen]}
                style={styles.planIconContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Feather name="check" size={24} color={colors.primary} />
              </LinearGradient>
              <View style={styles.planIconBadge}>
                <Feather name="sparkles" size={11} color="#ffffff" />
              </View>
            </View>

            <Text style={styles.planTitle}>Preparando tu plan personalizado</Text>
            <Text style={styles.planText}>
              Al seleccionar tu espacio, calcularemos automáticamente las
              variedades de semillas más óptimas para tu clima y el rendimiento
              estimado de tu cosecha.
            </Text>

            <View style={styles.planBadges}>
              <View style={styles.planBadge}>
                <Feather name="calendar" size={14} color={colors.accentGreen} />
                <Text style={styles.planBadgeText}>Ciclo de 12 meses</Text>
              </View>

              <View style={styles.planBadge}>
                <MaterialCommunityIcons name="water-outline" size={16} color={colors.accentGreen} />
                <Text style={styles.planBadgeText}>Riego inteligente</Text>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>

        {/* ===== BOTONES INFERIORES ===== */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.8}>
            <Feather name="arrow-left" size={16} color={colors.textBody} />
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.finishButton, selectedOption !== null && styles.finishButtonActive]}
            activeOpacity={0.85}
            disabled={selectedOption === null}
          >
            <Text style={[styles.finishText, selectedOption !== null && styles.finishTextActive]}>
              Finalizar y Ver Resultados
            </Text>
            <Feather
              name="arrow-right"
              size={16}
              color={selectedOption !== null ? '#ffffff' : colors.textLight}
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
    paddingBottom: 180,
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
    width: '100%',
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
  // ===== OPCIONES =====
  optionsList: {
    gap: 12,
  },
  optionCardWrapper: {
    marginBottom: 0,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.card,
  },
  optionCardSelected: {
    borderColor: colors.primaryMain,
    backgroundColor: colors.primarySoft,
  },
  optionIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionIconBoxSelected: {
    backgroundColor: colors.primaryMain,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: fonts.lg,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  optionTitleSelected: {
    color: colors.primary,
  },
  optionText: {
    fontSize: fonts.sm,
    color: colors.textBody,
    fontWeight: '500',
    lineHeight: 18,
  },
  optionCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  // ===== PLAN =====
  planCard: {
    marginTop: 20,
    borderRadius: radius.xl,
    padding: 20,
    ...shadows.green,
  },
  planTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  planIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planIconBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  planTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  planText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: fonts.md,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 16,
  },
  planBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    gap: 6,
  },
  planBadgeText: {
    fontSize: fonts.sm,
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  // ===== BOTONES INFERIORES =====
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.15)',
    backgroundColor: '#ffffff',
    gap: 6,
  },
  backText: {
    fontSize: fonts.md,
    fontWeight: '700',
    color: colors.textBody,
    letterSpacing: 0.3,
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    gap: 8,
  },
  finishButtonActive: {
    backgroundColor: colors.primaryMain,
    ...shadows.green,
  },
  finishText: {
    fontSize: fonts.lg,
    fontWeight: '800',
    color: colors.textLight,
    letterSpacing: 0.3,
  },
  finishTextActive: {
    color: '#ffffff',
  },
});
