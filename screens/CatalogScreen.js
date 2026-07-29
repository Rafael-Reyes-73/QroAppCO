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

// ============================================
// COMPONENTE CARD DE VIDEO/TUTORIAL
// ============================================
const VideoCard = ({ category, date, title, description, onPress }) => {
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
    onPress();
  };

  return (
    <Animated.View style={[styles.videoCardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity style={styles.videoCard} onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.videoHeader}>
          <View style={styles.categoryBadge}>
            <Feather name="play" size={10} color="#0d8a4e" />
            <Text style={styles.categoryBadgeText}>{category}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Feather name="clock" size={12} color="#8a9a8e" />
            <Text style={styles.videoDate}>{date}</Text>
          </View>
        </View>
        <Text style={styles.videoTitle}>{title}</Text>
        <Text style={styles.videoDescription}>{description}</Text>
        <View style={styles.videoFooter}>
          <View style={styles.playButton}>
            <Feather name="play-circle" size={16} color="#0d8a4e" />
            <Text style={styles.playText}>Ver tutorial</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================
// PANTALLA PRINCIPAL
// ============================================
export default function QroPlayScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('catalog');

  const categories = ['Todo', 'Compostaje', 'Plagas', 'Riego', 'Suelo', 'Siembra'];

  const videos = [
    { 
      id: 1, 
      category: 'SUELO', 
      date: 'Hace 2 días', 
      title: 'Secretos del Suelo: Preparación Vital', 
      description: 'Aprende a nutrir tu tierra desde cero utilizando solo componentes naturales.',
      categoryFilter: 'Suelo'
    },
    { 
      id: 2, 
      category: 'RIEGO', 
      date: 'Hace 4 días', 
      title: 'Sistemas de Riego Eficientes', 
      description: 'Descubre cómo ahorrar agua y mantener tus plantas hidratadas.',
      categoryFilter: 'Riego'
    },
    { 
      id: 3, 
      category: 'COMPOSTAJE', 
      date: 'Hace 1 semana', 
      title: 'Compostaje en Casa: Guía Práctica', 
      description: 'Transforma tus residuos orgánicos en abono de alta calidad.',
      categoryFilter: 'Compostaje'
    },
    { 
      id: 4, 
      category: 'PLAGAS', 
      date: 'Hace 2 semanas', 
      title: 'Control Natural de Plagas', 
      description: 'Métodos orgánicos para proteger tus cultivos sin químicos.',
      categoryFilter: 'Plagas'
    },
  ];

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  const filteredVideos = videos.filter(video => {
    const matchCategory = selectedCategory === 'Todo' || video.categoryFilter === selectedCategory;
    const matchSearch = video.title.toLowerCase().includes(searchText.toLowerCase()) ||
                       video.description.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

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
              <Text style={styles.notificationText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Tutoriales y Consejos</Text>

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

        {/* Filtros por categoría */}
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
                selectedCategory === category && styles.categoryFilterActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryFilterText,
                  selectedCategory === category && styles.categoryFilterTextActive,
                ]}
              >
                {category}
              </Text>
              {selectedCategory === category && (
                <View style={styles.categoryIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lista de videos */}
        <ScrollView 
          style={styles.videoList} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.videoListContent}
        >
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                category={video.category}
                date={video.date}
                title={video.title}
                description={video.description}
                onPress={() => alert(`Ver video: ${video.title}`)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Feather name="video-off" size={40} color="#c8d4c8" />
              </View>
              <Text style={styles.emptyText}>No se encontraron videos</Text>
              <Text style={styles.emptySubtext}>Prueba con otra categoría o búsqueda</Text>
            </View>
          )}
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

// ============================================
// ESTILOS
// ============================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5faf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5faf7',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
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
    borderColor: '#f5faf7',
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
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginBottom: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0a3a1a',
    paddingVertical: 10,
    fontWeight: '400',
  },
  categoriesContainer: {
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
  videoList: {
    flex: 1,
  },
  videoListContent: {
    paddingBottom: 100,
  },
  videoCardWrapper: {
    marginBottom: 12,
  },
  videoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0d8a4e',
    letterSpacing: 0.5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoDate: {
    fontSize: 11,
    color: '#8a9a8e',
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
    lineHeight: 20,
    fontWeight: '400',
  },
  videoFooter: {
    marginTop: 12,
    flexDirection: 'row',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playText: {
    fontSize: 12,
    color: '#0d8a4e',
    fontWeight: '500',
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