import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function QroPlayScreen() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const categories = ['Todo', 'Compostaje', 'Plagas', 'Riego', 'Suelo', 'Siembra'];

  const videos = [
    { 
      id: 1, 
      title: 'Secretos del Suelo: Preparación Vital', 
      channel: 'SIEMARA', 
      time: '2 días', 
      duration: '12:45', 
      category: 'Suelo', 
      description: 'Aprende a nutrir tu tierra desde cero utilizando solo componentes...' 
    },
    { 
      id: 2, 
      title: 'Riego por Goteo: Eficiencia Máxima', 
      channel: 'RIEGO PRO', 
      time: '1 semana', 
      duration: '08:20', 
      category: 'Riego', 
      description: 'Diseña e instala un sistema de riego automatizado que ahorra hasta un...' 
    },
    { 
      id: 3, 
      title: 'Compostaje de Oro Negro', 
      channel: 'COMPOST LIFE', 
      time: '3 días', 
      duration: '15:30', 
      category: 'Compostaje', 
      description: 'Guía definitiva para transformar tus desechos de cocina en el abono más...' 
    },
  ];

  const filteredVideos = videos.filter(video => {
    const matchCategory = activeCategory === 'Todo' || video.category === activeCategory;
    const matchSearch = video.title.toLowerCase().includes(searchText.toLowerCase()) ||
                       video.description.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

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
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
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
            <Text style={styles.headerTitle}>QroPlay</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={20} color="#0a3a1a" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Catálogo de Videos</Text>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#6a8a6e" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar tutoriales o consejos..." 
            placeholderTextColor="#8a9a8e"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Feather name="x" size={16} color="#6a8a6e" />
            </TouchableOpacity>
          )}
        </View>

        {/* Categorías */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity 
              key={category} 
              style={[
                styles.categoryFilter, 
                activeCategory === category && styles.categoryFilterActive
              ]} 
              onPress={() => setActiveCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.categoryFilterText, 
                activeCategory === category && styles.categoryFilterTextActive
              ]}>
                {category}
              </Text>
              {activeCategory === category && (
                <View style={styles.categoryIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de videos */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {filteredVideos.length > 0 ? (
            <View style={styles.videoList}>
              {filteredVideos.map((video) => (
                <Animated.View 
                  key={video.id} 
                  style={[
                    styles.videoCardWrapper,
                    { transform: [{ scale: scaleAnim }] }
                  ]}
                >
                  <TouchableOpacity 
                    style={styles.videoCard}
                    activeOpacity={0.8}
                    onPress={handlePress}
                  >
                    <View style={styles.videoThumbnail}>
                      <View style={styles.playButton}>
                        <Feather name="play" size={28} color="#ffffff" />
                      </View>
                      <View style={styles.durationBadge}>
                        <Text style={styles.durationText}>{video.duration}</Text>
                      </View>
                    </View>
                    <View style={styles.videoContent}>
                      <View style={styles.videoHeader}>
                        <View style={styles.channelBadge}>
                          <Text style={styles.channelBadgeText}>{video.category}</Text>
                        </View>
                        <Text style={styles.channelName}>{video.channel}</Text>
                        <Text style={styles.videoTime}>Hace {video.time}</Text>
                      </View>
                      <Text style={styles.videoTitle}>{video.title}</Text>
                      <Text style={styles.videoDescription} numberOfLines={2}>
                        {video.description}
                      </Text>
                      <TouchableOpacity style={styles.watchBtn} activeOpacity={0.7}>
                        <Text style={styles.watchBtnText}>Ver video</Text>
                        <Feather name="arrow-right" size={14} color="#0d8a4e" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Feather name="video-off" size={40} color="#c8d4c8" />
              </View>
              <Text style={styles.emptyText}>No se encontraron videos</Text>
              <Text style={styles.emptySubtext}>Prueba con otra categoría o búsqueda</Text>
            </View>
          )}

          {filteredVideos.length > 0 && (
            <TouchableOpacity style={styles.loadMoreBtn} activeOpacity={0.7}>
              <Text style={styles.loadMoreText}>Cargar más videos</Text>
              <Feather name="chevron-down" size={16} color="#0d8a4e" />
            </TouchableOpacity>
          )}
          
          <View style={styles.bottomSpacer} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 22,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  notificationButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#d71920',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  notificationText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4a6a4e',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    letterSpacing: 0.2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#0a3a1a',
    paddingVertical: 10,
  },
  categoriesContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 2,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    position: 'relative',
  },
  categoryFilterActive: {
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    borderColor: '#0d8a4e',
  },
  categoryFilterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4a6a4e',
    letterSpacing: 0.2,
  },
  categoryFilterTextActive: {
    color: '#0d8a4e',
    fontWeight: '600',
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '30%',
    width: '40%',
    height: 2,
    backgroundColor: '#0d8a4e',
    borderRadius: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  videoList: {
    marginBottom: 8,
  },
  videoCardWrapper: {
    marginBottom: 14,
  },
  videoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  videoThumbnail: {
    height: 160,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(13, 138, 78, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  videoContent: {
    padding: 14,
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
    gap: 4,
  },
  channelBadge: {
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  channelBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#0d8a4e',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  channelName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0a3a1a',
  },
  videoTime: {
    fontSize: 10,
    color: '#6a8a6e',
    fontWeight: '400',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  videoDescription: {
    fontSize: 13,
    color: '#4a6a4e',
    marginBottom: 10,
    lineHeight: 18,
    fontWeight: '400',
  },
  watchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
  },
  watchBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0d8a4e',
    letterSpacing: 0.2,
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
  loadMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(13, 138, 78, 0.06)',
    marginTop: 4,
    gap: 6,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d8a4e',
    letterSpacing: 0.2,
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