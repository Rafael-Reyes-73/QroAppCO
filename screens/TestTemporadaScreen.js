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

export default function TestTemporadaScreen({ onClose }) {
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
            <Text style={styles.progressText}>Paso 2 de 3</Text>
            <Text style={styles.percentText}>66%</Text>
          </View>

          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.title}>¿En qué temporada quieres sembrar?</Text>

          <Text style={styles.description}>
            Selecciona la época del año en la que planeas comenzar tu huerto
            orgánico para ofrecerte las mejores recomendaciones.
          </Text>

          <SeasonCard
            title="Primavera"
            image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80"
          />

          <SeasonCard
            title="Verano"
            image="https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80"
          />

          <SeasonCard
            title="Otoño"
            image="https://images.unsplash.com/photo-1506917728037-b6af01a7d403?auto=format&fit=crop&w=900&q=80"
          />

          <SeasonCard
            title="Invierno"
            image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80"
          />

          <TouchableOpacity activeOpacity={0.85} style={styles.nextButton}>
            <Text style={styles.nextText}>Siguiente</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.prevButton}>
            <Text style={styles.prevText}>Anterior</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomNav}>
          <NavItem icon="home" label="Inicio" />
          <View style={styles.navActive}>
            <MaterialCommunityIcons name="help-circle-outline" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>Test</Text>
          </View>
          <NavItem icon="shopping-bag" label="Tienda" />
          <NavItem icon="user" label="Perfil" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function SeasonCard({ image, title }) {
  return (
    <View style={styles.seasonCard}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.seasonImage}
        imageStyle={styles.seasonImageRadius}
      />
      <Text style={styles.seasonTitle}>{title}</Text>
    </View>
  );
}

function NavItem({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <Feather name={icon} size={21} color="#3d463c" />
      <Text style={styles.navText}>{label}</Text>
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
    paddingHorizontal: 34,
    paddingTop: 32,
    paddingBottom: 120,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    color: '#537456',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  percentText: {
    color: '#154f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  progressBg: {
    height: 6,
    backgroundColor: '#e2e6e2',
    borderRadius: 5,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#105219',
    borderRadius: 5,
  },
  title: {
    color: '#154f1f',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 35,
    textAlign: 'center',
    marginTop: 54,
  },
  description: {
    color: '#5a6259',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 34,
  },
  seasonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  seasonImage: {
    height: 320,
  },
  seasonImageRadius: {
    borderRadius: 6,
  },
  seasonTitle: {
    color: '#222822',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 14,
  },
  nextButton: {
    height: 45,
    borderRadius: 24,
    backgroundColor: '#8da789',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 42,
  },
  nextText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  prevButton: {
    height: 43,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#8da789',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  prevText: {
    color: '#416340',
    fontSize: 13,
    fontWeight: '900',
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#edf0ed',
  },
  navActive: {
    width: 80,
    height: 44,
    borderRadius: 24,
    backgroundColor: '#c9efc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActiveText: {
    fontSize: 12,
    color: '#5a7c58',
    fontWeight: '800',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#3d463c',
    fontWeight: '700',
    marginTop: 3,
  },
});