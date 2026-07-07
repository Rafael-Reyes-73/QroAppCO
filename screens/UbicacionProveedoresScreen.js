import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function UbicacionProveedoresScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="leaf" size={21} color="#154f1f" />
            <Text style={styles.headerTitle}>Ubicación</Text>
          </View>

          <View style={styles.headerRight}>
            <Feather name="bell" size={22} color="#154f1f" />

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Feather name="search" size={22} color="#4d554d" />

            <TextInput
              editable={false}
              placeholder="Buscar proveedores orgánicos..."
              placeholderTextColor="#7c847b"
              style={styles.searchInput}
            />

            <Feather name="sliders" size={22} color="#154f1f" />
          </View>

          <View style={styles.chipsRow}>
            <View style={styles.chipActive}>
              <Text style={styles.chipActiveText}>Querétaro</Text>
            </View>

            <View style={styles.chip}>
              <Text style={styles.chipText}>Corregidora</Text>
            </View>

            <View style={styles.chip}>
              <Text style={styles.chipText}>El Marqués</Text>
            </View>
          </View>
        </View>

        <View style={styles.mapArea}>
          <View style={styles.phone}>
            <View style={styles.phoneTop} />

            <View style={styles.mockMap}>
              <MapMarker top={55} left={40} large />
              <MapMarker top={145} left={120} />
              <MapMarker top={190} left={65} />
              <MapMarker top={220} left={160} large />
              <MapMarker top={265} left={225} large />
              <MapMarker top={310} left={130} />
              <MapMarker top={365} left={210} />
            </View>

            <View style={styles.phoneBottom}>
              <Feather name="book-open" size={18} color="#77a56f" />
              <Feather name="map-pin" size={18} color="#a1b39d" />
              <Feather name="user" size={18} color="#a1b39d" />
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.listButton}>
            <Feather name="list" size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomNav}>
          <NavItem icon="home" label="Inicio" />
          <View style={styles.navActive}>
            <MaterialCommunityIcons name="help-circle-outline" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>Mi Huerto</Text>
          </View>
          <NavItem icon="shopping-bag" label="Tienda" />
          <NavItem icon="user" label="Perfil" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function MapMarker({ top, left, large }) {
  return (
    <View
      style={[
        styles.markerHalo,
        { top, left },
        large && styles.markerHaloLarge,
      ]}
    >
      <View style={[styles.marker, large && styles.markerLarge]}>
        <Feather name="map-pin" size={large ? 20 : 16} color="#ffffff" />
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
    fontSize: 25,
    fontWeight: '900',
    marginLeft: 7,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 10,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    backgroundColor: '#f7faf7',
    paddingHorizontal: 40,
    paddingTop: 24,
    paddingBottom: 24,
  },
  searchBox: {
    height: 86,
    borderRadius: 44,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  chipsRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  chipActive: {
    backgroundColor: '#105219',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginRight: 8,
  },
  chipActiveText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  chip: {
    backgroundColor: '#c9efc5',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginRight: 8,
  },
  chipText: {
    color: '#5a7c58',
    fontSize: 14,
    fontWeight: '900',
  },
  mapArea: {
    flex: 1,
    backgroundColor: '#e7ebe7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 82,
  },
  phone: {
    width: 220,
    height: 450,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: '#111',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 7,
  },
  phoneTop: {
    height: 42,
    backgroundColor: '#f7faf7',
  },
  mockMap: {
    flex: 1,
    backgroundColor: '#eeecd9',
    position: 'relative',
  },
  phoneBottom: {
    height: 45,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  markerHalo: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(45,97,41,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHaloLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  marker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2d6129',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerLarge: {
    width: 33,
    height: 33,
    borderRadius: 17,
  },
  listButton: {
    position: 'absolute',
    right: 24,
    bottom: 105,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2d6129',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 88,
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