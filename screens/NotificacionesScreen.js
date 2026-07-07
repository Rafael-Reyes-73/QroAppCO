import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NotificacionesScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Feather name="arrow-left" size={24} color="#154f1f" />
            <Text style={styles.headerTitle}>Notificaciones</Text>
          </View>

          <View style={styles.headerRight}>
            <Feather name="settings" size={23} color="#154f1f" />

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hoy</Text>
            <Text style={styles.markAll}>Marcar todo como leído</Text>
          </View>

          <NotificationCard
            icon="water-outline"
            title="Riego"
            time="Hace 5 min"
            text="¡Es hora de regar tu Tomate Roma!"
            unread
            actions
          />

          <NotificationCard
            image
            title="Consejos de Morita"
            time="2h"
            text="Morita sugiere: El clima estará muy caluroso hoy, considera un riego extra."
            unread
          />

          <Text style={styles.oldTitle}>Anteriores</Text>

          <NotificationCard
            icon="sprout-outline"
            title="Crecimiento"
            time="Ayer"
            text="¡Nueva Etapa! Tu Albahaca ha pasado a Floración."
          />

          <NotificationCard
            icon="tractor"
            title="Cosecha"
            time="Ayer"
            text="Cosecha próxima: Tu Zanahoria Nantes estará lista en 3 días."
          />

          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="grave-stone" size={58} color="#d1d6d1" />
            <Text style={styles.emptyText}>No hay más notificaciones</Text>
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <NavItem icon="sprout-outline" label="Huerto" />
          <View style={styles.navActive}>
            <Feather name="bell" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>Notificaciones</Text>
          </View>
          <NavItem icon="robot-outline" label="Asistente" />
          <NavItemFeather icon="user" label="Perfil" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function NotificationCard({ icon, image, title, time, text, unread, actions }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconColumn}>
        {image ? (
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=200&q=80',
            }}
            style={styles.moritaImage}
          />
        ) : (
          <MaterialCommunityIcons name={icon} size={25} color="#154f1f" />
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>

        {unread && <View style={styles.unreadDot} />}

        <Text style={styles.cardText}>{text}</Text>

        {actions && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.doneButton}>
              <Text style={styles.doneText}>Hecho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postponeButton}>
              <Text style={styles.postponeText}>Posponer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

function NavItem({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <MaterialCommunityIcons name={icon} size={23} color="#3d463c" />
      <Text style={styles.navText}>{label}</Text>
    </View>
  );
}

function NavItemFeather({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <Feather name={icon} size={21} color="#3d463c" />
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
    marginLeft: 22,
    color: '#154f1f',
    fontSize: 24,
    fontWeight: '900',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 10,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 18,
    paddingBottom: 125,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#154f1f',
    fontSize: 26,
    fontWeight: '900',
  },
  markAll: {
    color: '#5b7758',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  card: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
  },
  iconColumn: {
    width: 52,
    alignItems: 'center',
    paddingTop: 12,
  },
  moritaImage: {
    width: 45,
    height: 45,
    borderRadius: 23,
  },
  cardContent: {
    flex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#222822',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  timeText: {
    color: '#4d554d',
    fontSize: 12,
    fontWeight: '900',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: -7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#154f1f',
  },
  cardText: {
    marginTop: 8,
    color: '#5a6259',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 14,
  },
  doneButton: {
    backgroundColor: '#105219',
    borderRadius: 20,
    paddingHorizontal: 19,
    paddingVertical: 8,
    marginRight: 8,
  },
  doneText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 12,
  },
  postponeButton: {
    backgroundColor: '#dfe2df',
    borderRadius: 20,
    paddingHorizontal: 19,
    paddingVertical: 8,
  },
  postponeText: {
    color: '#555c55',
    fontWeight: '900',
    fontSize: 12,
  },
  oldTitle: {
    color: '#154f1f',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 40,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    marginTop: 10,
    color: '#d1d6d1',
    fontSize: 16,
    fontWeight: '600',
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
    alignItems: 'center',
  },
  navActiveText: {
    fontSize: 11,
    color: '#5a7c58',
    fontWeight: '900',
    marginTop: 3,
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