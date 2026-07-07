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
} from 'react-native';

export default function QroStoreHomeScreen() {
  const [searchText, setSearchText] = useState('');

  const categories = ['Semillas', 'Fertilizantes', 'Herramientas', 'Macetos'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>QroStore</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar semillas, abonos..."
            placeholderTextColor="#8ab89a"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <TouchableOpacity style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerBrand}>GREEN EARTH GARDEN SUPPLY</Text>
            <Text style={styles.bannerSubtitle}>NURTURE YOUR PLANTS, NATURALLY</Text>
            <View style={styles.bannerOffer}>
              <Text style={styles.bannerOfferText}>OFERTA DE VERANO</Text>
              <View style={styles.bannerDiscount}>
                <Text style={styles.bannerDiscountText}>Hasta 30% Dto.</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Comprar ahora</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryInitial}>{category.charAt(0)}</Text>
                </View>
                <Text style={styles.categoryName}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.allCategoriesContainer}>
          <Text style={styles.viewAllLabel}>Ver todo</Text>
          <TouchableOpacity style={styles.categoryChip}><Text style={styles.categoryChipText}>Semillas</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}><Text style={styles.categoryChipText}>Fertilizantes</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}><Text style={styles.categoryChipText}>Herramientas</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}><Text style={styles.categoryChipText}>Macetos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}><Text style={styles.categoryChipText}>Ofertas del Mes</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryChip}><Text style={styles.categoryChipText}>Tiempo Limitado</Text></TouchableOpacity>
        </ScrollView>

        <View style={styles.productsSection}>
          <View style={styles.productCard}>
            <View style={styles.productImage}><Text style={styles.productLetter}>T</Text></View>
            <Text style={styles.productName}>Semillas Tomate</Text>
            <View style={styles.productPriceRow}>
              <Text style={styles.productPrice}>$120.00</Text>
              <Text style={styles.productOriginalPrice}>$150.00</Text>
            </View>
            <View style={styles.productRating}>
              <Text style={styles.ratingText}>★ 4.8 (120)</Text>
            </View>
          </View>

          <View style={styles.productCard}>
            <View style={styles.productImage}><Text style={styles.productLetter}>T</Text></View>
            <Text style={styles.productName}>Tijeras de Poda</Text>
            <View style={styles.productPriceRow}>
              <Text style={styles.productPrice}>$340.00</Text>
              <Text style={styles.productOriginalPrice}>$420.00</Text>
            </View>
            <View style={styles.productRating}>
              <Text style={styles.ratingText}>★ 4.9 (85)</Text>
            </View>
          </View>
        </View>

        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recomendados para ti</Text>
          <View style={styles.recommendedCard}>
            <View style={styles.recommendedBadge}><Text style={styles.recommendedBadgeText}>TOP VENTAS</Text></View>
            <View style={styles.recommendedContent}>
              <View style={styles.recommendedImage}><Text style={styles.recommendedLetter}>F</Text></View>
              <View style={styles.recommendedInfo}>
                <Text style={styles.recommendedTitle}>Fertilizante Organico Pro</Text>
                <Text style={styles.recommendedDescription}>Formula 100% natural disenada para potenciar el crecimiento...</Text>
                <View style={styles.recommendedFooter}>
                  <Text style={styles.recommendedPrice}>$285.00</Text>
                  <TouchableOpacity style={styles.addBtn}><Text style={styles.addBtnText}>Agregar</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.viewCatalogBtn}>
          <Text style={styles.viewCatalogText}>Ver Catalogo Completo →</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f9f7' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#0b2a1a', marginBottom: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#c6e2d4', borderRadius: 60, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 16 },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '500', color: '#0b2a1a', paddingVertical: 10 },
  banner: { backgroundColor: '#0b3a1e', borderRadius: 20, padding: 20, marginBottom: 20 },
  bannerContent: { alignItems: 'center' },
  bannerBrand: { fontSize: 14, fontWeight: '700', color: '#b8dfc8', letterSpacing: 0.5, marginBottom: 4 },
  bannerSubtitle: { fontSize: 11, fontWeight: '500', color: '#8ab89a', letterSpacing: 1, marginBottom: 8 },
  bannerOffer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  bannerOfferText: { fontSize: 20, fontWeight: '700', color: 'white' },
  bannerDiscount: { backgroundColor: '#e8a838', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 40, marginLeft: 8 },
  bannerDiscountText: { fontSize: 14, fontWeight: '700', color: '#0b2a1a' },
  bannerBtn: { backgroundColor: 'white', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 60 },
  bannerBtnText: { fontSize: 14, fontWeight: '600', color: '#0b3a1e' },
  categoriesSection: { marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0b2a1a', marginBottom: 12 },
  categoriesGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  categoryCard: { alignItems: 'center', backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 8, borderRadius: 16, borderWidth: 1, borderColor: '#e8f5ee', width: '23%' },
  categoryIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#e6f5ed', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  categoryInitial: { fontSize: 18, fontWeight: '700', color: '#1a7540' },
  categoryName: { fontSize: 11, fontWeight: '500', color: '#0b2a1a' },
  allCategoriesContainer: { flexDirection: 'row', marginBottom: 16 },
  viewAllLabel: { fontSize: 14, fontWeight: '600', color: '#0b2a1a', marginRight: 8 },
  categoryChip: { backgroundColor: '#eef7f2', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 40, borderWidth: 1, borderColor: '#c6e2d4', marginRight: 8 },
  categoryChipText: { fontSize: 12, fontWeight: '500', color: '#4a7a5e' },
  productsSection: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  productCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e8f5ee' },
  productImage: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#e6f5ed', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  productLetter: { fontSize: 24, fontWeight: '700', color: '#1a7540' },
  productName: { fontSize: 13, fontWeight: '600', color: '#0b2a1a', textAlign: 'center', marginBottom: 4 },
  productPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: '700', color: '#0b3a1e' },
  productOriginalPrice: { fontSize: 12, color: '#8ab89a', textDecorationLine: 'line-through' },
  productRating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, color: '#4a7a5e' },
  recommendedSection: { marginBottom: 16 },
  recommendedCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e8f5ee', position: 'relative' },
  recommendedBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#e8a838', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 4 },
  recommendedBadgeText: { fontSize: 9, fontWeight: '700', color: '#0b2a1a' },
  recommendedContent: { flexDirection: 'row', gap: 12 },
  recommendedImage: { width: 70, height: 70, borderRadius: 12, backgroundColor: '#e6f5ed', justifyContent: 'center', alignItems: 'center' },
  recommendedLetter: { fontSize: 28, fontWeight: '700', color: '#1a7540' },
  recommendedInfo: { flex: 1 },
  recommendedTitle: { fontSize: 15, fontWeight: '600', color: '#0b2a1a', marginBottom: 4 },
  recommendedDescription: { fontSize: 12, color: '#4a7a5e', lineHeight: 16, marginBottom: 8 },
  recommendedFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  recommendedPrice: { fontSize: 16, fontWeight: '700', color: '#0b3a1e' },
  addBtn: { backgroundColor: '#0b3a1e', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 40 },
  addBtnText: { color: 'white', fontSize: 13, fontWeight: '600' },
  viewCatalogBtn: { paddingVertical: 14, alignItems: 'center' },
  viewCatalogText: { fontSize: 15, fontWeight: '600', color: '#0b3a1e' },
  bottomSpacer: { height: 20 },
});