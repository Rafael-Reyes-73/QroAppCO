import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Bottom nav premium y persistente para QroStore
export default function QroStoreBottomNav({ active, onNavigate }) {
  const items = [
    { id: 'inicio', icon: 'home', label: 'Inicio' },
    { id: 'tienda', icon: 'shopping-bag', label: 'Tienda' },
    { id: 'favoritos', icon: 'heart', label: 'Favoritos' },
    { id: 'perfil', icon: 'user', label: 'Perfil' },
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onNavigate(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Feather
                name={item.icon}
                size={20}
                color={isActive ? '#ffffff' : '#6a8a6e'}
              />
            </View>
            <Text style={[styles.navText, isActive && styles.navTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 74,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(13, 138, 78, 0.06)',
    paddingBottom: Platform.OS === 'ios' ? 18 : 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 4,
    width: 64,
  },
  iconWrap: {
    width: 42,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapActive: {
    backgroundColor: '#0d8a4e',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  navText: {
    fontSize: 10,
    color: '#6a8a6e',
    fontWeight: '600',
    marginTop: 3,
    letterSpacing: 0.2,
  },
  navTextActive: {
    color: '#0d8a4e',
    fontWeight: '700',
  },
});
