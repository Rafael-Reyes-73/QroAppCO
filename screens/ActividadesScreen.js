import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function ActividadesScreen({ onClose }) {
  const [activeTab, setActiveTab] = useState('Pendientes');
  const [selectedTab, setSelectedTab] = useState('home');
  const [completedTasks, setCompletedTasks] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleComplete = (id) => {
    setCompletedTasks(prev => ({
      ...prev,
      [id]: !prev[id]
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

  const tasks = [
    {
      id: 1,
      color: '#0d8a4e',
      iconBg: '#c8f0d0',
      icon: 'water-outline',
      title: 'Riego regular',
      date: 'HOY, 6:00 PM',
      description: 'Asegurar humedad profunda para las raíces.',
      plant: 'Tomate Roma',
    },
    {
      id: 2,
      color: '#8a6535',
      iconBg: '#ffe0b1',
      icon: 'content-cut',
      title: 'Poda de mantenimiento',
      date: 'Mañana, 8:00 AM',
      description: 'Eliminar chupones laterales para mejorar el flujo de aire.',
      plant: 'Albahaca Genovesa',
    },
    {
      id: 3,
      color: '#0d8a4e',
      iconBg: '#baf0ad',
      icon: 'recycle',
      title: 'Fertilización orgánica',
      date: '22 May, 10:00 AM',
      description: 'Aplicar humus de lombriz en la base.',
      plant: 'Calabacín',
    },
  ];

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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogoContainer}>
              <Image 
                source={logoImage}
                style={styles.headerLogo}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.headerTitle}>Actividades</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="rotate-ccw" size={20} color="#0a3a1a" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#0a3a1a" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Crecimiento Activo</Text>
              <Text style={styles.bannerText}>Tienes {tasks.length} tareas pendientes</Text>
            </View>
            <View style={styles.bannerIconContainer}>
              <MaterialCommunityIcons name="sprout" size={48} color="#7ddfa0" />
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {['Pendientes', 'Completadas'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.tabActive,
                ]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Search */}
          <View style={styles.searchBox}>
            <Feather name="search" size={20} color="#6a8a6e" />
            <TextInput
              style={styles.searchInput}
              placeholder="Filtrar por cultivo..."
              placeholderTextColor="#8a9a8e"
              returnKeyType="search"
            />
          </View>

          {/* Tasks */}
          {tasks.map((task) => (
            <Animated.View
              key={task.id}
              style={[
                styles.cardWrapper,
                {
                  transform: [{ 
                    scale: completedTasks[task.id] ? scaleAnim : 1 
                  }],
                },
              ]}
            >
              <View style={[styles.card, { borderLeftColor: task.color }]}>
                <View style={styles.cardContent}>
                  <View style={[styles.iconBox, { backgroundColor: task.iconBg }]}>
                    <MaterialCommunityIcons name={task.icon} size={24} color="#0a3a1a" />
                  </View>

                  <View style={styles.cardInfo}>
                    <View style={styles.cardTop}>
                      <Text style={styles.cardTitle}>{task.title}</Text>
                      <Text style={styles.cardDate}>{task.date}</Text>
                    </View>

                    <Text style={styles.cardDescription}>{task.description}</Text>

                    <View style={styles.plantRow}>
                      <Feather name="package" size={14} color="#8a9a8e" />
                      <Text style={styles.plantText}>{task.plant}</Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.completeButton,
                        completedTasks[task.id] && styles.completeButtonCompleted,
                      ]}
                      onPress={() => handleComplete(task.id)}
                      activeOpacity={0.7}
                    >
                      {completedTasks[task.id] ? (
                        <Feather name="check-circle" size={18} color="#0d8a4e" />
                      ) : (
                        <Feather name="circle" size={18} color="#8a9a8e" />
                      )}
                      <Text style={[
                        styles.completeButtonText,
                        completedTasks[task.id] && styles.completeButtonTextCompleted,
                      ]}>
                        {completedTasks[task.id] ? 'Completada' : 'Marcar como completada'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Animated.View>
          ))}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5faf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5faf7',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    padding: 4,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0d8a4e',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  bannerText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  bannerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#0d8a4e',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a6a4e',
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0a3a1a',
    paddingVertical: 10,
  },
  cardWrapper: {
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  cardDate: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6a8a6e',
    letterSpacing: 0.3,
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: '#4a6a4e',
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 4,
  },
  plantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  plantText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8a9a8e',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    alignSelf: 'flex-start',
  },
  completeButtonCompleted: {
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
  },
  completeButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4a6a4e',
  },
  completeButtonTextCompleted: {
    color: '#0d8a4e',
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