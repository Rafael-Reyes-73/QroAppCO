import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, shadows, radius } from '../styles/theme';

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
                <Text style={styles.progressText}>Progreso del Test</Text>
              </View>
              <Text style={styles.percentText}>33%</Text>
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
            <Text style={styles.title}>¿En qué municipio te encuentras?</Text>
            <Text style={styles.description}>
              Selecciona tu ubicación actual para personalizar tu experiencia de
              cultivo y recomendaciones botánicas.
            </Text>
          </View>

          {/* ===== LISTA DE MUNICIPIOS ===== */}
          <View style={styles.list}>
            {municipios.map((item) => {
              const active = selectedItem === item.id;
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.itemWrapper,
                    { transform: [{ scale: active ? scaleAnim : 1 }] },
                  ]}
                >
                  <TouchableOpacity
                    style={[styles.item, active && styles.itemSelected]}
                    onPress={() => handleSelect(item.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.itemIcon, active && styles.itemIconSelected]}>
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={22}
                        color={active ? '#ffffff' : colors.primary}
                      />
                    </View>

                    <Text style={[styles.itemText, active && styles.itemTextSelected]}>
                      {item.name}
                    </Text>

                    {active && (
                      <LinearGradient
                        colors={[colors.primaryMain, colors.primary]}
                        style={styles.checkBadge}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Feather name="check" size={14} color="#ffffff" />
                      </LinearGradient>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          {/* ===== BANNER IMAGEN ===== */}
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.fieldBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.fieldIcon}>
              <Feather name="map-pin" size={22} color={colors.primary} />
            </View>
            <View style={styles.fieldText}>
              <Text style={styles.fieldTitle}>¿Listo para empezar?</Text>
              <Text style={styles.fieldSubtitle}>
                Descubre qué cultivar según tu municipio
              </Text>
            </View>
          </LinearGradient>

          {/* ===== BOTÓN SIGUIENTE ===== */}
          <TouchableOpacity
            style={[styles.nextButton, selectedItem !== null && styles.nextButtonActive]}
            activeOpacity={0.85}
            disabled={selectedItem === null}
          >
            <Text style={[styles.nextText, selectedItem !== null && styles.nextTextActive]}>
              Siguiente
            </Text>
            <Feather
              name="arrow-right"
              size={18}
              color={selectedItem !== null ? '#ffffff' : colors.textLight}
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
    width: '33%',
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
  // ===== LISTA =====
  list: {
    gap: 10,
  },
  itemWrapper: {
    marginBottom: 0,
  },
  item: {
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
  itemSelected: {
    borderColor: colors.primaryMain,
    backgroundColor: colors.primarySoft,
  },
  itemIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemIconSelected: {
    backgroundColor: colors.primaryMain,
  },
  itemText: {
    flex: 1,
    fontSize: fonts.lg,
    fontWeight: '700',
    color: colors.textDark,
    letterSpacing: 0.2,
  },
  itemTextSelected: {
    color: colors.primary,
  },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ===== BANNER =====
  fieldBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.lg,
    padding: 18,
    marginTop: 24,
    marginBottom: 20,
    ...shadows.green,
  },
  fieldIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fieldText: {
    flex: 1,
  },
  fieldTitle: {
    color: '#ffffff',
    fontSize: fonts.lg,
    fontWeight: '800',
  },
  fieldSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: fonts.sm,
    fontWeight: '600',
    marginTop: 2,
  },
  // ===== BOTÓN =====
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
});
