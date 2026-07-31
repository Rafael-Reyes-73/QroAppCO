import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function MisHuertosScreen({ onClose }) {
  const [selectedTab, setSelectedTab] = useState('catalog');
  const [likedGardens, setLikedGardens] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = (id) => {
    setLikedGardens(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const gardens = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
      tag: 'En Proceso',
      title: 'Tomate Roma',
      cycle: 'Ciclo: 75 d',
      planted: 'Sembrado el 15 de Oct',
      phase: 'Crecimiento Vegetativo',
      progress: '65%',
      width: '65%',
      taskIcon: 'water-outline',
      task: 'Riego Próximo',
      taskTime: 'Hoy, 6:00 PM',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
      tag: 'Floración',
      title: 'Brócoli',
      cycle: 'Ciclo: 40 d',
      planted: 'Sembrado el 28 de Oct',
      phase: 'Floración Temprana',
      progress: '82%',
      width: '82%',
      taskIcon: 'content-cut',
      task: 'Poda Necesaria',
      taskTime: 'Mañana, 8:00 AM',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80',
      tag: 'Germinación',
      title: 'Zanahoria Nantes',
      cycle: 'Ciclo: 90 d',
      planted: 'Sembrado el 05 de Nov',
      phase: 'Germinación',
      progress: '15%',
      width: '15%',
      taskIcon: 'flask-outline',
      task: 'Nutrientes',
      taskTime: 'En 3 días',
      brown: true,
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
            <Text style={styles.headerTitle}>Mis Huertos</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={20} color="#0a3a1a" />
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
          <Text style={styles.title}>Mis Huertos</Text>

          <View style={styles.activeRow}>
            <View style={styles.dot} />
            <Text style={styles.activeText}>12 Cultivos Activos</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.newButton}>
            <Feather name="plus" size={18} color="#ffffff" />
            <Text style={styles.newButtonText}>Nuevo Cultivo</Text>
          </TouchableOpacity>

          {gardens.map((garden) => (
            <View key={garden.id} style={styles.cardWrapper}>
              <View style={styles.card}>
                <ImageBackground 
                  source={{ uri: garden.image }} 
                  style={styles.cardImage} 
                  imageStyle={styles.cardImageRadius}
                >
                  <View style={styles.imageOverlay} />

                  <View style={[styles.tag, garden.brown && styles.tagBrown]}>
                    <Text style={styles.tagText}>{garden.tag}</Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.heartCircle}
                    onPress={() => handleLike(garden.id)}
                    activeOpacity={0.7}
                  >
                    <Animated.View style={{ transform: [{ scale: likedGardens[garden.id] ? scaleAnim : 1 }] }}>
                      <Feather 
                        name="heart" 
                        size={20} 
                        color={likedGardens[garden.id] ? "#d71920" : "#0a3a1a"} 
                      />
                    </Animated.View>
                  </TouchableOpacity>
                </ImageBackground>

                <View style={styles.cardBody}>
                  <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{garden.title}</Text>
                    <Text style={styles.cycleText}>{garden.cycle}</Text>
                  </View>

                  <Text style={styles.planted}>{garden.planted}</Text>

                  <View style={styles.progressHeader}>
                    <Text style={styles.phase}>{garden.phase}</Text>
                    <Text style={styles.progressNumber}>{garden.progress}</Text>
                  </View>

                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: garden.width }]} />
                  </View>

                  <View style={styles.taskBox}>
                    <View style={styles.taskIconBox}>
                      <MaterialCommunityIcons name={garden.taskIcon} size={20} color="#0a3a1a" />
                    </View>

                    <View style={styles.taskInfo}>
                      <Text style={styles.taskLabel}>{garden.task}</Text>
                      <Text style={styles.taskTime}>{garden.taskTime}</Text>
                    </View>
                  </View>

                  <TouchableOpacity activeOpacity={0.8} style={styles.followButton}>
                    <Text style={styles.followText}>Ver Seguimiento</Text>
                    <Feather name="arrow-right" size={14} color="#0d8a4e" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Botón Cámara */}
        <TouchableOpacity activeOpacity={0.8} style={styles.cameraButton}>
          <Feather name="camera" size={24} color="#ffffff" />
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  activeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0d8a4e',
    marginRight: 8,
  },
  activeText: {
    color: '#4a6a4e',
    fontSize: 14,
    fontWeight: '500',
  },
  newButton: {
    height: 44,
    backgroundColor: '#0d8a4e',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  newButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    height: 180,
  },
  cardImageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  tag: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: 'rgba(13, 138, 78, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  tagBrown: {
    backgroundColor: 'rgba(139, 90, 43, 0.9)',
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heartCircle: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBody: {
    padding: 18,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    flex: 1,
    fontSize: 20,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cycleText: {
    color: '#4a6a4e',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  planted: {
    color: '#6a7a6e',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  progressHeader: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phase: {
    color: '#0a3a1a',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  progressNumber: {
    color: '#4a6a4e',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e8ede8',
    marginTop: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#0d8a4e',
  },
  taskBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f5f2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 16,
    gap: 12,
  },
  taskIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskLabel: {
    fontSize: 11,
    color: '#4a6a4e',
    fontWeight: '500',
  },
  taskTime: {
    fontSize: 14,
    color: '#0a3a1a',
    fontWeight: '600',
    marginTop: 1,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.2)',
    marginTop: 16,
    gap: 6,
  },
  followText: {
    color: '#0d8a4e',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  cameraButton: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
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