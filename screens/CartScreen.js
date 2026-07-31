import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

const ProductItem = ({ brand, name, details, price, initialQty = 1 }) => {
  const [qty, setQty] = useState(initialQty);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleQtyChange = (change) => {
    const newQty = Math.max(1, qty + change);
    setQty(newQty);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.productItem, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.imageContainer}>
        <Text style={styles.productLetter}>{brand.charAt(0)}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.name}>{name}</Text>
        {details && <Text style={styles.details}>{details}</Text>}
      </View>
      <View style={styles.productRight}>
        <Text style={styles.productPrice}>${price}</Text>
        <View style={styles.qtyControl}>
          <TouchableOpacity 
            style={styles.qtyBtn}
            onPress={() => handleQtyChange(-1)}
            activeOpacity={0.7}
          >
            <Feather name="minus" size={14} color="#0d8a4e" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity 
            style={styles.qtyBtn}
            onPress={() => handleQtyChange(1)}
            activeOpacity={0.7}
          >
            <Feather name="plus" size={14} color="#0d8a4e" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default function CartScreen() {
  const [selectedTab, setSelectedTab] = useState('catalog');

  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'catalog', icon: 'grid', label: 'Catálogo' },
    { id: 'test', icon: 'help-circle', label: 'Test' },
    { id: 'profile', icon: 'user', label: 'Perfil' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />
      
      <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Mi Carrito</Text>
          <TouchableOpacity style={styles.deleteButton}>
            <Feather name="trash-2" size={20} color="#0a3a1a" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stock Badge */}
          <View style={styles.stockBadge}>
            <Feather name="check-circle" size={16} color="#0d8a4e" />
            <Text style={styles.stockText}>
              Existencias verificadas. Tus productos están reservados para ti.
            </Text>
          </View>

          {/* Productos */}
          <ProductItem 
            brand="Fertilizante" 
            name="Orgánico Pro" 
            details="500ml • Nutrición Completa" 
            price="24.90" 
          />
          
          <ProductItem 
            brand="Semillas de Tomate" 
            name="Heirloom • 50 Semillas" 
            details="" 
            price="8.50" 
            initialQty={2} 
          />
          
          <ProductItem 
            brand="Tijeras de Poda" 
            name="Acero Inoxidable Pro" 
            details="" 
            price="35.00" 
          />

          <View style={styles.divider} />
          
          {/* Resumen del pedido */}
          <Text style={styles.summaryTitle}>Resumen del pedido</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$76.90</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envío</Text>
            <Text style={[styles.summaryValue, styles.freeShipping]}>GRATIS</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$76.90</Text>
          </View>

          {/* Cupón */}
          <View style={styles.couponBox}>
            <View style={styles.couponHeader}>
              <Feather name="ticket" size={16} color="#0d8a4e" />
              <Text style={styles.couponLabel}>¿Tienes un cupón?</Text>
            </View>
            <View style={styles.couponInputWrapper}>
              <TextInput 
                style={styles.couponInput} 
                placeholder="Ingresa tu código" 
                placeholderTextColor="#8a9a8e"
                defaultValue="CÓDIGO" 
              />
              <TouchableOpacity style={styles.applyBtn} activeOpacity={0.7}>
                <Text style={styles.applyBtnText}>Aplicar</Text>
                <Feather name="check" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón Pagar */}
          <TouchableOpacity style={styles.payBtn} activeOpacity={0.8}>
            <Text style={styles.payBtnText}>Proceder al Pago</Text>
            <Feather name="arrow-right" size={18} color="#ffffff" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  deleteButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    marginBottom: 20,
    gap: 8,
  },
  stockText: {
    fontSize: 13,
    color: '#0d8a4e',
    fontWeight: '500',
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(13, 138, 78, 0.06)',
  },
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    marginRight: 12,
  },
  productLetter: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0d8a4e',
  },
  productInfo: {
    flex: 1,
  },
  brand: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0d8a4e',
    textTransform: 'uppercase',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0a3a1a',
    marginBottom: 1,
    letterSpacing: 0.2,
  },
  details: {
    fontSize: 12,
    color: '#4a6a4e',
    fontWeight: '400',
  },
  productRight: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 6,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a3a1a',
    paddingHorizontal: 4,
    minWidth: 24,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0a3a1a',
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#4a6a4e',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a3a1a',
  },
  freeShipping: {
    color: '#0d8a4e',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: 'rgba(13, 138, 78, 0.08)',
    marginTop: 8,
    paddingTop: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a3a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d8a4e',
  },
  couponBox: {
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.06)',
    marginVertical: 18,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  couponLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0a3a1a',
  },
  couponInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0a3a1a',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d8a4e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  applyBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d8a4e',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    marginTop: 6,
    marginBottom: 10,
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  payBtnText: {
    color: 'white',
    fontSize: 16,
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