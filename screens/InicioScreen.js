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
  StatusBar,
  Alert,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function InicioScreen({ router }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [likedCards, setLikedCards] = useState({});
  const [activeTab, setActiveTab] = useState('explorar');
  const [unreadCount, setUnreadCount] = useState(3);
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

  const handleCardPress = (cardTitle) => {
    console.log('Navegando a:', cardTitle);
    switch(cardTitle) {
      case 'Catalogo':
        router.push('/(tabs)/catalogo');
        break;
      case 'Test':
        router.push('/(tabs)/test');
        break;
      case 'QroStore':
        router.push('/(tabs)/qrostore');
        break;
      case 'QroPlay':
        router.push('/(tabs)/qroplay');
        break;
      case 'Ubicacion':
        router.push('/ubicacion');
        break;
      case 'Eventos':
        Alert.alert('Eventos', 'Funcion de eventos proximamente disponible');
        break;
      default:
        Alert.alert('Funcion', 'Proximamente disponible');
    }
  };

  const ecoCards = [
    { id: 1, icon: 'sprout', title: 'Catalogo', subtitle: '640 Variedades', color: ['#e8f5e9', '#c8e6c9'] },
    { id: 2, icon: 'help-circle', title: 'Test', subtitle: 'Identifica', color: ['#fff3e0', '#ffe0b2'] },
    { id: 3, icon: 'map-marker', title: 'Ubicacion', subtitle: 'Queretaro', color: ['#e0f2f1', '#b2dfdb'] },
    { id: 4, icon: 'shopping', title: 'QroStore', subtitle: 'Ofertas', color: ['#e8f5e9', '#a5d6a7'] },
    { id: 5, icon: 'play', title: 'QroPlay', subtitle: 'Videos', color: ['#f3e5f5', '#e1bee7'] },
    { id: 6, icon: 'calendar', title: 'Eventos', subtitle: 'Proximos', color: ['#e8f5e9', '#c8e6c9'] },
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Siembra de Tomates',
      category: 'TEMPORADA',
      text: 'Ideal para el clima de esta semana en Queretaro.',
      image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 2,
      title: 'Cuida tu Albahaca',
      category: 'CUIDADO',
      text: 'Manten humedad constante todo el ano.',
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header premium con navegación a notificaciones */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.logoContainer}
              onPress={handleLogoPress}
              activeOpacity={1}
            >
              <Animated.View style={{ transform: [{ scale: logoScale }] }}>
                <View style={styles.logoWrapper}>
                  <Image 
                    source={logoImage}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/notificaciones')}
            >
              <Feather name="bell" size={20} color="#0a3a1a" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{unreadCount}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Bienvenida premium */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hola, agricultor</Text>
            <Text style={styles.welcomeSubtext}>¿Que deseas cultivar hoy?</Text>
          </View>

          {/* Search bar premium */}
          <View style={[
            styles.searchBox,
            searchFocused && styles.searchBoxFocused
          ]}>
            <Feather name="search" size={18} color="#6a8a6e" />
            <TextInput
              placeholder="Buscar plantas, guias o productos..."
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

          {/* Banner premium con gradiente */}
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={['#0d8a4e', '#0a7a3e']}
              style={styles.banner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.bannerContent}>
                <View style={styles.bannerTagContainer}>
                  <View style={styles.bannerTagDot} />
                  <Text style={styles.bannerTag}>TEMPORADA</Text>
                </View>
                <Text style={styles.bannerTitle}>Epoca de Siembra</Text>
                <Text style={styles.bannerText}>
                  Descubre que plantar en tu huerto esta temporada
                </Text>
                <View style={styles.bannerButton}>
                  <View style={styles.bannerButtonInner}>
                    <Text style={styles.bannerButtonText}>Ver Guia</Text>
                    <Feather name="arrow-right" size={16} color="#0a3a1a" />
                  </View>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sección de exploración premium */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.sectionIconLine} />
              <Text style={styles.sectionTitle}>Explorar</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {ecoCards.map((card) => (
              <TouchableOpacity 
                key={card.id} 
                style={styles.ecoCardWrapper}
                activeOpacity={0.85}
                onPress={() => handleCardPress(card.title)}
              >
                <LinearGradient
                  colors={card.color}
                  style={styles.ecoCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.ecoIconContainer}>
                    <MaterialCommunityIcons name={card.icon} size={24} color="#0a3a1a" />
                  </View>
                  <View style={styles.ecoTextContainer}>
                    <Text style={styles.ecoTitle}>{card.title}</Text>
                    <Text style={styles.ecoSubtitle}>{card.subtitle}</Text>
                  </View>
                  <View style={styles.ecoArrow}>
                    <Feather name="chevron-right" size={16} color="#4a6a4e" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recomendaciones premium */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.sectionIconLine} />
              <Text style={styles.sectionTitle}>Recomendaciones</Text>
            </View>
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
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.3)']}
                      style={styles.recoImageOverlay}
                    />
                    <TouchableOpacity 
                      style={styles.heartCircle}
                      onPress={() => handleLike(item.id)}
                      activeOpacity={0.7}
                    >
                      <Animated.View style={{ transform: [{ scale: likedCards[item.id] ? scaleAnim : 1 }] }}>
                        <Feather 
                          name="heart" 
                          size={16} 
                          color={likedCards[item.id] ? "#d71920" : "#ffffff"} 
                        />
                      </Animated.View>
                    </TouchableOpacity>
                    <View style={styles.recoCategoryBadge}>
                      <Text style={styles.recoCategoryBadgeText}>{item.category}</Text>
                    </View>
                  </ImageBackground>

                  <View style={styles.recoBody}>
                    <Text style={styles.recoTitle}>{item.title}</Text>
                    <Text style={styles.recoText}>{item.text}</Text>
                    <TouchableOpacity style={styles.recoButton}>
                      <Text style={styles.recoButtonText}>Leer mas</Text>
                      <Feather name="arrow-right" size={14} color="#0d8a4e" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 8 : 12,
    paddingBottom: 10,
  },
  // Header premium
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
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 80,
    height: 28,
    borderRadius: 4,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#d71920',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  notificationText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
  },
  // Bienvenida premium
  welcomeContainer: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    color: '#0a3a1a',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: '#4a7a5e',
    fontWeight: '400',
    marginTop: 2,
    letterSpacing: 0.2,
  },
  // Search bar premium
  searchBox: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
  },
  searchBoxFocused: {
    borderWidth: 2,
    borderColor: '#0d8a4e',
    shadowColor: '#0d8a4e',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#0a2a1a',
    paddingVertical: 8,
    fontWeight: '500',
  },
  searchClear: {
    padding: 4,
  },
  // Banner premium
  banner: {
    height: 170,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  bannerTagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7ddfa0',
  },
  bannerTag: {
    color: '#7ddfa0',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  bannerText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  bannerButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  bannerButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#7ddfa0',
    gap: 8,
  },
  bannerButtonText: {
    color: '#0a3a1a',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  // Secciones
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionIconLine: {
    width: 3,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#0d8a4e',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  seeAll: {
    color: '#0d8a4e',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  // Grid premium
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
    height: 110,
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  ecoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ecoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ecoTitle: {
    fontSize: 15,
    color: '#0a3a1a',
    fontWeight: '700',
  },
  ecoSubtitle: {
    fontSize: 10,
    color: '#4a6a4a',
    fontWeight: '500',
    marginTop: 1,
  },
  ecoArrow: {
    alignSelf: 'flex-end',
    opacity: 0.4,
  },
  // Recomendaciones premium
  recoScroll: {
    paddingVertical: 4,
    paddingRight: 4,
  },
  recoCardWrapper: {
    marginRight: 14,
  },
  recoCard: {
    width: 260,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  recoImage: {
    height: 120,
  },
  recoImageRadius: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  recoImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heartCircle: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
  },
  recoCategoryBadge: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  recoCategoryBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  recoBody: {
    padding: 14,
  },
  recoTitle: {
    color: '#0a3a1a',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  recoText: {
    marginTop: 4,
    color: '#6a7a6e',
    fontSize: 12,
    lineHeight: 16,
  },
  recoButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recoButtonText: {
    color: '#0d8a4e',
    fontWeight: '600',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  footerSpacer: {
    height: 10,
  },
});