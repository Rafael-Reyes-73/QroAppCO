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

export default function FavoritosScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="leaf" size={20} color="#154f1f" />
            <Text style={styles.headerTitle}>Favoritos</Text>
          </View>

          <View style={styles.headerIcons}>
            <Feather name="bell" size={21} color="#3d463c" />
            <Feather name="search" size={22} color="#3d463c" />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={21} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Mis Favoritos</Text>
          <Text style={styles.subtitle}>
            Gestiona tus semillas preferidas y comienza tu próximo cultivo orgánico.
          </Text>

          <FavoriteCard
            image="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80"
            tag="Frutas & Verduras"
            title="Tomate Heirloom"
            text="Variedad orgánica premium con gran resistencia y sabor intenso."
          />

          <FavoriteCard
            image="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80"
            tag="Hierbas"
            title="Brocoli"
            text="Pequeño, ideal para climas templados y huertos urbanos."
          />

          <FavoriteCard
            image="https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80"
            tag="Raíces"
            title="Zanahoria Nantes"
            text="Dulce y crujiente, perfecta para suelos profundos y cultivo durante todo el..."
          />
        </ScrollView>

        <View style={styles.bottomNav}>
          <NavItem icon="home" label="Inicio" />
          <View style={styles.navActive}>
            <MaterialCommunityIcons name="help-box" size={19} color="#5a7c58" />
            <Text style={styles.navActiveText}>Mi Huerto</Text>
          </View>
          <NavItem icon="shopping-bag" label="Tienda" />
          <NavItem icon="user" label="Perfil" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function FavoriteCard({ image, tag, title, text }) {
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.cardImage} imageStyle={styles.cardImageRadius}>
        <View style={styles.heartCircle}>
          <MaterialCommunityIcons name="heart" size={24} color="#c71920" />
        </View>

        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{text}</Text>

        <View style={styles.cardButtons}>
          <TouchableOpacity activeOpacity={0.8} style={styles.detailButton}>
            <Text style={styles.detailText}>Ver Detalles</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.startButton}>
            <Text style={styles.startText}>Iniciar Cultivo</Text>
          </TouchableOpacity>
        </View>
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
    color: '#154f1f',
    fontWeight: '900',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 11,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 112,
  },
  title: {
    color: '#154f1f',
    fontSize: 29,
    fontWeight: '900',
    marginBottom: 5,
  },
  subtitle: {
    color: '#4d554d',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    height: 230,
  },
  cardImageRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartCircle: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    position: 'absolute',
    left: 16,
    bottom: 12,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#c9efc5',
  },
  tagText: {
    color: '#5a7c58',
    fontSize: 12,
    fontWeight: '900',
  },
  cardBody: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 24,
  },
  cardTitle: {
    color: '#154f1f',
    fontSize: 27,
    fontWeight: '900',
  },
  cardText: {
    color: '#4e564e',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 6,
  },
  cardButtons: {
    flexDirection: 'row',
    marginTop: 22,
  },
  detailButton: {
    width: 114,
    height: 48,
    borderRadius: 7,
    backgroundColor: '#e6eae6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailText: {
    color: '#154f1f',
    fontSize: 14,
    fontWeight: '900',
  },
  startButton: {
    flex: 1,
    height: 48,
    borderRadius: 7,
    backgroundColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    color: '#ffffff',
    fontSize: 15,
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
    width: 86,
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