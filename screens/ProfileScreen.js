import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen({ onClose, onNavigate }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Feather name="user" size={24} color="#154f1f" />
            <Text style={styles.headerTitle}>Perfil</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={21} color="#154f1f" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
              }}
              style={styles.avatar}
            />

            <Text style={styles.name}>Carlos</Text>
            <Text style={styles.email}>carlos.qrohuerto@email.com</Text>

            <View style={styles.badge}>
              <MaterialCommunityIcons name="sprout" size={17} color="#5a7c58" />
              <Text style={styles.badgeText}>Usuario QroHuerto</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatCard value="12" label="Cultivos" />
            <StatCard value="8" label="Favoritos" />
            <StatCard value="4" label="Pedidos" />
          </View>

          <Text style={styles.sectionTitle}>Opciones</Text>

          <OptionItem icon="shopping-bag" title="Mis pedidos" text="Consulta tus compras recientes" />
          <OptionItem icon="credit-card" title="Métodos de pago" text="Administra tus tarjetas guardadas" />
          <OptionItem icon="bell" title="Notificaciones" text="Configura tus avisos del huerto" />
          <OptionItem icon="settings" title="Configuración" text="Preferencias generales de la app" />

          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton}>
            <Feather name="log-out" size={20} color="#c71920" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('inicio')}>
            <Feather name="home" size={21} color="#3d463c" />
            <Text style={styles.navText}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('favoritos')}>
            <Feather name="heart" size={21} color="#3d463c" />
            <Text style={styles.navText}>Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('qrostore')}>
            <Feather name="shopping-bag" size={21} color="#3d463c" />
            <Text style={styles.navText}>Tienda</Text>
          </TouchableOpacity>

          <View style={styles.navActive}>
            <Feather name="user" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>Perfil</Text>
          </View>
        </View>
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
    backgroundColor: '#f7faf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7faf7',
  },
  header: {
    height: 66,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#edf0ed',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#154f1f',
    fontSize: 25,
    fontWeight: '900',
    marginLeft: 9,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 118,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 14,
  },
  name: {
    color: '#154f1f',
    fontSize: 29,
    fontWeight: '900',
  },
  email: {
    color: '#5a6259',
    fontSize: 15,
    marginTop: 5,
    fontWeight: '600',
  },
  badge: {
    marginTop: 15,
    backgroundColor: '#c9efc5',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: '#5a7c58',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  statCard: {
    width: '31%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  statValue: {
    color: '#154f1f',
    fontSize: 25,
    fontWeight: '900',
  },
  statLabel: {
    color: '#5a6259',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#154f1f',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 14,
  },
  optionItem: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  optionTitle: {
    color: '#154f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  optionText: {
    color: '#5a6259',
    fontSize: 13,
    marginTop: 3,
    fontWeight: '600',
  },
  logoutButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5eeee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  logoutText: {
    color: '#c71920',
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#edf0ed',
  },
  navActive: {
    width: 82,
    height: 44,
    borderRadius: 24,
    backgroundColor: '#c9efc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActiveText: {
    fontSize: 12,
    color: '#5a7c58',
    fontWeight: '800',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#3d463c',
    fontWeight: '700',
    marginTop: 3,
  },
});