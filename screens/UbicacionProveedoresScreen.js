import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, shadows, radius } from '../styles/theme';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

const chips = ['Querétaro', 'Corregidora', 'El Marqués', 'San Juan del Río'];

const proveedores = [
  {
    id: 1,
    nombre: 'Huerto Santa Fe',
    categoria: 'Hortalizas orgánicas',
    distancia: '1.2 km',
    rating: 4.8,
    reviews: 124,
    color: '#0d8a4e',
    icon: 'sprout',
  },
  {
    id: 2,
    nombre: 'La Huerta de Bugambilia',
    categoria: 'Frutas y verduras',
    distancia: '2.5 km',
    rating: 4.6,
    reviews: 89,
    color: '#154f1f',
    icon: 'fruit-cherries',
  },
  {
    id: 3,
    nombre: 'Granja Ecológica El Marqués',
    categoria: 'Huevo y lácteos',
    distancia: '3.8 km',
    rating: 4.9,
    reviews: 210,
    color: '#0d8a4e',
    icon: 'cow',
  },
  {
    id: 4,
    nombre: 'Mercado del Campo',
    categoria: 'Productos locales',
    distancia: '5.1 km',
    rating: 4.5,
    reviews: 67,
    color: '#154f1f',
    icon: 'store',
  },
];

export default function UbicacionProveedoresScreen({ onClose }) {
  const [selectedChip, setSelectedChip] = useState('Querétaro');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const entradaAnim = useRef(new Animated.Value(0)).current;

  // Animación de entrada de la lista
  React.useEffect(() => {
    Animated.timing(entradaAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [entradaAnim]);

  const handleChipPress = (chip) => {
    setSelectedChip(chip);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
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
              <Text style={styles.headerTitle}>Ubicación</Text>
              <Text style={styles.headerSubtitle}>Encuentra proveedores cerca</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.headerIconButton}
              onPress={onClose}
            >
              <Feather name="x" size={21} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ===== TARJETA DE UBICACIÓN ACTUAL ===== */}
          <View style={styles.locationCard}>
            <View style={styles.locationLeft}>
              <LinearGradient
                colors={[colors.primaryLight, colors.primaryMain]}
                style={styles.locationIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Feather name="map-pin" size={22} color="#ffffff" />
              </LinearGradient>
              <View style={styles.locationText}>
                <Text style={styles.locationLabel}>Tu ubicación actual</Text>
                <Text style={styles.locationValue}>Centro, Querétaro, QRO</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.gpsButton} activeOpacity={0.85}>
              <Feather name="crosshair" size={16} color={colors.primary} />
              <Text style={styles.gpsText}>Ubicar</Text>
            </TouchableOpacity>
          </View>

          {/* ===== BUSCADOR ===== */}
          <View style={styles.searchBox}>
            <Feather name="search" size={20} color={colors.textMuted} />
            <TextInput
              placeholder="Buscar proveedores orgánicos..."
              placeholderTextColor={colors.textLight}
              style={styles.searchInput}
              returnKeyType="search"
            />
            <TouchableOpacity activeOpacity={0.7}>
              <Feather name="sliders" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* ===== CHIPS DE MUNICIPIOS ===== */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}
          >
            {chips.map((chip) => {
              const active = selectedChip === chip;
              return (
                <Animated.View
                  key={chip}
                  style={{
                    transform: [
                      { scale: active ? scaleAnim : 1 },
                    ],
                  }}
                >
                  <TouchableOpacity
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => handleChipPress(chip)}
                    activeOpacity={0.8}
                  >
                    <Feather
                      name={active ? 'map-pin' : 'map'}
                      size={14}
                      color={active ? '#ffffff' : colors.textMuted}
                    />
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {chip}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </ScrollView>

          {/* ===== ENCABEZADO DE SECCIÓN ===== */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Proveedores cercanos</Text>
              <Text style={styles.sectionCount}>
                {selectedChip} · 6 proveedores disponibles
              </Text>
            </View>
            <TouchableOpacity style={styles.listToggle} activeOpacity={0.8}>
              <Feather name="list" size={16} color={colors.primary} />
              <Text style={styles.listToggleText}>Lista</Text>
            </TouchableOpacity>
          </View>

          {/* ===== MAPA VISUAL MEJORADO (con listado inline) ===== */}
          <View style={styles.mapCard}>
            <LinearGradient
              colors={['#eef0e4', '#e6ebdd', '#f0f2e8']}
              style={styles.mockMap}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {/* Calles decorativas */}
              <View style={[styles.roadH, { top: '30%' }]} />
              <View style={[styles.roadH, { top: '62%' }]} />
              <View style={[styles.roadV, { left: '38%' }]} />
              <View style={styles.roadDiag} />

              {/* Marcadores */}
              <MapMarker top={70} left={40} large />
              <MapMarker top={150} left={130} />
              <MapMarker top={200} left={70} />
              <MapMarker top={230} left={180} large />
              <MapMarker top={275} left={230} large />
              <MapMarker top={320} left={140} />

              {/* Etiqueta proveedores */}
              <View style={styles.mapLabel}>
                <View style={styles.mapLabelDot} />
                <Text style={styles.mapLabelText}>6 proveedores cerca de ti</Text>
              </View>
            </LinearGradient>

            {/* Botón flotante ver lista */}
            <TouchableOpacity style={styles.listButton} activeOpacity={0.85}>
              <Feather name="navigation" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* ===== LISTA DE PROVEEDORES ===== */}
          <View style={styles.providersSection}>
            {proveedores.map((prov, index) => (
              <Animated.View
                key={prov.id}
                style={{
                  opacity: entradaAnim,
                  transform: [
                    {
                      translateY: entradaAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={styles.providerCard}
                  activeOpacity={0.85}
                >
                  <View style={[styles.providerIcon, { backgroundColor: `${prov.color}1A` }]}>
                    <MaterialCommunityIcons
                      name={prov.icon}
                      size={22}
                      color={prov.color}
                    />
                  </View>

                  <View style={styles.providerBody}>
                    <Text style={styles.providerName}>{prov.nombre}</Text>
                    <Text style={styles.providerCategory}>{prov.categoria}</Text>
                    <View style={styles.providerMeta}>
                      <View style={styles.ratingRow}>
                        <Feather name="star" size={12} color="#d4a017" />
                        <Text style={styles.ratingText}>{prov.rating}</Text>
                        <Text style={styles.ratingReviews}>({prov.reviews})</Text>
                      </View>
                      <View style={styles.distanceRow}>
                        <Feather name="navigation" size={11} color={colors.textMuted} />
                        <Text style={styles.distanceText}>{prov.distancia}</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.routeButton} activeOpacity={0.85}>
                    <Feather name="arrow-right" size={18} color="#ffffff" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
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
      {large && <View style={styles.markerShadow} />}
    </View>
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
    fontSize: fonts.title - 5,
    fontWeight: '900',
    color: colors.primary,
    lineHeight: 24,
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
  headerIconButton: {
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
  // ===== TARJETA UBICACIÓN =====
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: 16,
    ...shadows.card,
    marginBottom: 16,
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationText: {
    flex: 1,
  },
  locationLabel: {
    fontSize: fonts.sm,
    color: colors.textMuted,
    fontWeight: '600',
  },
  locationValue: {
    fontSize: fonts.lg,
    color: colors.textDark,
    fontWeight: '800',
    marginTop: 2,
  },
  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    gap: 6,
  },
  gpsText: {
    color: colors.primary,
    fontSize: fonts.sm,
    fontWeight: '800',
  },
  // ===== BUSCADOR =====
  searchBox: {
    height: 54,
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    ...shadows.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: fonts.md,
    color: colors.textDark,
    fontWeight: '500',
  },
  // ===== CHIPS =====
  chipsRow: {
    paddingVertical: 4,
    marginBottom: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primaryMain,
    borderColor: colors.primaryMain,
    ...shadows.green,
  },
  chipText: {
    color: colors.textBody,
    fontSize: fonts.sm,
    fontWeight: '800',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  // ===== SECCIÓN =====
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '900',
  },
  sectionCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  listToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    gap: 6,
  },
  listToggleText: {
    color: colors.primary,
    fontSize: fonts.sm,
    fontWeight: '800',
  },
  // ===== MAPA =====
  mapCard: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.elevated,
    marginBottom: 20,
  },
  mockMap: {
    height: 260,
    position: 'relative',
    overflow: 'hidden',
  },
  roadH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  roadV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 14,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  roadDiag: {
    position: 'absolute',
    width: 340,
    height: 14,
    backgroundColor: 'rgba(255,255,255,0.45)',
    transform: [{ rotate: '-18deg' }],
    top: 120,
    left: -40,
  },
  mapLabel: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    gap: 6,
    ...shadows.card,
  },
  mapLabelDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  mapLabelText: {
    fontSize: fonts.sm,
    fontWeight: '700',
    color: colors.textDark,
  },
  listButton: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryMain,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.green,
  },
  // ===== MARCADORES =====
  markerHalo: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(13, 138, 78, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHaloLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(13, 138, 78, 0.14)',
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primaryMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerLarge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primaryMain,
  },
  markerShadow: {
    position: 'absolute',
    bottom: -6,
    width: 24,
    height: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  // ===== PROVEEDORES =====
  providersSection: {
    gap: 12,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    padding: 14,
    ...shadows.card,
  },
  providerIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  providerBody: {
    flex: 1,
  },
  providerName: {
    color: colors.textDark,
    fontSize: fonts.lg,
    fontWeight: '800',
  },
  providerCategory: {
    color: colors.textMuted,
    fontSize: fonts.xs,
    fontWeight: '600',
    marginTop: 1,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    color: colors.textDark,
    fontSize: fonts.sm,
    fontWeight: '800',
  },
  ratingReviews: {
    color: colors.textLight,
    fontSize: fonts.xs,
    fontWeight: '600',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  distanceText: {
    color: colors.textMuted,
    fontSize: fonts.xs,
    fontWeight: '700',
  },
  routeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryMain,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.green,
  },
  bottomSpacer: {
    height: 10,
  },
});
