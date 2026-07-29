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

export default function FavoritosScreen({ onClose }) {
  const [likedItems, setLikedItems] = useState({});
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const favorites = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80',
      tag: 'Frutas & Verduras',
      title: 'Tomate Heirloom',
      text: 'Variedad orgánica premium con gran resistencia y sabor intenso.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
      tag: 'Hierbas',
      title: 'Brócoli',
      text: 'Pequeño, ideal para climas templados y huertos urbanos.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80',
      tag: 'Raíces',
      title: 'Zanahoria Nantes',
      text: 'Dulce y crujiente, perfecta para suelos profundos y cultivo durante todo el año.',
    },
  ];

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
            <Text style={styles.headerTitle}>Favoritos</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={20} color="#0a3a1a" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mis Favoritos</Text>
            <Text style={styles.subtitle}>
              Gestiona tus semillas preferidas y comienza tu próximo cultivo orgánico.
            </Text>
          </View>

          {favorites.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <View style={styles.card}>
                <ImageBackground 
                  source={{ uri: item.image }} 
                  style={styles.cardImage} 
                  imageStyle={styles.cardImageRadius}
                >
                  <TouchableOpacity 
                    style={styles.heartCircle}
                    onPress={() => handleLike(item.id)}
                    activeOpacity={0.7}
                  >
                    <Animated.View style={{ transform: [{ scale: likedItems[item.id] ? scaleAnim : 1 }] }}>
                      <Feather 
                        name="heart" 
                        size={20} 
                        color={likedItems[item.id] ? "#d71920" : "#0a3a1a"} 
                        style={likedItems[item.id] && styles.heartFilled}
                      />
                    </Animated.View>
                  </TouchableOpacity>

                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                  </View>
                </ImageBackground>

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.text}</Text>

                  <View style={styles.cardButtons}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.detailButton}>
                      <Text style={styles.detailText}>Ver Detalles</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} style={styles.startButton}>
                      <Text style={styles.startText}>Iniciar Cultivo</Text>
                      <Feather name="arrow-right" size={14} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
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
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
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
    paddingTop: 20,
    paddingBottom: 100,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  subtitle: {
    color: '#4a6a4e',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
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
    height: 200,
  },
  cardImageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  heartCircle: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heartFilled: {
    tintColor: '#d71920',
  },
  tag: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.9)',
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardBody: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    color: '#0a3a1a',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  cardText: {
    color: '#4a6a4e',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
    fontWeight: '400',
  },
  cardButtons: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  detailButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#f0f5f2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  detailText: {
    color: '#0a3a1a',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  startButton: {
    flex: 1.2,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#0d8a4e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  startText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
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