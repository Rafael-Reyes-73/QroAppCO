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

export default function InicioScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.userBox}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.hola}>¡Hola!</Text>
                <Text style={styles.name}>Carlos</Text>
              </View>
            </View>

            <View style={styles.headerIcons}>
              <Feather name="bell" size={22} color="#144e1c" />
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={22} color="#144e1c" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchBox}>
            <Feather name="search" size={23} color="#6d766c" />
            <TextInput
              editable={false}
              placeholder="Busca semillas, guías o plantas..."
              placeholderTextColor="#737486"
              style={styles.searchInput}
            />
          </View>

          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.banner}
            imageStyle={styles.bannerRadius}
          >
            <View style={styles.bannerTextBox}>
              <Text style={styles.bannerTitle}>Es temporada de Siembras</Text>
              <Text style={styles.bannerText}>Descubre qué plantar hoy en tu huerto.</Text>

              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Ver Guía</Text>
              </View>
            </View>
          </ImageBackground>

          <Text style={styles.sectionTitle}>Explora el Ecosistema</Text>

          <View style={styles.grid}>
            <EcoCard icon="sprout" title="Catálogo" subtitle="640 Variedades" color="#c9efc5" />
            <EcoCard icon="seed-outline" title="MyHuerto" subtitle="3 Activos" color="#c9efc5" />
            <EcoCard icon="help-box-outline" title="Test" subtitle="" color="#ffe1b7" />
            <EcoCard icon="map-marker-outline" title="Ubicación" subtitle="" color="#c9efc5" />
            <EcoCard icon="shopping-bag" title="QroStore" subtitle="" color="#c9efc5" />
            <EcoCard icon="play-circle-outline" title="QroPlay" subtitle="" color="#c9efc5" />
          </View>

          <View style={styles.recoHeader}>
            <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
            <Text style={styles.verTodo}>Ver todo</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <RecommendationCard
              title="Siembra de Tomates"
              category="TEMPORADA"
              text="Ideal para el clima de esta semana en Querétaro."
              image="https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80"
            />

            <RecommendationCard
              title="Cuida tu Albahaca"
              category="CUIDADO"
              text="Mantén humedad constante todo el año."
              image="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80"
            />
          </ScrollView>
        </ScrollView>

        <View style={styles.bottomNav}>
          <View style={styles.navActive}>
            <MaterialCommunityIcons name="basket" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>Catalog</Text>
          </View>

          <NavItem icon="heart" label="Favorites" />
          <NavItem icon="shopping-bag" label="Orders" />
          <NavItem icon="user" label="Profile" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function EcoCard({ icon, title, subtitle, color }) {
  return (
    <View style={styles.ecoCard}>
      <View style={[styles.ecoIcon, { backgroundColor: color }]}>
        <MaterialCommunityIcons name={icon} size={25} color="#154f1f" />
      </View>

      <View>
        <Text style={styles.ecoTitle}>{title}</Text>
        {subtitle ? <Text style={styles.ecoSubtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

function RecommendationCard({ image, title, category, text }) {
  return (
    <View style={styles.recoCard}>
      <ImageBackground source={{ uri: image }} style={styles.recoImage} imageStyle={styles.recoImageRadius}>
        <View style={styles.heartCircle}>
          <Feather name="heart" size={21} color="#d71920" />
        </View>
      </ImageBackground>

      <View style={styles.recoBody}>
        <Text style={styles.recoCategory}>{category}</Text>
        <Text style={styles.recoTitle}>{title}</Text>
        <Text style={styles.recoText}>{text}</Text>
      </View>
    </View>
  );
}

function NavItem({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <Feather name={icon} size={22} color="#3d463c" />
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
  scrollContent: {
    padding: 20,
    paddingBottom: 115,
  },
  header: {
    marginTop: 12,
    marginBottom: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#b9f2b3',
    marginRight: 12,
  },
  hola: {
    fontSize: 12,
    fontWeight: '800',
    color: '#566057',
  },
  name: {
    fontSize: 27,
    color: '#154f1f',
    fontWeight: '900',
    marginTop: -3,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#e9f2e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 11,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    color: '#555',
  },
  banner: {
    height: 175,
    marginBottom: 28,
    justifyContent: 'center',
  },
  bannerRadius: {
    borderRadius: 10,
  },
  bannerTextBox: {
    width: '50%',
    height: '100%',
    backgroundColor: 'rgba(31,91,36,0.96)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 24,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 36,
  },
  bannerText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  bannerButton: {
    marginTop: 14,
    backgroundColor: '#bdf1b5',
    paddingVertical: 11,
    borderRadius: 22,
    alignItems: 'center',
  },
  bannerButtonText: {
    color: '#154f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  sectionTitle: {
    fontSize: 25,
    color: '#154f1f',
    fontWeight: '900',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ecoCard: {
    width: '48%',
    height: 145,
    backgroundColor: '#ffffff',
    borderRadius: 11,
    padding: 14,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  ecoIcon: {
    width: 41,
    height: 41,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ecoTitle: {
    fontSize: 20,
    color: '#154f1f',
    fontWeight: '500',
  },
  ecoSubtitle: {
    fontSize: 12,
    color: '#343d34',
    fontWeight: '800',
  },
  recoHeader: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  verTodo: {
    color: '#154f1f',
    fontWeight: '900',
    marginTop: 10,
  },
  recoCard: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 22,
    overflow: 'hidden',
  },
  recoImage: {
    height: 130,
  },
  recoImageRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartCircle: {
    position: 'absolute',
    right: 12,
    top: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoBody: {
    padding: 14,
  },
  recoCategory: {
    color: '#154f1f',
    fontSize: 12,
    fontWeight: '900',
  },
  recoTitle: {
    color: '#154f1f',
    fontSize: 19,
    marginTop: 6,
  },
  recoText: {
    marginTop: 6,
    color: '#505950',
    fontSize: 14,
    lineHeight: 20,
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
    width: 90,
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