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

export default function QroPlayHomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const categories = ['Compostaje', 'Plagas', 'Riego', 'Diseño'];

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

        <Text style={styles.subtitle}>Aprende a cultivar tu futuro</Text>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Buscador */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#6a8a6e" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar tutoriales, plantas o técnicas..."
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
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Explorar Categorías</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.categoryCard}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryIcon}>
                    <Text style={styles.categoryInitial}>{category.charAt(0)}</Text>
                  </View>
                  <Text style={styles.categoryName}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recomendados */}
          <View style={styles.recommendedSection}>
            <Text style={styles.sectionTitle}>Recomendados para ti</Text>
            <View style={styles.recommendedCard}>
              <View style={styles.recommendedThumbnail}>
                <View style={styles.playButton}>
                  <Feather name="play" size={24} color="#ffffff" />
                </View>
                <View style={styles.recommendedDuration}>
                  <Text style={styles.recommendedDurationText}>12:45</Text>
                </View>
              </View>
              <View style={styles.recommendedContent}>
                <Text style={styles.recommendedBrand}>ORGANIC GARDENING</Text>
                <Text style={styles.recommendedChannel}>PLANTING SECRETS</Text>
                <Text style={styles.recommendedTitle}>Planting Secrets</Text>
                <Text style={styles.recommendedDescription}>
                  Descubre las técnicas milenarias para asegurar que cada semilla germine...
                </Text>
                <View style={styles.recommendedFooter}>
                  <Feather name="user" size={12} color="#4a6a4e" />
                  <Text style={styles.recommendedFooterText}>Organic Academy</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Green Harvest */}
          <View style={styles.greenHarvestSection}>
            <Text style={styles.greenHarvestTitle}>
              Green Harvest: Urban Farming's Futuristic Approach
            </Text>
            <Text style={styles.greenHarvestDurationText}>08:30</Text>
            <View style={styles.greenHarvestCard}>
              <View style={styles.greenHarvestThumbnail}>
                <Feather name="play" size={20} color="#ffffff" />
              </View>
              <View style={styles.greenHarvestContent}>
                <Text style={styles.greenHarvestTitle2}>Urban Farming Future</Text>
                <Text style={styles.greenHarvestDescription}>
                  Cómo transformar espacios reducidos en ecosistemas productivos usando...
                </Text>
              </View>
            </View>
          </View>

          {/* Newsletter */}
          <View style={styles.newsletterSection}>
            <View style={styles.newsletterIcon}>
              <Feather name="mail" size={20} color="#0d8a4e" />
            </View>
            <Text style={styles.newsletterTitle}>Recibe guías de temporada</Text>
            <Text style={styles.newsletterDescription}>
              Únete a nuestra comunidad de más de 5,000 cultivadores urbanos y recibe consejos exclusivos cada semana.
            </Text>
            <View style={styles.newsletterInput}>
              <TextInput 
                style={styles.newsletterInputText} 
                placeholder="Tu correo electrónico" 
                placeholderTextColor="#8a9a8e"
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.subscribeBtn} activeOpacity={0.7}>
                <Text style={styles.subscribeBtnText}>Suscribirme</Text>
                <Feather name="arrow-right" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
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
    marginBottom: 20,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#0a3a1a',
    paddingVertical: 10,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '22%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d8a4e',
  },
  categoryName: {
    fontSize: 10,
    fontWeight: '500',
    color: '#0a3a1a',
    textAlign: 'center',
  },
  recommendedSection: {
    marginBottom: 24,
  },
  recommendedCard: {
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
  recommendedThumbnail: {
    height: 140,
    backgroundColor: '#0d8a4e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  recommendedDuration: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  recommendedDurationText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  recommendedContent: {
    padding: 14,
  },
  recommendedBrand: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0d8a4e',
    letterSpacing: 0.8,
  },
  recommendedChannel: {
    fontSize: 9,
    fontWeight: '500',
    color: '#4a6a4e',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  recommendedDescription: {
    fontSize: 13,
    color: '#4a6a4e',
    lineHeight: 18,
    marginBottom: 8,
    fontWeight: '400',
  },
  recommendedFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recommendedFooterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4a6a4e',
  },
  greenHarvestSection: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  greenHarvestTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  greenHarvestDurationText: {
    fontSize: 12,
    color: '#4a6a4e',
    marginBottom: 12,
    fontWeight: '500',
  },
  greenHarvestCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
  },
  greenHarvestThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#0d8a4e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenHarvestContent: {
    flex: 1,
  },
  greenHarvestTitle2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  greenHarvestDescription: {
    fontSize: 12,
    color: '#4a6a4e',
    lineHeight: 16,
    fontWeight: '400',
  },
  newsletterSection: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  newsletterIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  newsletterTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  newsletterDescription: {
    fontSize: 13,
    color: '#4a6a4e',
    lineHeight: 18,
    marginBottom: 14,
    fontWeight: '400',
  },
  newsletterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  newsletterInputText: {
    flex: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0a3a1a',
  },
  subscribeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d8a4e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 4,
  },
  subscribeBtnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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
