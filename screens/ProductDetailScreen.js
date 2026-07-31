import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProductDetailScreen({ product }) {
  const router = useRouter();

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Producto no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getTypeColor = (tipo) => {
    const colors = {
      verdura: '#e8f5e9',
      fruta: '#fff3e0',
      hierba: '#e0f2f1',
      flor: '#f3e5f5',
      árbol: '#e8eaf6',
    };
    return colors[tipo] || '#f5f5f5';
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header con botón volver */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#0a3a1a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Feather name="share-2" size={20} color="#0a3a1a" />
            </TouchableOpacity>
          </View>

          {/* Imagen del producto */}
          <View style={[styles.imageContainer, { backgroundColor: getTypeColor(product.tipo) }]}>
            <MaterialCommunityIcons name={getTypeIcon(product.tipo)} size={80} color="#0d8a4e" />
            <View style={styles.typeBadgeLarge}>
              <Text style={styles.typeBadgeLargeText}>{product.tipo}</Text>
            </View>
            <View style={[styles.statusBadgeLarge, { backgroundColor: product.estado ? '#4caf50' : '#f44336' }]}>
              <Text style={styles.statusBadgeLargeText}>{product.estado ? 'Disponible' : 'Agotado'}</Text>
            </View>
          </View>

          {/* Información del producto */}
          <View style={styles.content}>
            <Text style={styles.productName}>{product.nombre}</Text>
            <Text style={styles.productSubtitle}>{product.descripcion}</Text>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Feather name="calendar" size={12} color="#0d8a4e" />
                <Text style={styles.tagText}>{product.temporada}</Text>
              </View>
              <View style={styles.tag}>
                <Feather name="thermometer" size={12} color="#0d8a4e" />
                <Text style={styles.tagText}>{product.clima}</Text>
              </View>
              <View style={styles.tag}>
                <Feather name="maximize" size={12} color="#0d8a4e" />
                <Text style={styles.tagText}>{product.tamaño}</Text>
              </View>
            </View>

            {/* Secciones informativas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.sectionText}>{product.descripcion}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Origen</Text>
              <Text style={styles.sectionText}>{product.origen}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Municipios donde se cultiva</Text>
              <Text style={styles.sectionText}>{product.municipios}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ciclo de vida</Text>
              <Text style={styles.sectionText}>{product.ciclo_vida}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Época de siembra</Text>
              <Text style={styles.sectionText}>{product.epoca_siembra}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tiempo de cosecha</Text>
              <Text style={styles.sectionText}>{product.tiempo_cosecha}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Instrucciones de siembra</Text>
              <Text style={styles.sectionText}>{product.instrucciones_siembra}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipo de suelo</Text>
              <Text style={styles.sectionText}>{product.tipo_suelo}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Riego</Text>
              <Text style={styles.sectionText}>{product.riego}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cuidados</Text>
              <Text style={styles.sectionText}>{product.cuidados}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Beneficios para la salud</Text>
              <Text style={styles.sectionText}>{product.beneficios_salud}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Vitaminas y Minerales</Text>
              <View style={styles.nutrientsContainer}>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Vitaminas</Text>
                  <Text style={styles.nutrientValue}>{product.vitaminas}</Text>
                </View>
                <View style={styles.nutrientItem}>
                  <Text style={styles.nutrientLabel}>Minerales</Text>
                  <Text style={styles.nutrientValue}>{product.minerales}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 16,
    position: 'relative',
  },
  typeBadgeLarge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  typeBadgeLargeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusBadgeLarge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusBadgeLargeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0a3a1a',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    gap: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#0a3a1a',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 22,
  },
  nutrientsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  nutrientItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
  },
  nutrientLabel: {
    fontSize: 11,
    color: '#8a9a8e',
    fontWeight: '500',
    marginBottom: 2,
  },
  nutrientValue: {
    fontSize: 14,
    color: '#0a3a1a',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#0a3a1a',
    textAlign: 'center',
    marginTop: 40,
  },
});