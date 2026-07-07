import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function ConfirmationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>QroStore</Text>

        <View style={styles.confirmationHeader}>
          <Text style={styles.confirmationTitle}>¡Gracias por tu compra!</Text>
          <Text style={styles.confirmationText}>Tu pedido ha sido procesado con exito y pronto estara en camino hacia tu jardin.</Text>
          <View style={styles.orderBadge}><Text style={styles.orderBadgeText}>Pedido: #QS-2024-0042</Text></View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Informacion de Envio</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>FECHA ESTIMADA</Text><Text style={styles.infoValue}>15 - 18 de Mayo, 2024</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>DIRECCION DE ENTREGA</Text><Text style={styles.infoValue}>Av. de los Constituyentes 1024, Col. Centro, Queretaro, CP 76000</Text></View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Resumen de Productos</Text></View>
          <View style={styles.productItem}><View><Text style={styles.productName}>Fertilizante Organico Pro</Text><Text style={styles.productDetail}>Cantidad: 1 unidad (5kg)</Text></View><Text style={styles.productPrice}>$54.50</Text></View>
          <View style={styles.productDivider} />
          <View style={styles.productItem}><View><Text style={styles.productName}>Semillas de Tomate Cherry</Text><Text style={styles.productDetail}>Cantidad: 2 sobres (50u)</Text></View><Text style={styles.productPrice}>$22.40</Text></View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Detalle del Pago</Text></View>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Subtotal</Text><Text style={styles.paymentValue}>$76.90</Text></View>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Envio</Text><Text style={[styles.paymentValue, styles.freeText]}>¡Gratis!</Text></View>
          <View style={styles.paymentRow}><Text style={styles.paymentLabel}>Impuestos (IVA)</Text><Text style={styles.paymentValue}>$0.00</Text></View>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total Pagado</Text><Text style={styles.totalValue}>$76.90</Text></View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.trackBtn}><Text style={styles.trackBtnText}>Rastrear Pedido</Text></TouchableOpacity>
          <TouchableOpacity style={styles.homeBtn}><Text style={styles.homeBtnText}>Volver al Inicio</Text></TouchableOpacity>
        </View>

        <View style={styles.invoiceNote}>
          <Text style={styles.invoiceNoteText}>Hemos enviado una copia de tu factura a tu correo electronico registrado.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f9f7' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#0b2a1a', marginBottom: 16 },
  confirmationHeader: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 24, marginBottom: 16 },
  confirmationTitle: { fontSize: 22, fontWeight: '700', color: '#0b2a1a', marginBottom: 8 },
  confirmationText: { fontSize: 14, color: '#4a7a5e', textAlign: 'center', lineHeight: 20, marginBottom: 12 },
  orderBadge: { backgroundColor: '#0b3a1e', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 40 },
  orderBadgeText: { color: 'white', fontSize: 13, fontWeight: '600' },
  section: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 16 },
  sectionHeader: { marginBottom: 12, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e8f5ee' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#0b2a1a' },
  infoRow: { marginBottom: 12 },
  infoLabel: { fontSize: 11, fontWeight: '600', color: '#4a7a5e', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 },
  infoValue: { fontSize: 14, color: '#0b2a1a', fontWeight: '500' },
  productItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  productName: { fontSize: 14, fontWeight: '600', color: '#0b2a1a' },
  productDetail: { fontSize: 12, color: '#4a7a5e' },
  productPrice: { fontSize: 14, fontWeight: '600', color: '#0b3a1e' },
  productDivider: { height: 1, backgroundColor: '#e8f5ee', marginVertical: 8 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  paymentLabel: { fontSize: 14, color: '#4a7a5e' },
  paymentValue: { fontSize: 14, fontWeight: '500', color: '#0b2a1a' },
  freeText: { color: '#1a7540', fontWeight: '600' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, marginTop: 6, borderTopWidth: 2, borderTopColor: '#c6e2d4' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#0b2a1a' },
  totalValue: { fontSize: 18, fontWeight: '700', color: '#0b3a1e' },
  actionContainer: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  trackBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b3a1e', paddingVertical: 14, borderRadius: 60 },
  trackBtnText: { color: 'white', fontSize: 15, fontWeight: '600' },
  homeBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 14, borderRadius: 60, borderWidth: 2, borderColor: '#0b3a1e' },
  homeBtnText: { color: '#0b3a1e', fontSize: 15, fontWeight: '600' },
  invoiceNote: { backgroundColor: '#e6f5ed', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 16 },
  invoiceNoteText: { fontSize: 13, color: '#1a7540', lineHeight: 18 },
});