import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Importar todas las pantallas
import QroStoreHomeScreen from './QroStoreHomeScreen';
import QroPlayHomeScreen from './QroPlayHomeScreen';
import QroPlayScreen from './QroPlayScreen';
import PlayerScreen from './PlayerScreen';
import AddCardScreen from './AddCardScreen';
import CartScreen from './CartScreen';
import ConfirmationScreen from './ConfirmationScreen';
import ProductDetailScreen from './ProductDetailScreen';
import AddressScreen from './AddressScreen';
import ProfileScreen from './ProfileScreen';
import QroStoreScreen from './QroStoreHomeScreen'; // ← IMPORTAR QroStore

const { width, height } = Dimensions.get('window');

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function MenuScreen() {
  const [screen, setScreen] = useState('menu');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedTab, setSelectedTab] = useState('home');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(1)).current;

  const menuItems = [
    { id: 'qroStore', label: 'QroStore', icon: 'shopping-bag', color: '#0d8a4e' },
    { id: 'qroStoreHome', label: 'Inicio QroStore', icon: 'home', color: '#0a7a42' },
    { id: 'qroPlayHome', label: 'QroPlay', icon: 'play-circle', color: '#0b6a3a' },
    { id: 'qroPlay', label: 'Catálogo QroPlay', icon: 'grid', color: '#0a5a32' },
    { id: 'player', label: 'Reproductor', icon: 'music', color: '#1a6a3a' },
    { id: 'addCard', label: 'Agregar Tarjeta', icon: 'credit-card', color: '#0d7a4a' },
    { id: 'cart', label: 'Carrito', icon: 'shopping-bag', color: '#0a8a4a' },
    { id: 'confirmation', label: 'Confirmación', icon: 'check-circle', color: '#1a5c3a' },
    { id: 'productDetail', label: 'Detalle Producto', icon: 'package', color: '#0d6a3e' },
    { id: 'address', label: 'Dirección', icon: 'map-pin', color: '#0b7a46' },
    { id: 'profile', label: 'Perfil', icon: 'user', color: '#0b7a46' },
  ];

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  const handlePress = (screenName, index) => {
    setSelectedIndex(index);
    
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.85,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setScreen(screenName);
    }, 200);
  };

  const handleLogoPress = () => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 0.9,
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

  const renderMenu = () => (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f0f5f2" barStyle="dark-content" />
      
      <ScrollView 
        style={styles.container}
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
                  <Text style={styles.logoSubtitle}>Menú Principal</Text>
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
          
          <View style={styles.headerBadge}>
            <Text style={styles.badgeNumber}>{menuItems.length}</Text>
            <Text style={styles.badgeLabel}>Pantallas</Text>
          </View>
        </View>

        {/* Subtítulo */}
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>Navegación</Text>
          <View style={styles.subHeaderLine} />
        </View>

        {/* Menú */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.menuItemWrapper,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      scale: selectedIndex === index ? 
                        fadeAnim.interpolate({
                          inputRange: [0.85, 1],
                          outputRange: [0.97, 1],
                        }) : 
                        new Animated.Value(1),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  selectedIndex === index && styles.menuItemActive,
                ]}
                onPress={() => handlePress(item.id, index)}
                activeOpacity={0.8}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[
                    styles.menuIconContainer,
                    { 
                      backgroundColor: selectedIndex === index ? 
                        item.color : `${item.color}12`,
                      borderColor: selectedIndex === index ? 
                        item.color : 'transparent',
                    }
                  ]}>
                    <Feather 
                      name={item.icon} 
                      size={20} 
                      color={selectedIndex === index ? '#ffffff' : item.color} 
                    />
                  </View>
                  
                  <View style={styles.menuTextContainer}>
                    <Text style={[
                      styles.menuLabel,
                      selectedIndex === index && styles.menuLabelActive
                    ]}>
                      {item.label}
                    </Text>
                    {selectedIndex === index && (
                      <View style={styles.activeIndicator}>
                        <View style={styles.activeDot} />
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.menuItemRight}>
                  {selectedIndex === index ? (
                    <View style={styles.activeBadge}>
                      <Feather name="check" size={14} color="#ffffff" />
                    </View>
                  ) : (
                    <Feather 
                      name="chevron-right" 
                      size={18} 
                      color="#a0b0a4" 
                    />
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>QroHuerto v2.0</Text>
        </View>
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
    </SafeAreaView>
  );

  // Renderizado de pantallas
  switch (screen) {
    case 'qroStore':
      return <QroStoreScreen />;
    case 'qroStoreHome':
      return <QroStoreHomeScreen />;
    case 'qroPlayHome':
      return <QroPlayHomeScreen />;
    case 'qroPlay':
      return <QroPlayScreen />;
    case 'player':
      return <PlayerScreen />;
    case 'addCard':
      return <AddCardScreen />;
    case 'cart':
      return <CartScreen />;
    case 'confirmation':
      return <ConfirmationScreen />;
    case 'productDetail':
      return <ProductDetailScreen />;
    case 'address':
      return <AddressScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return renderMenu();
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f5f2',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
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
    width: 38,
    height: 38,
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
    marginTop: 0,
    letterSpacing: 0.2,
  },
  headerBadge: {
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.1)',
  },
  badgeNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0d8a4e',
  },
  badgeLabel: {
    fontSize: 8,
    color: '#4a7a5e',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: -2,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  subHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  subHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.12)',
    marginLeft: 12,
  },
  menuContainer: {
    gap: 8,
  },
  menuItemWrapper: {
    borderRadius: 14,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  menuItemActive: {
    borderColor: 'rgba(13, 138, 78, 0.2)',
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a3a2a',
    letterSpacing: 0.2,
  },
  menuLabelActive: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
  activeIndicator: {
    marginTop: 3,
  },
  activeDot: {
    width: 24,
    height: 2.5,
    backgroundColor: '#0d8a4e',
    borderRadius: 2,
  },
  menuItemRight: {
    alignItems: 'flex-end',
  },
  activeBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    alignItems: 'center',
  },
  footerDivider: {
    width: 40,
    height: 3,
    backgroundColor: 'rgba(13, 138, 78, 0.15)',
    borderRadius: 2,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 11,
    color: '#6a8a6e',
    fontWeight: '500',
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