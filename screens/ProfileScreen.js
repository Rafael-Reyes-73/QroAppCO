import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Animated,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import QroStoreBottomNav from './QroStoreBottomNav';
import { colors, fonts, shadows, radius, spacing } from '../styles/theme';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function ProfileScreen({ onClose, hideMenu = false, onNavigate }) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (action) => {
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

    if (action === 'logout') {
      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro de que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Cerrar Sesión',
            style: 'destructive',
            onPress: () => {
              router.replace('/login');
            }
          }
        ]
      );
    }
  };

  const menuItems = [
    { id: 1, icon: 'clock', label: 'Historial de Compras', color: colors.textDark },
    { id: 2, icon: 'settings', label: 'Configuración', color: colors.textDark },
    { id: 3, icon: 'log-out', label: 'Cerrar Sesión', color: colors.danger, action: 'logout' },
  ];

  const statsData = [
    { number: '12', label: 'Cultivos Activos' },
    { number: '148', label: 'Cosechas Totales' },
    { number: '2,450', label: 'Puntos Eco' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header premium con logo limpio */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoWrapper}>
              <Image
                source={logoImage}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>
          {onClose && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color={colors.textDark} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            onNavigate && styles.scrollContentWithNav,
          ]}
        >
          {/* Perfil Header con gradiente premium */}
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            style={styles.profileHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <LinearGradient
                  colors={[colors.primaryLight, colors.primary]}
                  style={styles.avatarGradient}
                >
                  <Text style={styles.avatarText}>JM</Text>
                </LinearGradient>
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Feather name="camera" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>Javier Montes</Text>
            <Text style={styles.userEmail}>javier.montes@ecoemail.com</Text>
            <TouchableOpacity style={styles.editProfileBtn}>
              <Text style={styles.editProfileText}>Editar Perfil</Text>
              <Feather name="arrow-right" size={14} color={colors.primary} />
            </TouchableOpacity>
          </LinearGradient>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {statsData.map((stat, index) => (
              <React.Fragment key={index}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{stat.number}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
                {index < statsData.length - 1 && <View style={styles.statDivider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Gestión de Cuenta */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconLine} />
              <Text style={styles.sectionTitle}>Gestión de Cuenta</Text>
            </View>

            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handlePress(item.action)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.menuIconContainer,
                    item.id === 3 && styles.menuIconContainerDanger
                  ]}>
                    <Feather
                      name={item.icon}
                      size={18}
                      color={item.id === 3 ? colors.danger : colors.primary}
                    />
                  </View>
                  <Text style={[
                    styles.menuText,
                    item.id === 3 && styles.logoutText
                  ]}>
                    {item.label}
                  </Text>
                  <Feather
                    name="chevron-right"
                    size={16}
                    color={item.id === 3 ? colors.danger : colors.textMuted}
                  />
                </TouchableOpacity>
                {index < menuItems.length - 1 && <View style={styles.menuDivider} />}
              </React.Fragment>
            ))}
          </View>

          {/* Versión */}
          <View style={styles.versionContainer}>
            <View style={styles.versionDot} />
            <Text style={styles.versionText}>QroHuerto v2.4</Text>
          </View>
        </ScrollView>

        {/* Bottom nav persistente */}
        {onNavigate && <QroStoreBottomNav active="perfil" onNavigate={onNavigate} />}
      </View>
    </SafeAreaView>
  );
}

function StatCard({ value, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  // Header premium
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(16,82,25,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  logoImage: {
    width: 90,
    height: 30,
    borderRadius: radius.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textDark,
    letterSpacing: 0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.bgSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  scrollContentWithNav: {
    paddingBottom: 100,
  },
  // Perfil Header
  profileHeader: {
    alignItems: 'center',
    borderRadius: radius.lg,
    paddingVertical: 26,
    paddingHorizontal: 20,
    marginBottom: 16,
    ...shadows.banner,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 84,
    height: 84,
    borderRadius: 42,
    padding: 3,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarGradient: {
    width: 78,
    height: 78,
    borderRadius: 39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 1,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 14,
    fontWeight: '500',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.2,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    paddingVertical: 18,
    marginBottom: 16,
    ...shadows.card,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.05)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textDark,
    letterSpacing: 0.3,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(16,82,25,0.08)',
  },
  // Sección
  section: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 16,
    ...shadows.card,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.05)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
  },
  sectionIconLine: {
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(16,82,25,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconContainerDanger: {
    backgroundColor: 'rgba(215,25,32,0.07)',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    letterSpacing: 0.2,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '800',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(16,82,25,0.06)',
    marginHorizontal: 12,
  },
  // Versión
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  versionDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
  },
  versionText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});
