import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function ConoceTuCultivoDetalleScreen({ onClose }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('catalog');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#f5faf7" />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.backButton}>
                <Feather name="arrow-left" size={22} color="#0a3a1a" />
              </TouchableOpacity>
              <View style={styles.headerLogoContainer}>
                <Image 
                  source={logoImage}
                  style={styles.headerLogo}
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text style={styles.headerTitle}>Detalle de Cultivo</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#0a3a1a" />
            </TouchableOpacity>
          </View>

          {/* Hero Image */}
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={handleFavorite}
              activeOpacity={0.7}
            >
              <Animated.View style={{ transform: [{ scale: isFavorite ? scaleAnim : 1 }] }}>
                <Feather 
                  name="heart" 
                  size={22} 
                  color={isFavorite ? "#d71920" : "#0a3a1a"} 
                />
              </Animated.View>
            </TouchableOpacity>
          </ImageBackground>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Verduras</Text>
            </View>

            <Text style={styles.title}>Tomate Cherry</Text>

            <View style={styles.ratingRow}>
              <Feather name="star" size={18} color="#f5a623" fill="#f5a623" />
              <Text style={styles.ratingText}>4.8 (120 Reseñas)</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatBox icon="sprout-outline" label="GERMINACIÓN" value="7-14 días" />
            <StatBox icon="clock-outline" label="COSECHA" value="60-80 días" />
            <StatBox icon="thermometer" label="TEMPERATURA" value="20-30°C" />
            <StatBox icon="white-balance-sunny" label="LUZ SOLAR" value="Sol Pleno" />
          </View>

          {/* Descripción */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>

            <Text style={styles.description}>
              El Tomate Cherry es una variedad de crecimiento indeterminado,
              apreciada por su sabor dulce y su producción abundante de frutos
              pequeños y jugosos. Es la elección perfecta para huertos urbanos y
              macetas gracias a su resistencia y facilidad de cultivo.
            </Text>

            <Benefit text="Ideal para consumo fresco y ensaladas." />
            <Benefit text="Alta concentración de vitaminas A y C." />
            <Benefit text="Resistente a plagas comunes del jardín." />
          </View>

          {/* Condiciones */}
          <View style={styles.conditionsCard}>
            <Text style={styles.conditionsTitle}>Condiciones</Text>

            <View style={styles.conditionItem}>
              <View style={styles.conditionHeader}>
                <MaterialCommunityIcons
                  name="water-outline"
                  size={20}
                  color="#6d542f"
                />
                <Text style={styles.conditionLabel}>Riego</Text>
              </View>

              <View style={styles.progressBackground}>
                <View style={styles.progressFill} />
              </View>

              <Text style={styles.conditionSmallText}>
                Frecuente y constante
              </Text>
            </View>

            <View style={styles.conditionItem}>
              <View style={styles.conditionHeader}>
                <MaterialCommunityIcons
                  name="sprout-outline"
                  size={20}
                  color="#6d542f"
                />
                <Text style={styles.conditionLabel}>Suelo</Text>
              </View>

              <Text style={styles.conditionText}>
                Rico en materia orgánica, bien drenado y con pH entre 6.0 y 6.8.
              </Text>
            </View>

            <View style={styles.conditionItem}>
              <View style={styles.conditionHeader}>
                <MaterialCommunityIcons
                  name="ruler"
                  size={20}
                  color="#6d542f"
                />
                <Text style={styles.conditionLabel}>Espaciado</Text>
              </View>

              <Text style={styles.conditionText}>
                40 - 50 cm entre plantas para asegurar flujo de aire.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity activeOpacity={0.8} style={styles.primaryButton}>
            <Feather name="plus-circle" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Agregar a MyHuerto</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.secondaryButton}>
            <Feather name="book-open" size={18} color="#0d8a4e" />
            <Text style={styles.secondaryButtonText}>Guía de Cultivo</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.navItem,
                selectedTab === tab.id && styles.navItemActive
              ]}
              onPress={() => setSelectedTab(tab.id)}
              activeOpacity={0.7}
            >
              <Feather 
                name={tab.icon} 
                size={20} 
                color={selectedTab === tab.id ? '#0d8a4e' : '#6a8a6e'} 
              />
              <Text style={[
                styles.navText,
                selectedTab === tab.id && styles.navTextActive
              ]}>
                {tab.label}
              </Text>
              {selectedTab === tab.id && (
                <View style={styles.navIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <View style={styles.statBox}>
      <View style={styles.statIconContainer}>
        <MaterialCommunityIcons name={icon} size={28} color="#0d8a4e" />
      </View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function Benefit({ text }) {
  return (
    <View style={styles.benefitRow}>
      <View style={styles.benefitIconContainer}>
        <Feather name="check" size={14} color="#ffffff" />
      </View>
      <Text style={styles.benefitText}>{text}</Text>
    </View>
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
  scrollContent: {
    paddingBottom: 180,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    padding: 4,
  },
  headerLogoContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.12)',
  },
  headerLogo: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    letterSpacing: 0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f5f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    height: 260,
    width: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    backgroundColor: 'rgba(13, 138, 78, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  badgeText: {
    color: '#0d8a4e',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4a6a4e',
  },
  statsGrid: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4a6a4e',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  statValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#0a3a1a',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 15,
    color: '#4a6a4e',
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: 16,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  benefitIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0d8a4e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#0a3a1a',
    fontWeight: '400',
  },
  conditionsCard: {
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  conditionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  conditionItem: {
    marginBottom: 18,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  conditionLabel: {
    color: '#4a6a4e',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#e8ede8',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    width: '80%',
    height: '100%',
    backgroundColor: '#6d542f',
    borderRadius: 3,
  },
  conditionSmallText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6a7a6e',
  },
  conditionText: {
    fontSize: 14,
    color: '#4a6a4e',
    lineHeight: 22,
    fontWeight: '400',
    marginTop: 4,
  },
  bottomActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 65,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  primaryButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0d8a4e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.1)',
  },
  secondaryButtonText: {
    color: '#0d8a4e',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 65,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
  },
  navText: {
    fontSize: 10,
    color: '#6a8a6e',
    fontWeight: '500',
    marginTop: 2,
  },
  navTextActive: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
  navIndicator: {
    position: 'absolute',
    top: -1,
    width: 16,
    height: 2.5,
    backgroundColor: '#0d8a4e',
    borderRadius: 2,
  },
});