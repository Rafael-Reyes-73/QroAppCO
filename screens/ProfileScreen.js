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
  Platform,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import QroStoreBottomNav from './QroStoreBottomNav';

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
              // Aquí irá la lógica de logout
              router.replace('/login');
            }
          }
        ]
      );
    }
  };

  const menuItems = [
    { id: 1, icon: 'clock', label: 'Historial de Compras', color: '#0a3a1a' },
    { id: 2, icon: 'settings', label: 'Configuración', color: '#0a3a1a' },
    { id: 3, icon: 'log-out', label: 'Cerrar Sesión', color: '#d71920', action: 'logout' },
  ];

  const statsData = [
    { number: '12', label: 'Cultivos Activos' },
    { number: '148', label: 'Cosechas Totales' },
    { number: '2,450', label: 'Puntos Eco' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Header premium */}
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
              <Feather name="x" size={20} color="#0a3a1a" />
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
          {/* Perfil Header con gradiente */}
          <LinearGradient
            colors={['#ffffff', '#f8fbf9']}
            style={styles.profileHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <LinearGradient
                  colors={['#0d8a4e', '#0a7a3e']}
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
              <Feather name="arrow-right" size={14} color="#0d8a4e" />
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
                      color={item.id === 3 ? '#d71920' : '#0d8a4e'} 
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
                    color={item.id === 3 ? '#d71920' : '#8a9a8e'} 
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

function OptionItem({ icon, title, text }) {
  return (
    <View style={styles.optionItem}>
      <View style={styles.optionIcon}>
        <Feather name={icon} size={21} color="#154f1f" />
      </View>

      <View style={styles.optionTextBox}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionText}>{text}</Text>
      </View>

      <Feather name="chevron-right" size={22} color="#9aa59a" />
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
  // Header premium
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 138, 78, 0.04)',
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
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  logoImage: {
    width: 80,
    height: 28,
    borderRadius: 4,
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
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarWrapper: {
    width: 84,
    height: 84,
    borderRadius: 42,
    padding: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '700',
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
    backgroundColor: '#0d8a4e',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  userEmail: {
    fontSize: 14,
    color: '#4a6a4e',
    marginBottom: 14,
    fontWeight: '400',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.1)',
    gap: 6,
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0d8a4e',
    letterSpacing: 0.2,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  statLabel: {
    fontSize: 10,
    color: '#4a6a4e',
    marginTop: 2,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
  },
  // Sección
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
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
    backgroundColor: '#0d8a4e',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4a6a4e',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  optionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconContainerDanger: {
    backgroundColor: 'rgba(215, 25, 32, 0.06)',
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#c9efc5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionTextBox: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  logoutText: {
    color: '#d71920',
    fontWeight: '600',
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
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
    backgroundColor: '#8a9a8e',
  },
  versionText: {
    fontSize: 12,
    color: '#8a9a8e',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
});