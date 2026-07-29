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
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

// ============================================
// COMPONENTE TARJETA DE PRODUCTO
// ============================================
const ProductCard = ({ name, rating, price, image, onPress, index }) => {
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
    <Animated.View style={[
      styles.productCardWrapper,
      { transform: [{ scale: scaleAnim }] }
    ]}>
      <TouchableOpacity style={styles.productCard} onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.cardImage}>
          <Feather name={image} size={32} color="#0d8a4e" />
        </View>
        <Text style={styles.cardName} numberOfLines={1}>{name}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={12} color="#f5a623" fill="#f5a623" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <Text style={styles.cardPrice}>${price}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================
// PANTALLA PRINCIPAL
// ============================================
export default function QroStoreScreen() {
  const [activeTab, setActiveTab] = useState('Todo');
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('catalog');

  const tabs = ['Todo', 'Semillas', 'Fertilizantes', 'Herramientas'];

  const products = [
    { id: 1, name: 'Semillas de Tomate', rating: '4.9', price: '12.50', category: 'Semillas', image: 'package' },
    { id: 2, name: 'Fertilizante Orgánico', rating: '4.7', price: '24.99', category: 'Fertilizantes', image: 'leaf' },
    { id: 3, name: 'Tijeras de Poda Pro', rating: '4.8', price: '35.00', category: 'Herramientas', image: 'scissors' },
    { id: 4, name: 'Maceta de Fibra', rating: '4.5', price: '8.99', category: 'Herramientas', image: 'box' },
    { id: 5, name: 'Semillas de Lechuga', rating: '4.6', price: '9.99', category: 'Semillas', image: 'package' },
    { id: 6, name: 'Fertilizante Líquido', rating: '4.8', price: '18.50', category: 'Fertilizantes', image: 'droplet' },
    { id: 7, name: 'Semillas de Calabaza', rating: '4.7', price: '14.99', category: 'Semillas', image: 'package' },
    { id: 8, name: 'Tierra Abonada', rating: '4.4', price: '6.99', category: 'Fertilizantes', image: 'layers' },
  ];

  const filteredProducts = products.filter(product => {
    const matchTab = activeTab === 'Todo' || product.category === activeTab;
    const matchSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchTab && matchSearch;
  });

  const tabsNav = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  const renderProduct = ({ item, index }) => (
    <ProductCard
      name={item.name}
      rating={item.rating}
      price={item.price}
      image={item.image}
      index={index}
      onPress={() => alert(`Ver detalle de ${item.name}`)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogoContainer}>
              <Image 
                source={logoImage}
                style={styles.headerLogo}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.headerTitle}>QroStore</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Feather name="shopping-bag" size={22} color="#0a3a1a" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#6a8a6e" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            placeholderTextColor="#8a9a8e"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Feather name="x" size={18} color="#6a8a6e" />
            </TouchableOpacity>
          )}
        </View>

        {/* TABS */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LISTA DE PRODUCTOS */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Feather name="search" size={48} color="#c8d4c8" />
              <Text style={styles.emptyText}>No se encontraron productos</Text>
            </View>
          }
        />

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>
          {tabsNav.map((tab) => (
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLogoContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
  },
  headerLogo: {
    width: 28,
    height: 28,
    borderRadius: 7,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  cartButton: {
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
  cartBadge: {
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
  cartBadgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '700',
  },

  // ===== BUSCADOR =====
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 138, 78, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 2,
    marginBottom: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#0a3a1a',
    paddingVertical: 10,
  },

  // ===== TABS =====
  tabsContainer: {
    marginBottom: 16,
  },
  tabsContent: {
    paddingHorizontal: 2,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  tabActive: {
    backgroundColor: '#0d8a4e',
    borderColor: '#0d8a4e',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4a6a4e',
    letterSpacing: 0.2,
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  // ===== LISTA DE PRODUCTOS =====
  productList: {
    paddingBottom: 80,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  // ===== TARJETA DE PRODUCTO =====
  productCardWrapper: {
    width: '48%',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a3a1a',
    textAlign: 'center',
    marginBottom: 6,
    width: '100%',
    letterSpacing: 0.2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4a6a4e',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d8a4e',
  },

  // ===== VACÍO =====
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: '#6a8a6e',
    marginTop: 12,
    fontWeight: '500',
  },

  // ===== BOTTOM NAVIGATION =====
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