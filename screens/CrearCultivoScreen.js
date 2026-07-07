import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CrearCultivoScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Feather name="arrow-left" size={24} color="#154f1f" />

          <Text style={styles.headerTitle}>Crear Cultivo</Text>

          <View style={styles.headerRight}>
            <Feather name="settings" size={22} color="#154f1f" />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={21} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.steps}>
            <Step number="1" label="Semilla" active />
            <View style={styles.stepLine} />
            <Step number="2" label="Detalles" />
            <View style={styles.stepLine} />
            <Step number="3" label="Guía" />
            <View style={styles.stepLine} />
            <Step number="4" label="Resumen" />
          </View>

          <Text style={styles.title}>Selecciona tu semilla</Text>

          <View style={styles.searchBox}>
            <Feather name="search" size={22} color="#737b72" />
            <TextInput
              editable={false}
              placeholder="Buscar semilla (ej. Tomate Roma)"
              placeholderTextColor="#b8c0b7"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.seedRow}>
            <SeedCard
              selected
              title="Tomate Roma"
              subtitle="Solanum lycopersicum"
              image="https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80"
            />

            <SeedCard
              title="Brocoli"
              subtitle="Ocimum basilicum"
              image="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80"
            />
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.continueButton}>
            <Text style={styles.continueText}>Continuar</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomNav}>
          <NavItem icon="sprout-outline" label="Catalog" />
          <View style={styles.navActive}>
            <MaterialCommunityIcons name="sprout" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>My Garden</Text>
          </View>
          <NavItem icon="calendar-text-outline" label="Activity" />
          <NavItem icon="book-open-page-variant-outline" label="Expert" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Step({ number, label, active }) {
  return (
    <View style={styles.stepItem}>
      <View style={[styles.stepCircle, active && styles.stepCircleActive]}>
        <Text style={[styles.stepNumber, active && styles.stepNumberActive]}>{number}</Text>
      </View>
      <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{label}</Text>
    </View>
  );
}

function SeedCard({ selected, title, subtitle, image }) {
  return (
    <View style={[styles.seedCard, selected && styles.seedCardSelected]}>
      <ImageBackground source={{ uri: image }} style={styles.seedImage} imageStyle={styles.seedImageRadius}>
        {selected && (
          <View style={styles.checkCircle}>
            <Feather name="check" size={15} color="#154f1f" />
          </View>
        )}
      </ImageBackground>

      <Text style={styles.seedTitle}>{title}</Text>
      <Text style={styles.seedSubtitle}>{subtitle}</Text>
    </View>
  );
}

function NavItem({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <MaterialCommunityIcons name={icon} size={22} color="#3d463c" />
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
    paddingHorizontal: 22,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#154f1f',
    fontSize: 25,
    fontWeight: '900',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  steps: {
    marginTop: 10,
    marginBottom: 42,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stepItem: {
    alignItems: 'center',
    width: 65,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dfe3df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#105219',
  },
  stepNumber: {
    color: '#4d554d',
    fontSize: 16,
    fontWeight: '900',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepLabel: {
    marginTop: 9,
    fontSize: 12,
    fontWeight: '800',
    color: '#343d34',
  },
  stepLabelActive: {
    color: '#154f1f',
  },
  stepLine: {
    width: 28,
    height: 2,
    backgroundColor: '#b7c5b4',
    marginTop: 19,
  },
  title: {
    fontSize: 29,
    color: '#154f1f',
    fontWeight: '900',
    marginBottom: 24,
  },
  searchBox: {
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },
  seedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seedCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 9,
    padding: 12,
  },
  seedCardSelected: {
    borderWidth: 2,
    borderColor: '#105219',
  },
  seedImage: {
    height: 128,
    marginBottom: 10,
  },
  seedImageRadius: {
    borderRadius: 7,
  },
  checkCircle: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seedTitle: {
    color: '#154f1f',
    fontSize: 15,
    fontWeight: '900',
  },
  seedSubtitle: {
    color: '#505850',
    fontSize: 12,
    marginTop: 2,
  },
  continueButton: {
    height: 53,
    borderRadius: 28,
    backgroundColor: '#105219',
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 5,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 16,
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
    width: 98,
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