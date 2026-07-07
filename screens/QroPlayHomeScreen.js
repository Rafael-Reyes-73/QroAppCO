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

export default function QroPlayHomeScreen() {
  const [searchText, setSearchText] = useState('');

  const categories = ['Compostaje', 'Plagas', 'Riego', 'Diseno'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>QroPlay</Text>
        <Text style={styles.subtitle}>Aprende a cultivar tu futuro con QroPlay</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar tutoriales, plantas o tecnicas..."
            placeholderTextColor="#8ab89a"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Explorar Categorias</Text>
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIcon}><Text style={styles.categoryInitial}>C</Text></View>
              <Text style={styles.categoryName}>Compostaje</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIcon}><Text style={styles.categoryInitial}>P</Text></View>
              <Text style={styles.categoryName}>Plagas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIcon}><Text style={styles.categoryInitial}>R</Text></View>
              <Text style={styles.categoryName}>Riego</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIcon}><Text style={styles.categoryInitial}>D</Text></View>
              <Text style={styles.categoryName}>Diseno</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recomendados para ti</Text>
          <View style={styles.recommendedCard}>
            <View style={styles.recommendedThumbnail}>
              <Text style={styles.playIcon}>►</Text>
              <View style={styles.recommendedDuration}><Text style={styles.recommendedDurationText}>12:45</Text></View>
            </View>
            <View style={styles.recommendedContent}>
              <Text style={styles.recommendedBrand}>ORGANIC GARDENING</Text>
              <Text style={styles.recommendedChannel}>PLANTING SECRETS</Text>
              <Text style={styles.recommendedTitle}>Planting Secrets</Text>
              <Text style={styles.recommendedDescription}>Descubre las tecnicas milenarias para asegurar que cada semilla germine...</Text>
              <Text style={styles.recommendedFooterText}>Organic Academy</Text>
            </View>
          </View>
        </View>

        <View style={styles.greenHarvestSection}>
          <Text style={styles.greenHarvestTitle}>Green Harvest: Urban Farming's Futuristic Approach</Text>
          <Text style={styles.greenHarvestDurationText}>08:30</Text>
          <View style={styles.greenHarvestCard}>
            <View style={styles.greenHarvestThumbnail}><Text style={styles.greenHarvestPlay}>►</Text></View>
            <View style={styles.greenHarvestContent}>
              <Text style={styles.greenHarvestTitle2}>Urban Farming Future</Text>
              <Text style={styles.greenHarvestDescription}>Como transformar espacios reducidos en ecosistemas productivos usando...</Text>
            </View>
          </View>
        </View>

        <View style={styles.newsletterSection}>
          <Text style={styles.newsletterTitle}>Recibe guias de temporada</Text>
          <Text style={styles.newsletterDescription}>Unete a nuestra comunidad de mas de 5,000 cultivadores urbanos y recibe consejos exclusivos cada semana.</Text>
          <View style={styles.newsletterInput}>
            <TextInput style={styles.newsletterInputText} placeholder="Tu correo electronico" placeholderTextColor="#8ab89a" />
            <TouchableOpacity style={styles.subscribeBtn}><Text style={styles.subscribeBtnText}>Suscribirme</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f9f7' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#0b2a1a', marginBottom: 4 },
  subtitle: { fontSize: 16, fontWeight: '500', color: '#4a7a5e', marginBottom: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#c6e2d4', borderRadius: 60, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '500', color: '#0b2a1a', paddingVertical: 10 },
  categoriesSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0b2a1a', marginBottom: 12 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: { width: '22%', backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: '#e8f5ee' },
  categoryIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e6f5ed', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  categoryInitial: { fontSize: 18, fontWeight: '700', color: '#1a7540' },
  categoryName: { fontSize: 11, fontWeight: '500', color: '#0b2a1a', textAlign: 'center' },
  recommendedSection: { marginBottom: 24 },
  recommendedCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#e8f5ee' },
  recommendedThumbnail: { height: 140, backgroundColor: '#1a6a3e', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  playIcon: { fontSize: 40, color: 'white' },
  recommendedDuration: { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.75)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  recommendedDurationText: { color: 'white', fontSize: 12, fontWeight: '600' },
  recommendedContent: { padding: 14 },
  recommendedBrand: { fontSize: 11, fontWeight: '700', color: '#0b3a1e', letterSpacing: 0.5 },
  recommendedChannel: { fontSize: 10, fontWeight: '500', color: '#4a7a5e', letterSpacing: 0.3 },
  recommendedTitle: { fontSize: 16, fontWeight: '600', color: '#0b2a1a', marginBottom: 4 },
  recommendedDescription: { fontSize: 13, color: '#4a7a5e', lineHeight: 18, marginBottom: 8 },
  recommendedFooterText: { fontSize: 12, fontWeight: '500', color: '#4a7a5e' },
  greenHarvestSection: { marginBottom: 24, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e8f5ee' },
  greenHarvestTitle: { fontSize: 16, fontWeight: '600', color: '#0b2a1a', marginBottom: 4 },
  greenHarvestDurationText: { fontSize: 13, color: '#4a7a5e', marginBottom: 12 },
  greenHarvestCard: { flexDirection: 'row', gap: 12, backgroundColor: '#f5f9f7', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e8f5ee' },
  greenHarvestThumbnail: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#1a6a3e', justifyContent: 'center', alignItems: 'center' },
  greenHarvestPlay: { fontSize: 24, color: 'white' },
  greenHarvestContent: { flex: 1 },
  greenHarvestTitle2: { fontSize: 14, fontWeight: '600', color: '#0b2a1a', marginBottom: 2 },
  greenHarvestDescription: { fontSize: 12, color: '#4a7a5e', lineHeight: 16 },
  newsletterSection: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e8f5ee', marginBottom: 16 },
  newsletterTitle: { fontSize: 15, fontWeight: '600', color: '#0b2a1a', marginBottom: 8 },
  newsletterDescription: { fontSize: 13, color: '#4a7a5e', lineHeight: 18, marginBottom: 14 },
  newsletterInput: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  newsletterInputText: { flex: 1, backgroundColor: '#f5f9f7', borderWidth: 1.5, borderColor: '#c6e2d4', borderRadius: 60, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: '#0b2a1a' },
  subscribeBtn: { backgroundColor: '#0b3a1e', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 60 },
  subscribeBtnText: { color: 'white', fontSize: 14, fontWeight: '600' },
  bottomSpacer: { height: 20 },
});