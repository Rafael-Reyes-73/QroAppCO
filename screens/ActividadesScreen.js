import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function ActividadesScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logoText}>potted_plant</Text>
            <Text style={styles.headerTitle}>Actividades</Text>
          </View>

          <View style={styles.headerIcons}>
            <Feather name="rotate-ccw" size={21} color="#4c584b" />

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={21} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.banner}>
            <View>
              <Text style={styles.bannerTitle}>Crecimiento Vital</Text>
              <Text style={styles.bannerText}>Tienes 5 tareas para hoy.</Text>
            </View>

            <View style={styles.leafCircle}>
              <MaterialCommunityIcons name="leaf" size={95} color="#214f22" />
            </View>
          </View>

          <View style={styles.tabs}>
            <View style={styles.activeTab}>
              <Text style={styles.activeTabText}>Pendientes</Text>
            </View>

            <View style={styles.inactiveTab}>
              <Text style={styles.inactiveTabText}>Completadas</Text>
            </View>
          </View>

          <View style={styles.searchBox}>
            <Feather name="search" size={21} color="#7b8379" />
            <TextInput
              style={styles.searchInput}
              placeholder="Filtrar por cultivo..."
              placeholderTextColor="#b6c0b3"
              editable={false}
            />
          </View>

          <TaskCard
            color="#0d4f17"
            iconBg="#c7edc4"
            icon="water-outline"
            title="Riego regular"
            date="HOY, 6:00 PM"
            description="Asegurar humedad profunda para las raíces."
            plant="Tomate Roma"
            buttonDark
          />

          <TaskCard
            color="#8a6535"
            iconBg="#ffe0b1"
            icon="content-cut"
            title="Poda de mantenimiento"
            date="Mañana, 8:00 AM"
            description="Eliminar chupones laterales para mejorar el flujo de aire."
            plant="Albahaca Genovesa"
            completed
          />

          <TaskCard
            color="#0d4f17"
            iconBg="#baf0ad"
            icon="recycle"
            title="Fertilización orgánica"
            date="22 May, 10:00 AM"
            description="Aplicar humus de lombriz en la base."
            plant="Calabacín"
            buttonDark
          />
        </ScrollView>

        <View style={styles.bottomNav}>
          <View style={styles.navActive}>
            <Feather name="clipboard" size={22} color="#ffffff" />
            <Text style={styles.navActiveText}>Tasks</Text>
          </View>

          <NavItem icon="flower-outline" label="Garden" />
          <NavItemFeather icon="bar-chart-2" label="Stats" />
          <NavItemFeather icon="settings" label="Settings" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function TaskCard({
  color,
  iconBg,
  icon,
  title,
  date,
  description,
  plant,
  buttonDark,
  completed,
}) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardContent}>
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <MaterialCommunityIcons name={icon} size={25} color="#143f1a" />
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardDate}>{date}</Text>
          </View>

          <Text style={styles.cardDescription}>{description}</Text>

          <View style={styles.plantRow}>
            <MaterialCommunityIcons name="flower-outline" size={15} color="#9aa59a" />
            <Text style={styles.plantText}>{plant}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.completeButton,
              buttonDark && styles.completeButtonDark,
              completed && styles.completeButtonLight,
            ]}
          >
            {completed ? (
              <Feather name="check" size={18} color="#5a8158" />
            ) : (
              <Feather name="check-circle" size={18} color="#ffffff" />
            )}

            <Text
              style={[
                styles.completeButtonText,
                buttonDark && styles.completeButtonTextDark,
                completed && styles.completeButtonTextLight,
              ]}
            >
              Marcar como completada
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function NavItem({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <MaterialCommunityIcons name={icon} size={23} color="#7d877c" />
      <Text style={styles.navText}>{label}</Text>
    </View>
  );
}

function NavItemFeather({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <Feather name={icon} size={23} color="#7d877c" />
      <Text style={styles.navText}>{label}</Text>
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
    paddingHorizontal: 22,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 23,
    color: '#154f1f',
    fontWeight: '400',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: '#173f19',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  banner: {
    height: 140,
    backgroundColor: '#2d6129',
    borderRadius: 10,
    paddingHorizontal: 40,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 24,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#9bd391',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9bd391',
  },
  leafCircle: {
    position: 'absolute',
    right: -35,
    bottom: -35,
    width: 125,
    height: 125,
    borderRadius: 70,
    backgroundColor: '#255522',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 48,
    backgroundColor: '#f2f5f1',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  activeTab: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTab: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  inactiveTabText: {
    color: '#444c43',
    fontSize: 16,
    fontWeight: '600',
  },
  searchBox: {
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#394039',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 20,
    paddingVertical: 24,
    paddingHorizontal: 22,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
  },
  iconBox: {
    width: 49,
    height: 49,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  cardInfo: {
    flex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: '#202420',
    lineHeight: 27,
  },
  cardDate: {
    width: 82,
    fontSize: 12,
    fontWeight: '800',
    color: '#324132',
    textAlign: 'right',
    lineHeight: 16,
  },
  cardDescription: {
    fontSize: 15,
    color: '#4f574f',
    fontWeight: '600',
    lineHeight: 22,
    marginTop: 4,
  },
  plantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    gap: 6,
  },
  plantText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#b5beb3',
  },
  completeButton: {
    marginTop: 16,
    borderRadius: 9,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  completeButtonDark: {
    backgroundColor: '#0d4f17',
  },
  completeButtonLight: {
    backgroundColor: '#c8efc6',
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  completeButtonTextDark: {
    color: '#ffffff',
  },
  completeButtonTextLight: {
    color: '#5a8158',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: '#eef3ed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 26,
  },
  navActive: {
    width: 66,
    height: 45,
    borderRadius: 24,
    backgroundColor: '#2d742e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActiveText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#747d73',
    fontWeight: '700',
    marginTop: 2,
  },
});