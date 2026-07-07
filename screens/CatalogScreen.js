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

// ============================================
// COMPONENTE CARD DE VIDEO/TUTORIAL
// ============================================
const VideoCard = ({ category, date, title, description, onPress }) => {
  return (
    <TouchableOpacity style={styles.videoCard} onPress={onPress}>
      <View style={styles.videoHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{category}</Text>
        </View>
        <Text style={styles.videoDate}>{date}</Text>
      </View>
      <Text style={styles.videoTitle}>{title}</Text>
      <Text style={styles.videoDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

// ============================================
// PANTALLA PRINCIPAL
// ============================================
export default function CatalogScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [searchText, setSearchText] = useState('');

  const categories = ['Todo', 'Compostaje', 'Plagas', 'Riego', 'Suelo', 'Siembra'];

  const videos = [
    { 
      id: 1, 
      category: 'SUELO', 
      date: 'Hace 2 días', 
      title: 'Secretos del Suelo: Preparación Vital', 
      description: 'Aprende a nutrir tu tierra desde cero utilizando solo componentes...',
      categoryFilter: 'Suelo'
    },
    // Puedes agregar más videos aquí para probar
  ];

  const filteredVideos = videos.filter(video => {
    const matchCategory = selectedCategory === 'Todo' || video.categoryFilter === selectedCategory;
    const matchSearch = video.title.toLowerCase().includes(searchText.toLowerCase()) ||
                       video.description.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      
      <View style={styles.container}>
        {/* TÍTULO */}
        <Text style={styles.title}>QroPlay</Text>
        <Text style={styles.subtitle}>Categorías QroPlay</Text>

        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar tutoriales o consejos..."
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* FILTROS POR CATEGORÍA */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryFilter,
                selectedCategory === category && styles.categoryFilterActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryFilterText,
                  selectedCategory === category && styles.categoryFilterTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LISTA DE VIDEOS */}
        <ScrollView style={styles.videoList} showsVerticalScrollIndicator={false}>
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              category={video.category}
              date={video.date}
              title={video.title}
              description={video.description}
              onPress={() => alert(`Ver video: ${video.title}`)}
            />
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  // ===== TÍTULOS =====
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b2a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4a7a5e',
    marginBottom: 16,
  },

  // ===== BUSCADOR =====
  searchContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 2,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 15,
    color: '#333333',
    paddingVertical: 10,
  },

  // ===== FILTROS =====
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
  },
  categoryFilterActive: {
    backgroundColor: 'transparent',
  },
  categoryFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  categoryFilterTextActive: {
    color: '#0b3a1e',
    fontWeight: '700',
  },

  // ===== LISTA DE VIDEOS =====
  videoList: {
    flex: 1,
  },

  // ===== CARD DE VIDEO =====
  videoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8f0ec',
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#e6f5ed',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a7540',
    letterSpacing: 0.5,
  },
  videoDate: {
    fontSize: 12,
    color: '#888888',
  },
  videoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0b2a1a',
    marginBottom: 6,
  },
  videoDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },

  bottomSpacer: {
    height: 20,
  },
});