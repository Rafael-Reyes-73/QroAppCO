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
  FlatList,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { products, categories } from '../data/products';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, shadows, radius, spacing } from '../styles/theme';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

// ============================================
// COMPONENTE CARD DE PRODUCTO
// ============================================
const ProductCard = ({ product, onPress }) => {
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

  const getTypeColor = (tipo) => {
    const colorsMap = {
      verdura: ['#e8f5e9', '#c8e6c9'],
      fruta: ['#fff3e0', '#ffe0b2'],
      hierba: ['#e0f2f1', '#b2dfdb'],
      flor: ['#f3e5f5', '#e1bee7'],
      árbol: ['#e8eaf6', '#c5cae9'],
    };
    return colorsMap[tipo] || ['#f5f5f5', '#e0e0e0'];
  };

  const getTypeIcon = (tipo) => {
    const icons = {
      verdura: 'leaf',
      fruta: 'fruit-cherries',
      hierba: 'sprout',
      flor: 'flower',
      árbol: 'tree',
    };
    return icons[tipo] || 'leaf';
  };

  return (
    <Animated.View style={[styles.productCardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity style={styles.productCard} onPress={handlePress} activeOpacity={0.8}>
        <LinearGradient
          colors={getTypeColor(product.tipo)}
          style={styles.productImageContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons name={getTypeIcon(product.tipo)} size={42} color={colors.primary} />
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{product.tipo}</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: product.estado ? colors.success : colors.danger }]} />
            <Text style={styles.statusText}>{product.estado ? 'Disponible' : 'Agotado'}</Text>
          </View>
        </LinearGradient>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.nombre}</Text>
          <Text style={styles.productVariety}>{product.temporada}</Text>
          <View style={styles.productFooter}>
            <View style={styles.productMeta}>
              <Feather name="calendar" size={12} color={colors.textMuted} />
              <Text style={styles.productMetaText}>{product.temporada}</Text>
            </View>
            <View style={styles.detailButton}>
              <Feather name="arrow-right" size={16} color={colors.primary} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============================================
// PANTALLA PRINCIPAL - CATÁLOGO
// ============================================
export default function CatalogScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchText, setSearchText] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategory === 'Todo' || product.tipo === selectedCategory.toLowerCase();
    const matchSearch = product.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                       product.descripcion.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleProductPress = (productId) => {
    router.push(`/producto/${productId}`);
  };

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />

      <View style={styles.container}>
        {/* Header premium */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoContainer} activeOpacity={1}>
            <View style={styles.logoWrapper}>
              <Image
                source={logoImage}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="shopping-cart" size={20} color={colors.primary} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={20} color={colors.primary} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.subtitle}>Encuentra las mejores semillas y plantas</Text>

        {/* Search bar premium */}
        <View style={[
          styles.searchBox,
          searchFocused && styles.searchBoxFocused
        ]}>
          <Feather name="search" size={18} color={colors.textMuted} />
          <TextInput
            placeholder="Buscar plantas, semillas o variedades..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            returnKeyType="search"
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Feather name="x" size={16} color={colors.textMuted} />
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

        {/* Contador de productos */}
        <View style={styles.productCounter}>
          <Text style={styles.productCounterText}>
            {filteredProducts.length} productos disponibles
          </Text>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            <Feather
              name={viewMode === 'grid' ? 'grid' : 'list'}
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Lista de productos */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === 'grid' ? 2 : 1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Feather name="package" size={40} color={colors.textMuted} />
              </View>
              <Text style={styles.emptyText}>No se encontraron productos</Text>
              <Text style={styles.emptySubtext}>Prueba con otra categoría o búsqueda</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

// ============================================
// ESTILOS PREMIUM
// ============================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
  },
  // Header premium
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  logoContainer: {
    flex: 1,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    alignSelf: 'flex-start',
  },
  logoImage: {
    width: 90,
    height: 32,
    borderRadius: radius.sm,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.danger,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '800',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.danger,
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
    fontWeight: '800',
  },
  subtitle: {
    fontSize: fonts.sm,
    fontWeight: '500',
    color: colors.textMuted,
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  // Search bar premium
  searchBox: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    ...shadows.soft,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.05)',
  },
  searchBoxFocused: {
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.textDark,
    paddingVertical: 8,
    fontWeight: '600',
  },
  // Categorías
  categoriesContainer: {
    marginBottom: 12,
  },
  categoriesContent: {
    paddingHorizontal: 2,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.08)',
    position: 'relative',
  },
  categoryFilterActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryFilterText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.2,
  },
  categoryFilterTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '30%',
    width: '40%',
    height: 2,
    backgroundColor: colors.accent,
    borderRadius: 1,
  },
  productCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productCounterText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  viewToggle: {
    padding: 4,
  },
  // Grid de productos
  productsList: {
    paddingBottom: 100,
  },
  productCardWrapper: {
    flex: 1,
    margin: 6,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  productImageContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(16,82,25,0.88)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  typeBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 7,
    fontWeight: '600',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textDark,
  },
  productVariety: {
    fontSize: 12,
    color: colors.textBody,
    fontWeight: '500',
    marginTop: 1,
    textTransform: 'capitalize',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  productMetaText: {
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  detailButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(16,82,25,0.07)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(16,82,25,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
    fontWeight: '700',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
    marginTop: 4,
  },
});
