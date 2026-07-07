import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TestMunicipioScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="leaf" size={20} color="#154f1f" />
            <Text style={styles.headerTitle}>Test</Text>
          </View>

          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={24} color="#4c554b" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.progressTop}>
            <Text style={styles.progressText}>Progreso del Test</Text>
            <Text style={styles.percentText}>33%</Text>
          </View>

          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.title}>¿En qué municipio te encuentras?</Text>

          <Text style={styles.description}>
            Selecciona tu ubicación actual para personalizar tu experiencia de
            cultivo y recomendaciones botánicas.
          </Text>

          <MunicipioItem icon="city-variant-outline" name="Querétaro" />
          <MunicipioItem icon="castle" name="Corregidora" />
          <MunicipioItem icon="tractor" name="El Marqués" />
          <MunicipioItem icon="pine-tree" name="Huimilpan" />
          <MunicipioItem icon="water-outline" name="San Juan del Río" />
          <MunicipioItem icon="flower-outline" name="Tequisquiapan" />

          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.fieldImage}
            imageStyle={styles.fieldImageRadius}
          >
            <View style={styles.whiteOverlay} />
          </ImageBackground>

          <TouchableOpacity activeOpacity={0.85} style={styles.nextButton}>
            <Text style={styles.nextText}>Siguiente</Text>
            <Feather name="arrow-right" size={20} color="#8b9588" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function MunicipioItem({ icon, name }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemIcon}>
        <MaterialCommunityIcons name={icon} size={24} color="#154f1f" />
      </View>

      <Text style={styles.itemText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7faf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7faf7',
  },
  header: {
    height: 66,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#edf0ed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#154f1f',
    fontSize: 24,
    fontWeight: '900',
    marginLeft: 7,
  },
  scrollContent: {
    paddingHorizontal: 40,
    paddingTop: 32,
    paddingBottom: 34,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: '#537456',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  percentText: {
    color: '#154f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  progressBg: {
    height: 12,
    backgroundColor: '#e2e6e2',
    borderRadius: 7,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#105219',
    borderRadius: 7,
  },
  title: {
    marginTop: 44,
    color: '#154f1f',
    fontSize: 29,
    fontWeight: '900',
    lineHeight: 37,
  },
  description: {
    color: '#5a6259',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    marginTop: 18,
    marginBottom: 32,
  },
  item: {
    height: 92,
    backgroundColor: '#ffffff',
    borderRadius: 9,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemIcon: {
    width: 49,
    height: 49,
    borderRadius: 25,
    backgroundColor: '#f0f3f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  itemText: {
    color: '#222822',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  fieldImage: {
    height: 190,
    marginTop: 32,
    marginBottom: 38,
  },
  fieldImageRadius: {
    borderRadius: 9,
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderRadius: 9,
  },
  nextButton: {
    height: 51,
    borderRadius: 26,
    backgroundColor: '#dfe4dc',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nextText: {
    color: '#8b9588',
    fontSize: 14,
    fontWeight: '900',
    marginRight: 8,
  },
});