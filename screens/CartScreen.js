import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const ProductItem = ({ brand, name, details, price, initialQty = 1 }) => {
  const [qty, setQty] = useState(initialQty);
  
  return (
    <View style={styles.productItem}>
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
          <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity onPress={() => setQty(qty + 1)}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function CartScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Mi Carrito</Text>
        
        <View style={styles.stockBadge}>
          <Text style={styles.stockText}>Existencias verificadas. Tus productos están reservados para ti.</Text>
        </View>

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

        <View style={styles.couponBox}>
          <Text style={styles.couponLabel}>¿Tienes un cupón?</Text>
          <View style={styles.couponInputWrapper}>
            <TextInput 
              style={styles.couponInput} 
              placeholder="Código" 
              placeholderTextColor="#8ab89a" 
              defaultValue="Código" 
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.payBtn}>
          <Text style={styles.payBtnText}>Proceder al Pago →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f9f7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0b2a1a',
    marginBottom: 12,
  },
  stockBadge: {
    backgroundColor: '#e6f5ed',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#b8dfc8',
    marginBottom: 20,
  },
  stockText: {
    fontSize: 13,
    color: '#1a7540',
    fontWeight: '500',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5ee',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#c6e2d4',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9ece2',
    marginRight: 12,
  },
  productLetter: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a7540',
  },
  productInfo: {
    flex: 1,
  },
  brand: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2a7a4a',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0b2a1a',
    marginBottom: 1,
  },
  details: {
    fontSize: 12,
    color: '#4a7a5e',
  },
  productRight: {
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0b2a1a',
    marginBottom: 6,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef7f2',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#c6e2d4',
  },
  qtyBtn: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a6a3e',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0b2a1a',
    paddingHorizontal: 4,
    minWidth: 24,
    textAlign: 'center',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#d9ece2',
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b2a1a',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#3a6a4e',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0b2a1a',
  },
  freeShipping: {
    color: '#1a7540',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: '#c6e2d4',
    marginTop: 8,
    paddingTop: 14,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0b2a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0b3a1e',
  },
  couponBox: {
    backgroundColor: '#f2faf5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#c6e2d4',
    marginVertical: 18,
  },
  couponLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a5a3a',
    marginBottom: 8,
  },
  couponInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#c6e2d4',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0b2a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  applyBtn: {
    backgroundColor: '#0b3a1e',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 40,
  },
  applyBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  payBtn: {
    backgroundColor: '#0b3a1e',
    paddingVertical: 16,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 30,
  },
  payBtnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});