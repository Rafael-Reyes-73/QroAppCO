import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// ============================================
// COMPONENTE TARJETA DE PRODUCTO
// ============================================
const ProductCard = ({ name, rating, price, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress}>
      <View style={styles.cardImage}>
        <Icon name={image} size={40} color="#1a7540" />
      </View>
      <Text style={styles.cardName} numberOfLines={1}>{name}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={12} color="#f5a623" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <Text style={styles.cardPrice}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// PANTALLA PRINCIPAL
// ============================================
export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Todo');
  const [searchText, setSearchText] = useState('');

  const tabs = ['Todo', 'Semillas', 'Fertilizantes', 'Herramientas'];

  const products = [
    { id: 1, name: 'Semillas de Tomate', rating: '4.9', price: '12.50', category: 'Semillas', image: 'seedling' },
    { id: 2, name: 'Fertilizante Orgánico', rating: '4.7', price: '24.99', category: 'Fertilizantes', image: 'leaf' },
    { id: 3, name: 'Tijeras de Poda Pro', rating: '4.8', price: '35.00', category: 'Herramientas', image: 'cut' },
    { id: 4, name: 'Maceta de Fibra', rating: '4.5', price: '8.99', category: 'Herramientas', image: 'seedling' },
    { id: 5, name: 'Semillas de Lechuga', rating: '4.6', price: '9.99', category: 'Semillas', image: 'seedling' },
    { id: 6, name: 'Fertilizante Líquido', rating: '4.8', price: '18.50', category: 'Fertilizantes', image: 'leaf' },
    { id: 7, name: 'Semillas de Calabaza', rating: '4.7', price: '14.99', category: 'Semillas', image: 'seedling' },
    { id: 8, name: 'Tierra Abonada', rating: '4.4', price: '6.99', category: 'Fertilizantes', image: 'leaf' },
  ];

  const filteredProducts = products.filter(product => {
    const matchTab = activeTab === 'Todo' || product.category === activeTab;
    const matchSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchTab && matchSearch;
  });

  const renderProduct = ({ item }) => (
    <ProductCard
      name={item.name}
      rating={item.rating}
      price={item.price}
      image={item.image}
      onPress={() => alert(`Ver detalle de ${item.name}`)}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      
      <View style={styles.container}>
        {/* TÍTULO */}
        <Text style={styles.title}>🌱 QroStore</Text>

        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#5a8a6e" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Busca semillas, herramientas..."
            placeholderTextColor="#8ab89a"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="times-circle" size={18} color="#5a8a6e" />
            </TouchableOpacity>
          )}
        </View>

        {/* TABS */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.tabActive,
              ]}
              onPress={() => setActiveTab(tab)}
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
              <Icon name="search" size={50} color="#c6e2d4" />
              <Text style={styles.emptyText}>No se encontraron productos</Text>
            </View>
          }
        />
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
    backgroundColor: '#f5f9f7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f9f7',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b2a1a',
    marginBottom: 16,
  },

  // ===== BUSCADOR =====
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#c6e2d4',
    borderRadius: 60,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#0b2a1a',
    paddingVertical: 10,
  },

  // ===== TABS =====
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 40,
    backgroundColor: '#eef7f2',
    borderWidth: 1,
    borderColor: '#c6e2d4',
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: '#0b3a1e',
    borderColor: '#0b3a1e',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4a7a5e',
  },
  tabTextActive: {
    color: 'white',
  },

  // ===== LISTA DE PRODUCTOS =====
  productList: {
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  // ===== TARJETA DE PRODUCTO =====
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e8f5ee',
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#e6f5ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0b2a1a',
    textAlign: 'center',
    marginBottom: 6,
    width: '100%',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4a7a5e',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0b3a1e',
  },

  // ===== VACÍO =====
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#5a8a6e',
    marginTop: 12,
  },
});