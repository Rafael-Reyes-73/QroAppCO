import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        {/* Perfil Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JM</Text>
            </View>
          </View>
          <Text style={styles.userName}>Javier Montes</Text>
          <Text style={styles.userEmail}>javier.montes@ecoemail.com</Text>
          <TouchableOpacity style={styles.editProfileBtn}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Cultivos</Text>
            <Text style={styles.statLabel}>Activos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>148</Text>
            <Text style={styles.statLabel}>Cosechas</Text>
            <Text style={styles.statLabel}>Totales</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2,450</Text>
            <Text style={styles.statLabel}>Puntos Eco</Text>
          </View>
        </View>

        {/* Gestión de Cuenta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GESTIÓN DE CUENTA</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Historial de Compras</Text>
          </TouchableOpacity>
          
          <View style={styles.menuDivider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Configuración</Text>
          </TouchableOpacity>
          
          <View style={styles.menuDivider} />
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuText, styles.logoutText]}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Versión */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>SemillasApp v2.4 – Cuidando el futuro</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f9f7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // ===== PERFIL HEADER =====
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8f0ec',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0b3a1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#c6e2d4',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0b2a1a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#4a7a5e',
    marginBottom: 12,
  },
  editProfileBtn: {
    backgroundColor: '#e6f5ed',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#b8dfc8',
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0b3a1e',
  },

  // ===== STATS =====
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8f0ec',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0b3a1e',
  },
  statLabel: {
    fontSize: 11,
    color: '#4a7a5e',
    marginTop: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e8f5ee',
  },

  // ===== SECCIÓN GESTIÓN =====
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8f0ec',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a7a5e',
    letterSpacing: 0.5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#0b2a1a',
  },
  logoutText: {
    color: '#d9534f',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e8f5ee',
    marginHorizontal: 12,
  },

  // ===== VERSIÓN =====
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 13,
    color: '#8ab89a',
  },
});