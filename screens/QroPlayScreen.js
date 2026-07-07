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

export default function QroPlayScreen() {
  const [activeCategory, setActiveCategory] = useState('Todo');

  const categories = ['Todo', 'Compostaje', 'Plagas', 'Riego', 'Suelo', 'Siembra'];

  const videos = [
    { id: 1, title: 'Secretos del Suelo: Preparacion Vital', channel: 'SIEMARA', time: '2 dias', duration: '12:45', category: 'Suelo', description: 'Aprende a nutrir tu tierra desde cero utilizando solo componentes...' },
    { id: 2, title: 'Riego por Goteo: Eficiencia Maxima', channel: 'RIEGO', time: '1 semana', duration: '08:20', category: 'Riego', description: 'Disena e instala un sistema de riego automatizado que ahorra hasta un...' },
    { id: 3, title: 'Compostaje de Oro Negro', channel: 'COMPOST', time: '3 dias', duration: '15:30', category: 'Compostaje', description: 'Guia definitiva para transformar tus desechos de cocina en el abono mas...' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>QroPlay</Text>
        <Text style={styles.subtitle}>Categorias QroPlay</Text>

        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Buscar tutoriales o consejos..." placeholderTextColor="#8ab89a" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category} style={[styles.categoryFilter, activeCategory === category && styles.categoryFilterActive]} onPress={() => setActiveCategory(category)}>
              <Text style={[styles.categoryFilterText, activeCategory === category && styles.categoryFilterTextActive]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.content}>
          <View style={styles.videoList}>
            {videos.map((video) => (
              <View key={video.id} style={styles.videoCard}>
                <View style={styles.videoThumbnail}>
                  <Text style={styles.videoPlay}>►</Text>
                  <View style={styles.durationBadge}><Text style={styles.durationText}>{video.duration}</Text></View>
                </View>
                <View style={styles.videoContent}>
                  <View style={styles.videoHeader}>
                    <View style={styles.channelBadge}><Text style={styles.channelBadgeText}>{video.category}</Text></View>
                    <Text style={styles.channelName}>{video.channel}</Text>
                    <Text style={styles.videoTime}>Hace {video.time}</Text>
                  </View>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoDescription} numberOfLines={2}>{video.description}</Text>
                  <TouchableOpacity style={styles.watchBtn}><Text style={styles.watchBtnText}>Ver video</Text></TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.loadMoreBtn}><Text style={styles.loadMoreText}>Cargar mas videos ↓</Text></TouchableOpacity>
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f9f7' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#0b2a1a', marginBottom: 4 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#0b2a1a', marginBottom: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#c6e2d4', borderRadius: 60, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '500', color: '#0b2a1a', paddingVertical: 10 },
  categoriesContainer: { flexDirection: 'row', marginBottom: 16 },
  categoryFilter: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 40, backgroundColor: '#eef7f2', borderWidth: 1, borderColor: '#c6e2d4', marginRight: 10 },
  categoryFilterActive: { backgroundColor: '#0b3a1e', borderColor: '#0b3a1e' },
  categoryFilterText: { fontSize: 13, fontWeight: '500', color: '#4a7a5e' },
  categoryFilterTextActive: { color: 'white' },
  content: { flex: 1 },
  videoList: { marginBottom: 16 },
  videoCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#e8f5ee' },
  videoThumbnail: { height: 160, backgroundColor: '#d9ece2', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  videoPlay: { fontSize: 40, color: '#1a7540' },
  durationBadge: { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.75)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  durationText: { color: 'white', fontSize: 12, fontWeight: '600' },
  videoContent: { padding: 14 },
  videoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 6 },
  channelBadge: { backgroundColor: '#e6f5ed', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: '#c6e2d4' },
  channelBadgeText: { fontSize: 9, fontWeight: '600', color: '#1a7540', textTransform: 'uppercase' },
  channelName: { fontSize: 12, fontWeight: '600', color: '#0b2a1a' },
  videoTime: { fontSize: 11, color: '#5a8a6e' },
  videoTitle: { fontSize: 16, fontWeight: '700', color: '#0b2a1a', marginBottom: 4 },
  videoDescription: { fontSize: 13, color: '#4a7a5e', marginBottom: 10, lineHeight: 18 },
  watchBtn: { alignSelf: 'flex-start' },
  watchBtnText: { fontSize: 13, fontWeight: '600', color: '#0b3a1e' },
  loadMoreBtn: { alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#e8f5ee', marginTop: 4 },
  loadMoreText: { fontSize: 15, fontWeight: '600', color: '#0b3a1e' },
  bottomSpacer: { height: 20 },
});