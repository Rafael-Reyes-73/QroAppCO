import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function NotificacionesScreen({ onClose }) {
  const router = useRouter();
  const [readItems, setReadItems] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [filter, setFilter] = useState('todas'); // 'todas', 'no_leidas', 'leidas'

  const handleMarkAsRead = (id) => {
    setReadItems(prev => ({
      ...prev,
      [id]: true
    }));
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleMarkAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    const newReadItems = {};
    allIds.forEach(id => { newReadItems[id] = true; });
    setReadItems(newReadItems);
  };

  const notifications = [
    {
      id: 1,
      icon: 'water-outline',
      title: 'Riego',
      time: 'Hace 5 min',
      text: '¡Es hora de regar tu Tomate Roma!',
      unread: true,
      actions: true,
    },
    {
      id: 2,
      image: true,
      title: 'Consejos de Morita',
      time: '2h',
      text: 'Morita sugiere: El clima estará muy caluroso hoy, considera un riego extra.',
      unread: true,
    },
    {
      id: 3,
      icon: 'sprout-outline',
      title: 'Crecimiento',
      time: 'Ayer',
      text: '¡Nueva Etapa! Tu Albahaca ha pasado a Floración.',
      unread: false,
    },
    {
      id: 4,
      icon: 'tractor',
      title: 'Cosecha',
      time: 'Ayer',
      text: 'Cosecha próxima: Tu Zanahoria Nantes estará lista en 3 días.',
      unread: false,
    },
    {
      id: 5,
      icon: 'weather-partly-cloudy',
      title: 'Clima',
      time: 'Hace 1 día',
      text: 'Se esperan lluvias ligeras mañana, protege tus cultivos.',
      unread: false,
    },
  ];

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'no_leidas') return n.unread && !readItems[n.id];
    if (filter === 'leidas') return !n.unread || readItems[n.id];
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread && !readItems[n.id]).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Header premium */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onClose || (() => router.back())} style={styles.backButton}>
              <Feather name="arrow-left" size={22} color="#0a3a1a" />
            </TouchableOpacity>
            <View style={styles.logoWrapper}>
              <Image 
                source={logoImage}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.headerTitle}>Notificaciones</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={20} color="#0a3a1a" />
          </TouchableOpacity>
        </View>

        {/* Filtros */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'todas' && styles.filterChipActive]}
            onPress={() => setFilter('todas')}
          >
            <Text style={[styles.filterText, filter === 'todas' && styles.filterTextActive]}>
              Todas ({notifications.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'no_leidas' && styles.filterChipActive]}
            onPress={() => setFilter('no_leidas')}
          >
            <Text style={[styles.filterText, filter === 'no_leidas' && styles.filterTextActive]}>
              No leídas ({unreadCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'leidas' && styles.filterChipActive]}
            onPress={() => setFilter('leidas')}
          >
            <Text style={[styles.filterText, filter === 'leidas' && styles.filterTextActive]}>
              Leídas
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hoy</Text>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={handleMarkAllAsRead}>
                <Text style={styles.markAll}>Marcar todo como leído</Text>
              </TouchableOpacity>
            )}
          </View>

          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <Animated.View
                key={item.id}
                style={[
                  styles.cardWrapper,
                  {
                    transform: [{ 
                      scale: readItems[item.id] ? scaleAnim : 1 
                    }],
                    opacity: readItems[item.id] ? 0.6 : 1,
                  },
                ]}
              >
                <View style={styles.card}>
                  <View style={styles.iconColumn}>
                    {item.image ? (
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=200&q=80',
                        }}
                        style={styles.moritaImage}
                      />
                    ) : (
                      <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name={item.icon} size={22} color="#0d8a4e" />
                      </View>
                    )}
                  </View>

                  <View style={styles.cardContent}>
                    <View style={styles.cardTop}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>

                    {item.unread && !readItems[item.id] && (
                      <View style={styles.unreadDot} />
                    )}

                    <Text style={styles.cardText}>{item.text}</Text>

                    {item.actions && !readItems[item.id] && (
                      <View style={styles.actionsRow}>
                        <TouchableOpacity 
                          style={styles.doneButton}
                          onPress={() => handleMarkAsRead(item.id)}
                          activeOpacity={0.7}
                        >
                          <Text style={styles.doneText}>Hecho</Text>
                          <Feather name="check" size={14} color="#ffffff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.postponeButton} activeOpacity={0.7}>
                          <Text style={styles.postponeText}>Posponer</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {readItems[item.id] && (
                      <View style={styles.readBadge}>
                        <Feather name="check-circle" size={14} color="#0d8a4e" />
                        <Text style={styles.readText}>Leído</Text>
                      </View>
                    )}
                  </View>
                </View>
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Feather name="inbox" size={40} color="#c8d4c8" />
              </View>
              <Text style={styles.emptyText}>No hay notificaciones</Text>
              <Text style={styles.emptySubtext}>
                {filter === 'no_leidas' ? '¡Todas las notificaciones están leídas!' : 
                 filter === 'leidas' ? 'No hay notificaciones leídas' : 
                 'Pronto recibirás notificaciones importantes'}
              </Text>
            </View>
          )}

          <View style={styles.footerSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
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
  backButton: {
    padding: 4,
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
    width: 32,
    height: 24,
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
  // Filtros
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    borderColor: '#0d8a4e',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4a6a4e',
  },
  filterTextActive: {
    color: '#0d8a4e',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  markAll: {
    color: '#0d8a4e',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  cardWrapper: {
    marginTop: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
  },
  iconColumn: {
    width: 48,
    alignItems: 'center',
    paddingTop: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  moritaImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(13, 138, 78, 0.1)',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6a7a6e',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d71920',
  },
  cardText: {
    marginTop: 6,
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 20,
    fontWeight: '400',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d8a4e',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    gap: 6,
  },
  doneText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  postponeButton: {
    backgroundColor: '#f0f5f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  postponeText: {
    color: '#4a6a4e',
    fontWeight: '500',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  readBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  readText: {
    fontSize: 12,
    color: '#0d8a4e',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6a8a6e',
    fontWeight: '500',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#8a9a8e',
    fontWeight: '400',
    marginTop: 4,
  },
  footerSpacer: {
    height: 20,
  },
});