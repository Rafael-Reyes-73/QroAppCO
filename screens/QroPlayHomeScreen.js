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
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const logoImage = require('../assets/logo_qrohuerto.jpeg');

const categories = ['Todo', 'Compostaje', 'Plagas', 'Riego', 'Suelo', 'Siembra'];

const videos = [
  {
    id: 1,
    title: 'Secretos del Suelo: Preparación Vital',
    channel: 'SIEMARA',
    time: '2 días',
    duration: '12:45',
    category: 'Suelo',
    description: 'Aprende a nutrir tu tierra desde cero usando solo componentes naturales.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    views: '2.4K',
  },
  {
    id: 2,
    title: 'Riego por Goteo: Eficiencia Máxima',
    channel: 'RIEGO PRO',
    time: '1 semana',
    duration: '08:20',
    category: 'Riego',
    description: 'Diseña e instala un sistema de riego automatizado que ahorra hasta un 60% de agua.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80',
    views: '1.8K',
  },
  {
    id: 3,
    title: 'Compostaje de Oro Negro',
    channel: 'COMPOST LIFE',
    time: '3 días',
    duration: '15:30',
    category: 'Compostaje',
    description: 'Guía definitiva para transformar tus desechos de cocina en el abono más nutritivo.',
    image: 'https://images.unsplash.com/photo-1535743686920-55e4145369b9?auto=format&fit=crop&w=900&q=80',
    views: '3.1K',
  },
  {
    id: 4,
    title: 'Control de Plagas Natural',
    channel: 'ECO HUERTO',
    time: '5 días',
    duration: '10:15',
    category: 'Plagas',
    description: 'Soluciones orgánicas para mantener tus cultivos libres de plagas sin químicos.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    views: '1.2K',
  },
  {
    id: 5,
    title: 'Siembra de Primavera',
    channel: 'HUERTO URBANO',
    time: '1 día',
    duration: '09:45',
    category: 'Siembra',
    description: 'Todo lo que necesitas saber para preparar tu huerto en la temporada de primavera.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
    views: '4.2K',
  },
];

export default function QroPlayHomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [searchText, setSearchText] = useState('');
  const [likedVideos, setLikedVideos] = useState({});
  const [savedVideos, setSavedVideos] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const filteredVideos = videos.filter((video) => {
    const matchCategory = activeCategory === 'Todo' || video.category === activeCategory;
    const matchSearch =
      video.title.toLowerCase().includes(searchText.toLowerCase()) ||
      video.description.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleLike = (id) => {
    setLikedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSave = (id) => {
    setSavedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />

      <View style={styles.container}>
        {/* ===== HEADER CON LOGO ===== */}
<View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoWrapper}>
              <Image source={logoImage} style={styles.logo} resizeMode="contain" />
            </View>
            <View>
              <Text style={styles.headerTitle}>QroPlay</Text>
              <Text style={styles.headerSubtitle}>Aprende y cultiva</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="bell" size={20} color="#154f1f" />
              <View style={styles.headerBadge}>
                <Text style={styles.headerBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="download" size={20} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ===== BANNER ===== */}
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.banner}
            imageStyle={styles.bannerRadius}
          >
            <LinearGradient
              colors={['rgba(16,82,25,0.75)', 'rgba(16,82,25,0.45)']}
              style={styles.bannerOverlay}
            />
            <View style={styles.bannerContent}>
              <View style={styles.bannerLiveBadge}>
                <View style={styles.bannerLiveDot} />
                <Text style={styles.bannerLiveText}>APRENDE</Text>
              </View>
              <Text style={styles.bannerTitle}>Tutoriales de cultivo</Text>
              <Text style={styles.bannerText}>
                Guías paso a paso para mejorar tu huerto urbano
              </Text>
              <View style={styles.bannerChips}>
                <View style={styles.bannerChip}>
                  <Feather name="play" size={12} color="#c9efc5" />
                  <Text style={styles.bannerChipText}>+24 Videos</Text>
                </View>
                <View style={styles.bannerChip}>
                  <Feather name="users" size={12} color="#c9efc5" />
                  <Text style={styles.bannerChipText}>12 Categorías</Text>
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* ===== BUSCADOR ===== */}
          <View style={styles.searchBox}>
            <Feather name="search" size={18} color="#6d766c" />
            <TextInput
              placeholder="Buscar tutoriales o consejos..."
              placeholderTextColor="#7a8179"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
            />
            {searchText !== '' && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Feather name="x" size={16} color="#6d766c" />
              </TouchableOpacity>
            )}
          </View>

          {/* ===== CATEGORÍAS ===== */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setActiveCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ===== ENCABEZADO ===== */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                {searchText ? 'Resultados' : 'Videos para ti'}
              </Text>
              <Text style={styles.sectionCount}>
                {filteredVideos.length} videos disponibles
              </Text>
            </View>
            {filteredVideos.length > 0 && (
              <TouchableOpacity>
                <Text style={styles.sectionLink}>Ver todo</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ===== LISTA DE VIDEOS ===== */}
          {filteredVideos.length > 0 ? (
            <View style={styles.videoList}>
              {filteredVideos.map((video) => (
                <TouchableOpacity
                  key={video.id}
                  activeOpacity={0.95}
                  style={styles.videoCard}
                >
                  <View style={styles.videoThumbnail}>
                    <ImageBackground
                      source={{ uri: video.image }}
                      style={styles.thumbnailImage}
                      imageStyle={styles.thumbnailRadius}
                    >
                      <View style={styles.thumbnailOverlay} />
                      <View style={styles.playButtonCircle}>
                        <Feather name="play" size={24} color="#ffffff" />
                      </View>
                      <View style={styles.durationBadge}>
                        <Feather name="clock" size={10} color="#ffffff" />
                        <Text style={styles.durationText}>{video.duration}</Text>
                      </View>
                    </ImageBackground>
                  </View>

                  <View style={styles.videoBody}>
                    <View style={styles.videoTop}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>
                          {video.category}
                        </Text>
                      </View>
                      <Text style={styles.channelName}>{video.channel}</Text>
                      <View style={styles.videoMeta}>
                        <Feather name="eye" size={10} color="#7a8d78" />
                        <Text style={styles.videoMetaText}>{video.views}</Text>
                      </View>
                    </View>

                    <Text style={styles.videoTitle} numberOfLines={2}>
                      {video.title}
                    </Text>

                    <Text style={styles.videoDescription} numberOfLines={2}>
                      {video.description}
                    </Text>

                    <View style={styles.videoFooter}>
                      <View style={styles.videoActions}>
                        <TouchableOpacity
                          style={styles.actionBtn}
                          onPress={() => handleLike(video.id)}
                        >
                          <Animated.View
                            style={{
                              transform: [
                                { scale: likedVideos[video.id] ? scaleAnim : 1 },
                              ],
                            }}
                          >
                            <Feather
                              name="thumbs-up"
                              size={15}
                              color={
                                likedVideos[video.id] ? '#0d8a4e' : '#7a8d78'
                              }
                            />
                          </Animated.View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.actionBtn}
                          onPress={() => handleSave(video.id)}
                        >
                          <Feather
                            name={savedVideos[video.id] ? 'bookmark' : 'bookmark'}
                            size={15}
                            color={
                              savedVideos[video.id] ? '#0d8a4e' : '#7a8d78'
                            }
                          />
                        </TouchableOpacity>

                        <Text style={styles.timeText}>Hace {video.time}</Text>
                      </View>

                      <TouchableOpacity style={styles.watchButton}>
                        <Text style={styles.watchButtonText}>Ver</Text>
                        <Feather name="arrow-right" size={12} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Feather name="video-off" size={36} color="#b2c8b0" />
              </View>
              <Text style={styles.emptyText}>No se encontraron videos</Text>
              <Text style={styles.emptySubtext}>
                Prueba con otra categoría o búsqueda
              </Text>
            </View>
          )}

          {filteredVideos.length > 0 && (
            <TouchableOpacity style={styles.loadMore}>
              <Text style={styles.loadMoreText}>Cargar más videos</Text>
              <Feather name="chevron-down" size={16} color="#0d8a4e" />
            </TouchableOpacity>
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
  // ===== HEADER CON LOGO =====
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginRight: 12,
  },
  logo: {
    width: 90,
    height: 32,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#154f1f',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#6d7d6a',
    fontWeight: '600',
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#f0f7f0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#d71920',
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  headerBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '800',
  },
  // ===== SCROLL =====
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  // ===== BANNER =====
  banner: {
    height: 170,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  bannerRadius: {
    borderRadius: 16,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bannerContent: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
  },
  bannerLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
    gap: 6,
  },
  bannerLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7ddfa0',
  },
  bannerLiveText: {
    color: '#7ddfa0',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  bannerText: {
    color: '#d8f0d8',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    width: '85%',
  },
  bannerChips: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  bannerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  bannerChipText: {
    color: '#d8f0d8',
    fontSize: 11,
    fontWeight: '700',
  },
  // ===== BUSCADOR =====
  searchBox: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#222822',
    fontWeight: '500',
  },
  // ===== CATEGORÍAS =====
  categoryScroll: {
    paddingBottom: 4,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e8eee8',
  },
  chipActive: {
    backgroundColor: '#105219',
    borderColor: '#105219',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5a7c58',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  // ===== ENCABEZADO =====
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#154f1f',
    fontWeight: '900',
  },
  sectionCount: {
    fontSize: 11,
    color: '#7a8d78',
    fontWeight: '600',
    marginTop: 1,
  },
  sectionLink: {
    color: '#154f1f',
    fontSize: 12,
    fontWeight: '800',
  },
  // ===== VIDEO LIST =====
  videoList: {
    marginBottom: 8,
  },
  videoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  videoThumbnail: {
    height: 160,
  },
  thumbnailImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  playButtonCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(13, 138, 78, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  videoBody: {
    padding: 14,
  },
  videoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  categoryBadge: {
    backgroundColor: 'rgba(13, 138, 78, 0.07)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  categoryBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#0d8a4e',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  channelName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#154f1f',
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  videoMetaText: {
    fontSize: 10,
    color: '#7a8d78',
    fontWeight: '500',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#154f1f',
    marginBottom: 4,
    lineHeight: 21,
  },
  videoDescription: {
    fontSize: 12,
    color: '#5a6d5a',
    lineHeight: 17,
    fontWeight: '500',
    marginBottom: 10,
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(13, 138, 78, 0.04)',
  },
  videoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#f0f7f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 10,
    color: '#7a8d78',
    fontWeight: '500',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#105219',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 5,
  },
  watchButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  // ===== VACÍO =====
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f0f7f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyText: {
    color: '#154f1f',
    fontSize: 16,
    fontWeight: '800',
  },
  emptySubtext: {
    color: '#7a8d78',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  loadMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  loadMoreText: {
    color: '#0d8a4e',
    fontSize: 13,
    fontWeight: '700',
  },
  footerSpacer: {
    height: 20,
  },
});

