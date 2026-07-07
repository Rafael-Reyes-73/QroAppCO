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

export default function TestEspacioDisponibleScreen({ onClose }) {
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
          <View style={styles.progressHeader}>
            <Text style={styles.stepText}>PASO 3 DE 3</Text>
            <Text style={styles.percentText}>100%</Text>
          </View>

          <Text style={styles.title}>¿De cuánto espacio dispones?</Text>

          <View style={styles.progressBg}>
            <View style={styles.progressFill} />
          </View>

          <OptionCard
            icon="flower-tulip-outline"
            title="Macetas/Balcón"
            text="Ideal para espacios urbanos y cultivo vertical."
          />

          <OptionCard
            icon="greenhouse"
            title="Huerto pequeño"
            text="Menos de 5m². Perfecto para un autoconsumo básico."
          />

          <OptionCard
            icon="tractor"
            title="Huerto mediano"
            text="De 5 a 20m². Espacio para rotación de cultivos variados."
          />

          <OptionCard
            icon="image-filter-hdr"
            title="Terreno amplio"
            text="Más de 20m². Capacidad para frutales y grandes surcos."
          />

          <View style={styles.planCard}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
              }}
              style={styles.planImage}
              imageStyle={styles.planImageRadius}
            />

            <Text style={styles.planTitle}>Preparando tu plan personalizado</Text>
            <Text style={styles.planText}>
              Al seleccionar tu espacio, calcularemos automáticamente las
              variedades de semillas más óptimas para tu clima y el rendimiento
              estimado de tu cosecha.
            </Text>

            <View style={styles.planBadge}>
              <Feather name="calendar" size={16} color="#4f5c4f" />
              <Text style={styles.planBadgeText}>Ciclo de 12 meses</Text>
            </View>

            <View style={styles.planBadge}>
              <MaterialCommunityIcons name="water-outline" size={18} color="#4f5c4f" />
              <Text style={styles.planBadgeText}>Riego inteligente</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtons}>
          <TouchableOpacity activeOpacity={0.85} style={styles.backButton}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.finishButton}>
            <Text style={styles.finishText}>Finalizar y Ver Resultados</Text>
            <Feather name="arrow-right" size={19} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function OptionCard({ icon, title, text }) {
  return (
    <View style={styles.optionCard}>
      <View style={styles.optionIconBox}>
        <MaterialCommunityIcons name={icon} size={27} color="#154f1f" />
      </View>

      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionText}>{text}</Text>
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
    marginLeft: 7,
    fontSize: 24,
    color: '#154f1f',
    fontWeight: '900',
  },
  scrollContent: {
    padding: 40,
    paddingBottom: 150,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepText: {
    color: '#537456',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  percentText: {
    color: '#154f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  title: {
    color: '#154f1f',
    fontSize: 29,
    fontWeight: '900',
    lineHeight: 36,
    marginTop: 12,
    marginBottom: 18,
  },
  progressBg: {
    height: 7,
    backgroundColor: '#e2e6e2',
    borderRadius: 5,
    marginBottom: 48,
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#105219',
    borderRadius: 5,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 9,
    padding: 26,
    height: 208,
    marginBottom: 20,
    justifyContent: 'center',
  },
  optionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 7,
    backgroundColor: '#c9efc5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionTitle: {
    color: '#242a24',
    fontSize: 27,
    fontWeight: '800',
    marginBottom: 10,
  },
  optionText: {
    color: '#5a6259',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '600',
  },
  planCard: {
    marginTop: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d7ded6',
    backgroundColor: '#f0f7ef',
    padding: 32,
  },
  planImage: {
    height: 160,
    marginBottom: 36,
  },
  planImageRadius: {
    borderRadius: 8,
  },
  planTitle: {
    color: '#154f1f',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
    marginBottom: 16,
  },
  planText: {
    color: '#5a6259',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  planBadge: {
    height: 34,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planBadgeText: {
    color: '#4f5c4f',
    fontSize: 14,
    fontWeight: '900',
    marginLeft: 8,
  },
  bottomButtons: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 40,
    paddingTop: 13,
    paddingBottom: 22,
  },
  backButton: {
    height: 44,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  backText: {
    color: '#5a7c58',
    fontSize: 14,
    fontWeight: '900',
  },
  finishButton: {
    height: 49,
    borderRadius: 25,
    backgroundColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  finishText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    marginRight: 8,
  },
});