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

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function SeguimientoCultivoDetalleScreen({ onClose }) {
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
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

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#f5faf7" />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.backButton}>
                <Feather name="arrow-left" size={22} color="#0a3a1a" />
              </TouchableOpacity>
              <View style={styles.headerLogoContainer}>
                <Image 
                  source={logoImage}
                  style={styles.headerLogo}
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text style={styles.headerTitle}>Tomate Roma</Text>
            <View style={styles.headerRight}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
                }}
                style={styles.avatar}
              />
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={20} color="#0a3a1a" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Image */}
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroBadge}>
                <Feather name="calendar" size={12} color="#ffffff" />
                <Text style={styles.heroBadgeText}>Día 45</Text>
              </View>
            </View>
          </ImageBackground>

          {/* Status Card */}
          <View style={styles.statusCard}>
            <View>
              <Text style={styles.statusLabel}>Etapa Actual</Text>
              <Text style={styles.statusTitle}>Crecimiento{'\n'}Vegetativo</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressCircleText}>65%</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <InfoBox icon="calendar" label="Días desde siembra" value="45" />
            <InfoBox icon="ruler" label="Altura aprox" value="22cm" />
          </View>

          {/* Timeline */}
          <Text style={styles.timelineTitle}>Línea de Tiempo</Text>

          <View style={styles.timeline}>
            <TimelineStep checked label="Germinación" />
            <View style={styles.line} />
            <TimelineStep checked label="Plántula" />
            <View style={styles.line} />
            <TimelineStep active label="Crecimiento" />
            <View style={styles.lineInactive} />
            <TimelineStep locked label="Floración" />
          </View>

          {/* Tasks Card */}
          <View style={styles.tasksCard}>
            <View style={styles.tasksHeader}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={24}
                color="#0d8a4e"
              />
              <Text style={styles.tasksTitle}>Próximas Tareas</Text>
            </View>

            <View style={styles.taskRow}>
              <View style={styles.taskLeft}>
                <View style={styles.taskIconContainer}>
                  <MaterialCommunityIcons name="water-outline" size={18} color="#0d8a4e" />
                </View>
                <Text style={styles.taskTitle}>Riego hoy</Text>
              </View>
              <View style={styles.timeBadge}>
                <Text style={styles.timeBadgeText}>6:00 PM</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.taskRow}>
              <View style={styles.taskLeft}>
                <View style={[styles.taskIconContainer, styles.taskIconBrown]}>
                  <MaterialCommunityIcons name="fruit-cherries" size={18} color="#8a6535" />
                </View>
                <Text style={styles.taskTitle}>Abono</Text>
              </View>
              <Text style={styles.smallTime}>en 2 días</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Feather name="camera" size={18} color="#0d8a4e" />
              <Text style={styles.actionText}>Registrar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Feather name="file-plus" size={18} color="#0d8a4e" />
              <Text style={styles.actionText}>Agregar Nota</Text>
            </TouchableOpacity>
          </View>

          {/* Assistant Card */}
          <View style={styles.assistantCard}>
            <View style={styles.assistantIcon}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=200&q=80',
                }}
                style={styles.assistantImage}
              />
              <Text style={styles.assistantMini}>Morita</Text>
            </View>

            <View style={styles.assistantContent}>
              <Text style={styles.assistantTitle}>Asistente Morita</Text>
              <Text style={styles.assistantText}>
                "Morita recomienda: Es buen momento para revisar el drenaje del
                sustrato. Las lluvias de anoche pudieron saturar la maceta."
              </Text>
              <TouchableOpacity style={styles.assistantLink}>
                <Text style={styles.assistantLinkText}>Ver detalles técnicos</Text>
                <Feather name="arrow-right" size={12} color="#7ddfa0" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.navItem,
                selectedTab === tab.id && styles.navItemActive
              ]}
              onPress={() => setSelectedTab(tab.id)}
              activeOpacity={0.7}
            >
              <Feather 
                name={tab.icon} 
                size={20} 
                color={selectedTab === tab.id ? '#0d8a4e' : '#6a8a6e'} 
              />
              <Text style={[
                styles.navText,
                selectedTab === tab.id && styles.navTextActive
              ]}>
                {tab.label}
              </Text>
              {selectedTab === tab.id && (
                <View style={styles.navIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <View style={styles.infoBox}>
      <View style={styles.infoIconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color="#0d8a4e" />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function TimelineStep({ checked, active, locked, label }) {
  return (
    <View style={styles.timelineItem}>
      <View
        style={[
          styles.timelineCircle,
          checked && styles.timelineChecked,
          active && styles.timelineActive,
          locked && styles.timelineLocked,
        ]}
      >
        {checked && <Feather name="check" size={18} color="#ffffff" />}
        {active && <MaterialCommunityIcons name="leaf" size={20} color="#ffffff" />}
        {locked && <Feather name="lock" size={14} color="#8a9a8e" />}
      </View>
      <Text
        style={[
          styles.timelineLabel,
          active && styles.timelineLabelActive,
          locked && styles.timelineLabelLocked,
        ]}
      >
        {label}
      </Text>
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
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  headerLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
  },
  headerLogo: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(13, 138, 78, 0.1)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    height: 200,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(13, 138, 78, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  heroBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statusLabel: {
    color: '#4a6a4e',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statusTitle: {
    color: '#0a3a1a',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  progressCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 5,
    borderColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleText: {
    color: '#0d8a4e',
    fontSize: 14,
    fontWeight: '700',
  },
  statsRow: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 10,
    color: '#4a6a4e',
    fontWeight: '500',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  infoValue: {
    color: '#0a3a1a',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 2,
  },
  timelineTitle: {
    marginHorizontal: 20,
    marginTop: 24,
    color: '#4a6a4e',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  timeline: {
    marginHorizontal: 20,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineItem: {
    alignItems: 'center',
  },
  timelineCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timelineChecked: {
    backgroundColor: '#0d8a4e',
    borderColor: '#0d8a4e',
  },
  timelineActive: {
    backgroundColor: '#0d8a4e',
    borderColor: '#7ddfa0',
    borderWidth: 3,
  },
  timelineLocked: {
    backgroundColor: '#e8ede8',
    borderColor: '#d4ddd4',
  },
  timelineLabel: {
    marginTop: 6,
    color: '#6a7a6e',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  timelineLabelActive: {
    color: '#0a3a1a',
    fontWeight: '700',
  },
  timelineLabelLocked: {
    color: '#8a9a8e',
  },
  line: {
    width: 24,
    height: 2,
    backgroundColor: '#0d8a4e',
    marginTop: 20,
  },
  lineInactive: {
    width: 24,
    height: 2,
    backgroundColor: '#d4ddd4',
    marginTop: 20,
  },
  tasksCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginHorizontal: 20,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  tasksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  tasksTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  taskIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskIconBrown: {
    backgroundColor: 'rgba(138, 101, 53, 0.06)',
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0a3a1a',
  },
  timeBadge: {
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeBadgeText: {
    color: '#0d8a4e',
    fontSize: 11,
    fontWeight: '600',
  },
  smallTime: {
    color: '#4a6a4e',
    fontSize: 11,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    marginVertical: 8,
  },
  actionRow: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    gap: 6,
  },
  actionText: {
    color: '#0d8a4e',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  assistantCard: {
    backgroundColor: '#0d8a4e',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  assistantIcon: {
    alignItems: 'center',
    marginRight: 14,
  },
  assistantImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  assistantMini: {
    fontSize: 7,
    color: '#0a3a1a',
    marginTop: -16,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    paddingHorizontal: 4,
    fontWeight: '600',
  },
  assistantContent: {
    flex: 1,
  },
  assistantTitle: {
    color: '#7ddfa0',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  assistantText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  assistantLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
  },
  assistantLinkText: {
    color: '#7ddfa0',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 65,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
  },
  navText: {
    fontSize: 10,
    color: '#6a8a6e',
    fontWeight: '500',
    marginTop: 2,
  },
  navTextActive: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
  navIndicator: {
    position: 'absolute',
    top: -1,
    width: 16,
    height: 2.5,
    backgroundColor: '#0d8a4e',
    borderRadius: 2,
  },
});