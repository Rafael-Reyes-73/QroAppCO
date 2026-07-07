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

export default function ResultadosTestScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="leaf" size={20} color="#154f1f" />
            <Text style={styles.headerTitle}>Test</Text>
          </View>

          <View style={styles.headerIcons}>
            <Feather name="search" size={22} color="#154f1f" />

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={21} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.kicker}>ANÁLISIS DE SUELO Y CLIMA</Text>
          <Text style={styles.title}>Tus Recomendaciones Ideales</Text>

          <Text style={styles.description}>
            Basado en tus condiciones actuales de iluminación y tipo de sustrato,
            estas variedades tienen la mayor probabilidad de éxito en tu hogar.
          </Text>

          <ResultCard
            image="https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&w=900&q=80"
            compatibility="95% Compatible"
            tag="Fruto"
            title="Tomate Cherry"
            text="Ideal para balcones con alta exposición solar. Produce frutos..."
          />

          <ResultCard
            image="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80"
            compatibility="92% Compatible"
            tag="Aromática"
            title="Brocoli"
            text="Perfecto para interiores cerca de ventanas. Su aroma repele plagas..."
          />

          <ResultCard
            image="https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80"
            compatibility="88% Compatible"
            tag="Hortaliza"
            title="Tomate Roma"
            text="Resistente a climas más frescos. Crecimiento rápido ideal para..."
          />

          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>¿No encontraste lo que buscabas?</Text>
            <Text style={styles.emptyText}>
              Ajusta los parámetros de tu test para explorar nuevas variedades
              que se adapten a diferentes rincones de tu espacio.
            </Text>

            <TouchableOpacity activeOpacity={0.85} style={styles.repeatButton}>
              <Feather name="refresh-cw" size={17} color="#ffffff" />
              <Text style={styles.repeatText}>Repetir Test</Text>
            </TouchableOpacity>
          </View>
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

function ResultCard({ image, compatibility, tag, title, text }) {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.cardImage}
        imageStyle={styles.cardImageRadius}
      >
        <View style={styles.favoriteCircle}>
          <Feather name="heart" size={23} color="#5c8759" />
        </View>

        <View style={styles.compatibilityBadge}>
          <Feather name="star" size={12} color="#d7f2d0" />
          <Text style={styles.compatibilityText}>{compatibility}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <View style={styles.cardInfo}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>

            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardText}>{text}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.plusButton}>
            <Feather name="plus" size={24} color="#154f1f" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.detailButton}>
          <Text style={styles.detailText}>Ver Detalle</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
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
    fontSize: 23,
    fontWeight: '900',
    color: '#154f1f',
  },
  headerIcons: {
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
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 120,
  },
  kicker: {
    color: '#537456',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  title: {
    color: '#154f1f',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
    marginBottom: 16,
  },
  description: {
    color: '#5a6259',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 9,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    height: 216,
  },
  cardImageRadius: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
  favoriteCircle: {
    position: 'absolute',
    top: 15,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#d8ecd2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compatibilityBadge: {
    position: 'absolute',
    left: 13,
    bottom: 15,
    backgroundColor: 'rgba(43,112,51,0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatibilityText: {
    color: '#d7f2d0',
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 4,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
  },
  cardTop: {
    flexDirection: 'row',
  },
  cardInfo: {
    flex: 1,
  },
  tag: {
    backgroundColor: '#f3eee6',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  tagText: {
    color: '#d7c8ac',
    fontSize: 11,
    fontWeight: '800',
  },
  cardTitle: {
    color: '#154f1f',
    fontSize: 21,
    fontWeight: '900',
  },
  cardText: {
    marginTop: 6,
    color: '#545c54',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  plusButton: {
    width: 33,
    height: 33,
    borderRadius: 9,
    backgroundColor: '#c8efc5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  detailButton: {
    height: 37,
    backgroundColor: '#105219',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  detailText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  emptyBox: {
    marginTop: 32,
    backgroundColor: '#ccefc7',
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 46,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#5c785a',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 27,
    textAlign: 'center',
    marginBottom: 14,
  },
  emptyText: {
    color: '#5c785a',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 28,
  },
  repeatButton: {
    height: 43,
    borderRadius: 24,
    backgroundColor: '#105219',
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  repeatText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 8,
    letterSpacing: 0.5,
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