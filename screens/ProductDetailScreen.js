import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function ProductDetailScreen() {
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}><Text style={styles.imageText}>F</Text></View>
          <View style={styles.imageBadges}>
            <View style={styles.certifiedBadge}><Text style={styles.certifiedText}>Organico Certificado</Text></View>
            <View style={styles.ratingBadge}><Text style={styles.ratingText}>★ 4.8 (150)</Text></View>
          </View>
        </View>

        <View style={styles.headerSection}>
          <Text style={styles.brandName}>FLOURISH FUSION</Text>
          <Text style={styles.brandSubtitle}>ORGANIC LIQUID FERTILIZER</Text>
        </View>

        <Text style={styles.productTitle}>Fertilizante Organico Pro</Text>

        <View style={styles.priceStockContainer}>
          <Text style={styles.productPrice}>$285.00</Text>
          <View style={styles.stockBadge}><Text style={styles.stockText}>En stock (15 disponibles)</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DESCRIPCION</Text>
          <Text style={styles.descriptionText}>
            Formula 100% natural disenada para potenciar el crecimiento radicular y la vitalidad de tus plantas.
          </Text>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Cantidad:</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f9f7' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  imageContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, alignItems: 'center' },
  imagePlaceholder: { width: 180, height: 180, backgroundColor: '#e6f5ed', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  imageText: { fontSize: 64, fontWeight: '700', color: '#1a7540' },
  imageBadges: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  certifiedBadge: { backgroundColor: '#e6f5ed', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 40, borderWidth: 1, borderColor: '#b8dfc8' },
  certifiedText: { fontSize: 11, fontWeight: '600', color: '#1a7540' },
  ratingBadge: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 40, borderWidth: 1, borderColor: '#e8f5ee' },
  ratingText: { fontSize: 11, fontWeight: '600', color: '#0b2a1a' },
  headerSection: { marginBottom: 8 },
  brandName: { fontSize: 14, fontWeight: '700', color: '#0b3a1e', letterSpacing: 1 },
  brandSubtitle: { fontSize: 11, fontWeight: '500', color: '#4a7a5e', letterSpacing: 0.5, marginTop: 2 },
  productTitle: { fontSize: 24, fontWeight: '700', color: '#0b2a1a', marginBottom: 8 },
  priceStockContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 16, backgroundColor: '#fff', padding: 16, borderRadius: 16 },
  productPrice: { fontSize: 28, fontWeight: '700', color: '#0b3a1e' },
  stockBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e6f5ed', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 40 },
  stockText: { fontSize: 13, fontWeight: '500', color: '#1a7540' },
  section: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#4a7a5e', letterSpacing: 1, marginBottom: 8 },
  descriptionText: { fontSize: 14, color: '#0b2a1a', lineHeight: 22, textAlign: 'justify' },
  quantitySection: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, marginBottom: 16 },
  quantityLabel: { fontSize: 15, fontWeight: '600', color: '#0b2a1a' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f9f7', borderRadius: 40, borderWidth: 1, borderColor: '#c6e2d4' },
  qtyBtn: { paddingHorizontal: 16, paddingVertical: 8 },
  qtyBtnText: { fontSize: 18, fontWeight: '600', color: '#1a7540' },
  qtyText: { fontSize: 16, fontWeight: '600', color: '#0b2a1a', paddingHorizontal: 8, minWidth: 32, textAlign: 'center' },
  addToCartBtn: { backgroundColor: '#0b3a1e', paddingVertical: 16, borderRadius: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  addToCartText: { color: 'white', fontSize: 17, fontWeight: '600', letterSpacing: 0.4 },
});