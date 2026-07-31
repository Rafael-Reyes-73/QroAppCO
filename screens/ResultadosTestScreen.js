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

export default function ResultadosTestScreen({ onClose }) {
  const [selectedTab, setSelectedTab] = useState('test');
  const [likedItems, setLikedItems] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = (id) => {
    setLikedItems(prev => ({
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

  const results = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&w=900&q=80',
      compatibility: '95% Compatible',
      tag: 'Fruto',
      title: 'Tomate Cherry',
      text: 'Ideal para balcones con alta exposición solar. Produce frutos...',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
      compatibility: '92% Compatible',
      tag: 'Aromática',
      title: 'Brócoli',
      text: 'Perfecto para interiores cerca de ventanas. Su aroma repele plagas...',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
      compatibility: '88% Compatible',
      tag: 'Hortaliza',
      title: 'Tomate Roma',
      text: 'Resistente a climas más frescos. Crecimiento rápido ideal para...',
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
            <Text style={styles.headerTitle}>Resultados</Text>
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
          <Text style={styles.kicker}>ANÁLISIS DE SUELO Y CLIMA</Text>
          <Text style={styles.title}>Tus Recomendaciones Ideales</Text>

          <Text style={styles.description}>
            Basado en tus condiciones actuales de iluminación y tipo de sustrato,
            estas variedades tienen la mayor probabilidad de éxito en tu hogar.
          </Text>

          {results.map((item) => (
            <Animated.View
              key={item.id}
              style={[
                styles.cardWrapper,
                {
                  transform: [{ 
                    scale: likedItems[item.id] ? scaleAnim : 1 
                  }],
                },
              ]}
            >
              <View style={styles.card}>
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  imageStyle={styles.cardImageRadius}
                >
                  <TouchableOpacity 
                    style={styles.favoriteCircle}
                    onPress={() => handleLike(item.id)}
                    activeOpacity={0.7}
                  >
                    <Animated.View style={{ transform: [{ scale: likedItems[item.id] ? scaleAnim : 1 }] }}>
                      <Feather 
                        name="heart" 
                        size={20} 
                        color={likedItems[item.id] ? "#d71920" : "#0a3a1a"} 
                      />
                    </Animated.View>
                  </TouchableOpacity>

                  <View style={styles.compatibilityBadge}>
                    <Feather name="star" size={10} color="#7ddfa0" fill="#7ddfa0" />
                    <Text style={styles.compatibilityText}>{item.compatibility}</Text>
                  </View>
                </ImageBackground>

                <View style={styles.cardBody}>
                  <View style={styles.cardTop}>
                    <View style={styles.cardInfo}>
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>{item.tag}</Text>
                      </View>

                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardText}>{item.text}</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} style={styles.plusButton}>
                      <Feather name="plus" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity activeOpacity={0.8} style={styles.detailButton}>
                    <Text style={styles.detailText}>Ver Detalle</Text>
                    <Feather name="arrow-right" size={14} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          ))}

          {/* Empty Box */}
          <View style={styles.emptyBox}>
            <View style={styles.emptyIconContainer}>
              <Feather name="search" size={32} color="#0d8a4e" />
            </View>
            <Text style={styles.emptyTitle}>¿No encontraste lo que buscabas?</Text>
            <Text style={styles.emptyText}>
              Ajusta los parámetros de tu test para explorar nuevas variedades
              que se adapten a diferentes rincones de tu espacio.
            </Text>

            <TouchableOpacity activeOpacity={0.8} style={styles.repeatButton}>
              <Feather name="refresh-cw" size={16} color="#ffffff" />
              <Text style={styles.repeatText}>Repetir Test</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 100,
  },
  kicker: {
    color: '#0d8a4e',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    color: '#0a3a1a',
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 20,
  },
  cardWrapper: {
    marginBottom: 14,
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
    height: 190,
  },
  cardImageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  favoriteCircle: {
    position: 'absolute',
    top: 14,
    right: 14,
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
  compatibilityBadge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: 'rgba(13, 138, 78, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compatibilityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
  },
  tag: {
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  tagText: {
    color: '#0d8a4e',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  cardText: {
    marginTop: 4,
    fontSize: 13,
    color: '#4a6a4e',
    lineHeight: 18,
    fontWeight: '400',
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#0d8a4e',
    borderRadius: 10,
    marginTop: 14,
    gap: 6,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  detailText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  emptyBox: {
    marginTop: 24,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
  },
  emptyIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  emptyText: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 20,
  },
  repeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d8a4e',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  repeatText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
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