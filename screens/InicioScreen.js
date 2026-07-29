import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function InicioScreen({ onClose }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedTab, setSelectedTab] = useState('home');
  const [likedCards, setLikedCards] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  const handleLike = (id) => {
    setLikedCards(prev => ({
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

  const handleLogoPress = () => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const ecoCards = [
    { id: 1, icon: 'sprout', title: 'Catálogo', subtitle: '640 Variedades', color: '#c9efc5' },
    { id: 2, icon: 'help-circle', title: 'Test', subtitle: 'Identifica', color: '#ffe1b7' },
    { id: 3, icon: 'map-marker', title: 'Ubicación', subtitle: 'Querétaro', color: '#b8e6b8' },
    { id: 4, icon: 'shopping', title: 'QroStore', subtitle: 'Ofertas', color: '#8fd48f' },
    { id: 5, icon: 'play', title: 'QroPlay', subtitle: 'Videos', color: '#a8dba8' },
    { id: 6, icon: 'calendar', title: 'Eventos', subtitle: 'Próximos', color: '#c9efc5' },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Siembra de Tomates',
      category: 'TEMPORADA',
      text: 'Ideal para el clima de esta semana en Querétaro.',
      image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      title: 'Cuida tu Albahaca',
      category: 'CUIDADO',
      text: 'Mantén humedad constante todo el año.',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 3,
      title: 'Cosecha de Zanahorias',
      category: 'TEMPORADA',
      text: 'Perfectas para ensaladas y jugos naturales.',
      image: 'https://images.unsplash.com/photo-1598170848812-5a3f1aeb0e12?auto=format&fit=crop&w=900&q=80',
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header con logo */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.logoContainer}
              onPress={handleLogoPress}
              activeOpacity={1}
            >
              <Animated.View style={{ transform: [{ scale: logoScale }] }}>
                <View style={styles.logoWrapper}>
                  <View style={styles.logoImageContainer}>
                    <Image 
                      source={logoImage}
                      style={styles.logoImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.logoTextContainer}>
                    <Text style={styles.logoTitle}>QroHuerto</Text>
                    <Text style={styles.logoSubtitle}>Tu huerto inteligente</Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.notificationButton}>
              <Feather name="bell" size={22} color="#0a3a1a" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Mensaje de bienvenida */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bienvenido de vuelta</Text>
            <Text style={styles.welcomeSubtext}>¿Qué deseas explorar hoy?</Text>
          </View>

          {/* Barra de búsqueda */}
          <View style={[
            styles.searchBox,
            searchFocused && styles.searchBoxFocused
          ]}>
            <Feather name="search" size={20} color="#6a8a6e" />
            <TextInput
              placeholder="Buscar plantas, guías o productos..."
              placeholderTextColor="#8a9a8e"
              style={styles.searchInput}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              returnKeyType="search"
            />
            {searchFocused && (
              <TouchableOpacity style={styles.searchClear}>
                <Feather name="x" size={16} color="#6a8a6e" />
              </TouchableOpacity>
            )}
          </View>

          {/* Banner principal */}
          <TouchableOpacity activeOpacity={0.9}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
              }}
              style={styles.banner}
              imageStyle={styles.bannerRadius}
            >
              <View style={styles.bannerOverlay}>
                <View style={styles.bannerTextBox}>
                  <Text style={styles.bannerTag}>TEMPORADA</Text>
                  <Text style={styles.bannerTitle}>Época de Siembra</Text>
                  <Text style={styles.bannerText}>
                    Descubre qué plantar en tu huerto esta temporada
                  </Text>

                  <View style={styles.bannerButton}>
                    <View style={styles.bannerButtonGradient}>
                      <Text style={styles.bannerButtonText}>Ver Guía</Text>
                      <Feather name="arrow-right" size={16} color="#0a3a1a" />
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* Sección de exploración */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explorar</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {ecoCards.map((card) => (
              <TouchableOpacity 
                key={card.id} 
                style={styles.ecoCardWrapper}
                activeOpacity={0.8}
              >
                <View style={styles.ecoCard}>
                  <View style={[styles.ecoIcon, { backgroundColor: card.color }]}>
                    <MaterialCommunityIcons name={card.icon} size={24} color="#0a3a1a" />
                  </View>
                  <View style={styles.ecoTextContainer}>
                    <Text style={styles.ecoTitle}>{card.title}</Text>
                    {card.subtitle && <Text style={styles.ecoSubtitle}>{card.subtitle}</Text>}
                  </View>
                  <Feather name="chevron-right" size={16} color="#8a9a8e" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recomendaciones */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recomendaciones</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recoScroll}
          >
            {recommendations.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.recoCardWrapper}
                activeOpacity={0.9}
              >
                <View style={styles.recoCard}>
                  <ImageBackground 
                    source={{ uri: item.image }} 
                    style={styles.recoImage} 
                    imageStyle={styles.recoImageRadius}
                  >
                    <TouchableOpacity 
                      style={styles.heartCircle}
                      onPress={() => handleLike(item.id)}
                      activeOpacity={0.7}
                    >
                      <Animated.View style={{ transform: [{ scale: likedCards[item.id] ? scaleAnim : 1 }] }}>
                        <Feather 
                          name="heart" 
                          size={18} 
                          color={likedCards[item.id] ? "#d71920" : "#ffffff"} 
                        />
                      </Animated.View>
                    </TouchableOpacity>
                    {likedCards[item.id] && (
                      <View style={styles.likedBadge}>
                        <Feather name="heart" size={10} color="#ffffff" />
                      </View>
                    )}
                  </ImageBackground>

                  <View style={styles.recoBody}>
                    <View style={styles.recoCategoryContainer}>
                      <View style={styles.recoCategoryDot} />
                      <Text style={styles.recoCategory}>{item.category}</Text>
                    </View>
                    <Text style={styles.recoTitle}>{item.title}</Text>
                    <Text style={styles.recoText}>{item.text}</Text>
                    <TouchableOpacity style={styles.recoButton}>
                      <Text style={styles.recoButtonText}>Leer más</Text>
                      <Feather name="arrow-right" size={14} color="#0d8a4e" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.footerSpacer} />
        </ScrollView>

        {/* Navegación inferior */}
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
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flex: 1,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImageContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  logoTextContainer: {
    marginLeft: 12,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  logoSubtitle: {
    fontSize: 11,
    color: '#4a7a5e',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#d71920',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f5faf7',
  },
  notificationText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
  },
  welcomeContainer: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: '#4a7a5e',
    fontWeight: '400',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  searchBox: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchBoxFocused: {
    borderWidth: 2,
    borderColor: '#0d8a4e',
    shadowOpacity: 0.08,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#0a2a1a',
  },
  searchClear: {
    padding: 4,
  },
  banner: {
    height: 190,
    marginBottom: 28,
    overflow: 'hidden',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  bannerRadius: {
    borderRadius: 14,
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.88)',
  },
  bannerTextBox: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  bannerTag: {
    color: '#7ddfa0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 34,
    letterSpacing: 0.5,
  },
  bannerText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
  bannerButton: {
    marginTop: 14,
    alignSelf: 'flex-start',
  },
  bannerButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#7ddfa0',
    gap: 8,
  },
  bannerButtonText: {
    color: '#0a3a1a',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  seeAll: {
    color: '#0d8a4e',
    fontWeight: '600',
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ecoCardWrapper: {
    width: '48%',
    marginBottom: 12,
  },
  ecoCard: {
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  ecoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ecoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ecoTitle: {
    fontSize: 17,
    color: '#0a3a1a',
    fontWeight: '600',
  },
  ecoSubtitle: {
    fontSize: 11,
    color: '#4a6a4a',
    fontWeight: '500',
    marginTop: 2,
  },
  recoScroll: {
    paddingVertical: 4,
    paddingRight: 4,
  },
  recoCardWrapper: {
    marginRight: 16,
  },
  recoCard: {
    width: 270,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  recoImage: {
    height: 120,
  },
  recoImageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  heartCircle: {
    position: 'absolute',
    right: 12,
    top: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  likedBadge: {
    position: 'absolute',
    left: 12,
    top: 10,
    backgroundColor: 'rgba(215, 25, 32, 0.85)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  recoBody: {
    padding: 14,
  },
  recoCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recoCategoryDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#0d8a4e',
    marginRight: 6,
  },
  recoCategory: {
    color: '#0d8a4e',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  recoTitle: {
    color: '#0a3a1a',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 2,
  },
  recoText: {
    marginTop: 4,
    color: '#6a7a6e',
    fontSize: 13,
    lineHeight: 18,
  },
  recoButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recoButtonText: {
    color: '#0d8a4e',
    fontWeight: '600',
    fontSize: 12,
  },
  footerSpacer: {
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