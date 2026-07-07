import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function ConoceTuCultivoDetalleScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Feather name="arrow-left" size={26} color="#154f1f" />

            <Text style={styles.headerTitle}>Detalle de Cultivo</Text>

            <View style={styles.headerIcons}>
              <Feather name="search" size={24} color="#154f1f" />

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={21} color="#154f1f" />
              </TouchableOpacity>
            </View>
          </View>

          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <TouchableOpacity activeOpacity={0.8} style={styles.favoriteButton}>
              <Feather name="heart" size={25} color="#154f1f" />
            </TouchableOpacity>
          </ImageBackground>

          <View style={styles.infoCard}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Verduras</Text>
            </View>

            <Text style={styles.title}>Tomate Cherry</Text>

            <View style={styles.ratingRow}>
              <FontAwesome name="star-o" size={20} color="#2d6b32" />
              <Text style={styles.ratingText}>4.8 (120 Reseñas)</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <StatBox icon="leaf" label="GERMINACIÓN" value="7-14 días" />
            <StatBox icon="clock-outline" label="COSECHA" value="60-80 días" />
            <StatBox icon="thermometer" label="TEMPERATURA" value="20-30°C" />
            <StatBox icon="white-balance-sunny" label="LUZ SOLAR" value="Sol Pleno" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>

            <Text style={styles.description}>
              El Tomate Cherry es una variedad de crecimiento indeterminado,
              apreciada por su sabor dulce y su producción abundante de frutos
              pequeños y jugosos. Es la elección perfecta para huertos urbanos y
              macetas gracias a su resistencia y facilidad de cultivo. Su follaje
              denso y verde oscuro aporta vitalidad a cualquier espacio de cultivo.
            </Text>

            <Benefit text="Ideal para consumo fresco y ensaladas." />
            <Benefit text="Alta concentración de vitaminas A y C." />
            <Benefit text="Resistente a plagas comunes del jardín." />
          </View>

          <View style={styles.conditionsCard}>
            <Text style={styles.conditionsTitle}>Condiciones</Text>

            <View style={styles.conditionItem}>
              <View style={styles.conditionHeader}>
                <MaterialCommunityIcons
                  name="water-outline"
                  size={22}
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
                  size={22}
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
                  size={21}
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

        <View style={styles.bottomActions}>
          <TouchableOpacity activeOpacity={0.8} style={styles.primaryButton}>
            <Feather name="plus-circle" size={20} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Agregar a MyHuerto</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.secondaryButton}>
            <Feather name="book-open" size={20} color="#527452" />
            <Text style={styles.secondaryButtonText}>Guía de Cultivo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <View style={styles.statBox}>
      <MaterialCommunityIcons name={icon} size={31} color="#154f1f" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function Benefit({ text }) {
  return (
    <View style={styles.benefitRow}>
      <Feather name="check-circle" size={20} color="#16551f" />
      <Text style={styles.benefitText}>{text}</Text>
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
  scrollContent: {
    paddingBottom: 155,
  },
  header: {
    height: 64,
    backgroundColor: '#f7faf7',
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#154f1f',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    height: 292,
    width: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f7f3df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  badge: {
    backgroundColor: '#c5ebb9',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 12,
  },
  badgeText: {
    color: '#5d805b',
    fontWeight: '800',
    fontSize: 12,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#154f1f',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4d554c',
  },
  statsGrid: {
    marginTop: 26,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 28,
  },
  statBox: {
    width: '47%',
    height: 160,
    backgroundColor: '#f0f3f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  statLabel: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '900',
    color: '#4f584f',
    letterSpacing: 0.7,
  },
  statValue: {
    marginTop: 6,
    fontSize: 27,
    fontWeight: '500',
    color: '#154f1f',
    textAlign: 'center',
    lineHeight: 34,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 74,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#154f1f',
    marginBottom: 14,
  },
  description: {
    fontSize: 18,
    color: '#4f584f',
    lineHeight: 29,
    fontWeight: '500',
    marginBottom: 28,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#2f352f',
    fontWeight: '500',
  },
  conditionsCard: {
    marginHorizontal: 20,
    marginTop: 54,
    backgroundColor: '#efeee9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c9c4bb',
    paddingHorizontal: 24,
    paddingVertical: 26,
  },
  conditionsTitle: {
    fontSize: 25,
    fontWeight: '800',
    color: '#6d542f',
    marginBottom: 18,
  },
  conditionItem: {
    marginBottom: 24,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 8,
  },
  conditionLabel: {
    color: '#6d542f',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  progressBackground: {
    height: 7,
    backgroundColor: '#ebeee8',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    width: '80%',
    height: '100%',
    backgroundColor: '#6d542f',
    borderRadius: 6,
  },
  conditionSmallText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555b52',
  },
  conditionText: {
    fontSize: 17,
    color: '#4b5149',
    lineHeight: 24,
    fontWeight: '500',
  },
  bottomActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f7faf7',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 22,
    borderTopWidth: 1,
    borderTopColor: '#e2e7e1',
  },
  primaryButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#105219',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#c9efc5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  secondaryButtonText: {
    color: '#527452',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});