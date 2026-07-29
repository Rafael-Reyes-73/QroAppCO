import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePlayPress = () => {
    setIsPlaying(!isPlaying);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
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

  const relatedVideos = [
    { id: 1, title: 'Riego por Goteo: Guía de Instalación', duration: '08:20', views: '12K vistas' },
    { id: 2, title: 'Composta en Casa: Cero Desperdicios', duration: '10:15', views: '8.5K vistas' },
    { id: 3, title: 'Siembra de Tomates: Guía Completa', duration: '15:30', views: '6.2K vistas' },
  ];

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0a2a1a" barStyle="light-content" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton}>
              <Feather name="arrow-left" size={22} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.headerLogoContainer}>
              <Image 
                source={logoImage}
                style={styles.headerLogo}
                resizeMode="cover"
              />
            </View>
          </View>
          <Text style={styles.headerTitle}>Reproduciendo</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Feather name="more-vertical" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Player */}
          <View style={styles.playerContainer}>
            <View style={styles.videoThumbnail}>
              <View style={styles.playIconContainer}>
                <Feather name="play" size={48} color="#ffffff" />
              </View>
              <View style={styles.videoTimeBadge}>
                <Text style={styles.videoTimeBadgeText}>04:20 / 12:45</Text>
              </View>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '35%' }]} />
              </View>
              <View style={styles.progressTime}>
                <Text style={styles.progressTimeText}>04:20</Text>
                <Text style={styles.progressTimeText}>12:45</Text>
              </View>
            </View>

            <View style={styles.controlsContainer}>
              <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
                <Feather name="rewind" size={20} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.playBtn} 
                onPress={handlePlayPress}
                activeOpacity={0.7}
              >
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <Feather 
                    name={isPlaying ? "pause" : "play"} 
                    size={24} 
                    color="#ffffff" 
                  />
                </Animated.View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
                <Feather name="fast-forward" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.volumeContainer}>
              <Feather name="volume-2" size={16} color="rgba(255,255,255,0.5)" />
              <View style={styles.volumeBar}>
                <View style={[styles.volumeFill, { width: '60%' }]} />
              </View>
            </View>
          </View>

          {/* Info del video */}
          <Text style={styles.videoTitle}>Técnicas de Poda para Tomates</Text>
          <Text style={styles.videoDescription}>
            Aprende los fundamentos de la poda selectiva para maximizar el rendimiento de tu cosecha.
          </Text>

          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Feather name="leaf" size={12} color="#0d8a4e" />
              <Text style={styles.tagText}>Orgánico</Text>
            </View>
            <View style={styles.tag}>
              <Feather name="clock" size={12} color="#0d8a4e" />
              <Text style={styles.tagText}>12 min</Text>
            </View>
            <View style={styles.tag}>
              <Feather name="bar-chart-2" size={12} color="#0d8a4e" />
              <Text style={styles.tagText}>Nivel Medio</Text>
            </View>
          </View>

          {/* Videos Relacionados */}
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>Videos Relacionados</Text>
            
            {relatedVideos.map((video) => (
              <TouchableOpacity 
                key={video.id} 
                style={styles.relatedItem}
                activeOpacity={0.7}
              >
                <View style={styles.relatedThumbnail}>
                  <View style={styles.relatedPlayIcon}>
                    <Feather name="play" size={16} color="#ffffff" />
                  </View>
                  <View style={styles.relatedDuration}>
                    <Text style={styles.relatedDurationText}>{video.duration}</Text>
                  </View>
                </View>
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedName} numberOfLines={2}>
                    {video.title}
                  </Text>
                  <View style={styles.relatedMetaContainer}>
                    <Feather name="eye" size={10} color="#6a8a6e" />
                    <Text style={styles.relatedMeta}>{video.views}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSpacer} />
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
    backgroundColor: '#0a2a1a',
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
    backgroundColor: '#0a2a1a',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerLogo: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  moreButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  playerContainer: {
    backgroundColor: '#0a2a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  videoThumbnail: {
    height: 200,
    backgroundColor: 'rgba(13, 138, 78, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  videoTimeBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  videoTimeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    marginTop: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: '#7ddfa0',
    borderRadius: 2,
  },
  progressTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressTimeText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    fontWeight: '400',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    marginTop: 14,
  },
  controlButton: {
    padding: 4,
  },
  playBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(125, 223, 160, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(125, 223, 160, 0.3)',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 4,
    gap: 10,
  },
  volumeBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  volumeFill: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  videoDescription: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 20,
    marginBottom: 12,
    fontWeight: '400',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#0d8a4e',
    letterSpacing: 0.2,
  },
  relatedSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  relatedTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  relatedItem: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 138, 78, 0.04)',
  },
  relatedItemLast: {
    borderBottomWidth: 0,
  },
  relatedThumbnail: {
    width: 80,
    height: 50,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  relatedPlayIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(13, 138, 78, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedDuration: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  relatedDurationText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '500',
  },
  relatedInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  relatedName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0a3a1a',
    lineHeight: 18,
    marginBottom: 2,
  },
  relatedMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  relatedMeta: {
    fontSize: 10,
    color: '#6a8a6e',
    fontWeight: '400',
  },
  bottomSpacer: {
    height: 20,
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