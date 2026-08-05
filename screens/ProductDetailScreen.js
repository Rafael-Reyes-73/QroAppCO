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
import { colors, fonts, shadows, radius, spacing } from '../styles/theme';

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
    const colorsMap = {
      verdura: '#e8f5e9',
      fruta: '#fff3e0',
      hierba: '#e0f2f1',
      flor: '#f3e5f5',
      árbol: '#e8eaf6',
    };
    return colorsMap[tipo] || '#f5f5f5';
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

  const sections = [
    { title: 'Descripción', value: product.descripcion },
    { title: 'Origen', value: product.origen },
    { title: 'Municipios donde se cultiva', value: product.municipios },
    { title: 'Ciclo de vida', value: product.ciclo_vida },
    { title: 'Época de siembra', value: product.epoca_siembra },
    { title: 'Tiempo de cosecha', value: product.tiempo_cosecha },
    { title: 'Instrucciones de siembra', value: product.instrucciones_siembra },
    { title: 'Tipo de suelo', value: product.tipo_suelo },
    { title: 'Riego', value: product.riego },
    { title: 'Cuidados', value: product.cuidados },
    { title: 'Beneficios para la salud', value: product.beneficios_salud },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header con botón volver */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color={colors.textDark} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Feather name="share-2" size={20} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          {/* Imagen del producto */}
          <View style={[styles.imageContainer, { backgroundColor: getTypeColor(product.tipo) }]}>
            <MaterialCommunityIcons name={getTypeIcon(product.tipo)} size={80} color={colors.primary} />
            <View style={styles.typeBadgeLarge}>
              <Text style={styles.typeBadgeLargeText}>{product.tipo}</Text>
            </View>
            <View style={[styles.statusBadgeLarge, { backgroundColor: product.estado ? colors.success : colors.danger }]}>
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
                <Feather name="calendar" size={12} color={colors.primary} />
                <Text style={styles.tagText}>{product.temporada}</Text>
              </View>
              <View style={styles.tag}>
                <Feather name="thermometer" size={12} color={colors.primary} />
                <Text style={styles.tagText}>{product.clima}</Text>
              </View>
              <View style={styles.tag}>
                <Feather name="maximize" size={12} color={colors.primary} />
                <Text style={styles.tagText}>{product.tamaño}</Text>
              </View>
            </View>

            {/* Secciones informativas */}
            {sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionText}>{section.value}</Text>
              </View>
            ))}

            {/* Vitaminas */}
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
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
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
    ...shadows.soft,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: radius.lg,
    position: 'relative',
    ...shadows.card,
  },
  typeBadgeLarge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(16,82,25,0.88)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  typeBadgeLargeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  statusBadgeLarge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusBadgeLargeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.textDark,
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 12,
    fontWeight: '500',
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
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.08)',
    gap: 6,
    ...shadows.soft,
  },
  tagText: {
    fontSize: 11,
    color: colors.textDark,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textDark,
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: colors.textBody,
    lineHeight: 22,
    fontWeight: '500',
  },
  nutrientsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  nutrientItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.06)',
    ...shadows.soft,
  },
  nutrientLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '700',
    marginBottom: 2,
  },
  nutrientValue: {
    fontSize: 14,
    color: colors.textDark,
    fontWeight: '800',
  },
  errorText: {
    fontSize: 18,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: 40,
  },
});
