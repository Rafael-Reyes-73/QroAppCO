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

export default function ProductDetailScreen() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
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

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
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
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton}>
              <Feather name="arrow-left" size={22} color="#0a3a1a" />
            </TouchableOpacity>
            <View style={styles.headerLogoContainer}>
              <Image 
                source={logoImage}
                style={styles.headerLogo}
                resizeMode="cover"
              />
            </View>
          </View>
          <Text style={styles.headerTitle}>Detalle Producto</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Feather name="shopping-bag" size={20} color="#0a3a1a" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Imagen del producto */}
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Feather name="package" size={80} color="#0d8a4e" />
            </View>
            
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={handleFavorite}
              activeOpacity={0.7}
            >
              <Animated.View style={{ transform: [{ scale: isFavorite ? scaleAnim : 1 }] }}>
                <Feather 
                  name="heart" 
                  size={20} 
                  color={isFavorite ? "#d71920" : "#0a3a1a"} 
                />
              </Animated.View>
            </TouchableOpacity>

            <View style={styles.imageBadges}>
              <View style={styles.certifiedBadge}>
                <Feather name="check-circle" size={12} color="#0d8a4e" />
                <Text style={styles.certifiedText}>Orgánico Certificado</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Feather name="star" size={12} color="#f5a623" fill="#f5a623" />
                <Text style={styles.ratingText}>4.8 (150)</Text>
              </View>
            </View>
          </View>

          {/* Información del producto */}
          <View style={styles.productInfo}>
            <View style={styles.brandContainer}>
              <Text style={styles.brandName}>FLOURISH FUSION</Text>
              <Text style={styles.brandSubtitle}>Fertilizante Orgánico Líquido</Text>
            </View>

            <Text style={styles.productTitle}>Fertilizante Orgánico Pro</Text>

            <View style={styles.priceStockContainer}>
              <Text style={styles.productPrice}>$285.00</Text>
              <View style={styles.stockBadge}>
                <Feather name="check-circle" size={12} color="#0d8a4e" />
                <Text style={styles.stockText}>En stock (15 disponibles)</Text>
              </View>
            </View>
          </View>

          {/* Descripción */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.descriptionText}>
              Fórmula 100% natural diseñada para potenciar el crecimiento radicular 
              y la vitalidad de tus plantas. Ideal para todo tipo de cultivos.
            </Text>
          </View>

          {/* Cantidad */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Cantidad:</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity 
                style={styles.qtyBtn} 
                onPress={() => handleQuantityChange(-1)}
                activeOpacity={0.7}
              >
                <Feather name="minus" size={16} color="#0d8a4e" />
              </TouchableOpacity>
              <Animated.Text style={[styles.qtyText, { transform: [{ scale: scaleAnim }] }]}>
                {quantity}
              </Animated.Text>
              <TouchableOpacity 
                style={styles.qtyBtn} 
                onPress={() => handleQuantityChange(1)}
                activeOpacity={0.7}
              >
                <Feather name="plus" size={16} color="#0d8a4e" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón Agregar al carrito */}
          <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8}>
            <Text style={styles.addToCartText}>Agregar al carrito</Text>
            <Feather name="arrow-right" size={18} color="#ffffff" />
          </TouchableOpacity>
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
    gap: 8,
  },
  backButton: {
    padding: 4,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  cartButton: {
    position: 'relative',
    padding: 4,
  },
  cartBadge: {
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
  cartBadgeText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  imagePlaceholder: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
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
  imageBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  certifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.1)',
    gap: 4,
  },
  certifiedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0d8a4e',
    letterSpacing: 0.2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0a3a1a',
  },
  productInfo: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  brandContainer: {
    marginBottom: 6,
  },
  brandName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0d8a4e',
    letterSpacing: 1,
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: '400',
    color: '#4a6a4e',
    letterSpacing: 0.3,
    marginTop: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  priceStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0d8a4e',
    letterSpacing: 0.5,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0d8a4e',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4a6a4e',
    letterSpacing: 0.8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  descriptionText: {
    fontSize: 14,
    color: '#0a3a1a',
    lineHeight: 22,
    fontWeight: '400',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a3a1a',
    letterSpacing: 0.2,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  qtyBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a3a1a',
    paddingHorizontal: 8,
    minWidth: 32,
    textAlign: 'center',
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d8a4e',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    marginBottom: 8,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
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