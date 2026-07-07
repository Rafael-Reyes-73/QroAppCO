import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MetodoPagoScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Feather name="arrow-left" size={24} color="#154f1f" />
          <Text style={styles.headerTitle}>Selecciona cómo quieres pagar</Text>

          <View style={styles.headerIcons}>
            <Feather name="more-vertical" size={22} color="#154f1f" />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={21} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionLabel}>Métodos Guardados</Text>

          <PaymentCard
            selected
            icon="credit-card-outline"
            title="Visa •••• 4242"
            subtitle="Expira 12/26"
          />

          <PaymentCard
            icon="cash"
            title="Mastercard •••• 8888"
            subtitle="Expira 09/25"
          />

          <View style={styles.addBox}>
            <Feather name="plus-circle" size={21} color="#536052" />
            <Text style={styles.addText}>Agregar nuevo método</Text>
          </View>

          <View style={styles.securityBox}>
            <MaterialCommunityIcons name="shield-check-outline" size={25} color="#154f1f" />
            <View style={styles.securityTextBox}>
              <Text style={styles.securityTitle}>Seguridad Garantizada</Text>
              <Text style={styles.securityText}>
                Tus transacciones están cifradas y protegidas. QroStore nunca almacena el código CVV de tus tarjetas.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.confirmButton}>
          <Text style={styles.confirmText}>Confirmar y Continuar</Text>
          <Feather name="arrow-right" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function PaymentCard({ icon, title, subtitle, selected }) {
  return (
    <View style={styles.paymentCard}>
      <View style={styles.cardIconBox}>
        <MaterialCommunityIcons name={icon} size={25} color="#154f1f" />
      </View>

      <View style={styles.paymentInfo}>
        <Text style={styles.paymentTitle}>{title}</Text>
        <Text style={styles.paymentSubtitle}>{subtitle}</Text>
      </View>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
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
    height: 64,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#111711',
    fontSize: 16,
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginLeft: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#4f584f',
    fontWeight: '900',
    letterSpacing: 1.3,
    marginBottom: 18,
  },
  paymentCard: {
    height: 87,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 49,
    height: 33,
    borderRadius: 4,
    backgroundColor: '#e6eae6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    color: '#161c16',
    fontWeight: '700',
  },
  paymentSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#161c16',
    fontWeight: '500',
  },
  radioOuter: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#bdc8ba',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#154f1f',
  },
  radioInner: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#154f1f',
  },
  addBox: {
    height: 75,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#b8c8b2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -2,
  },
  addText: {
    marginLeft: 7,
    color: '#536052',
    fontSize: 16,
    fontWeight: '500',
  },
  securityBox: {
    marginTop: 64,
    backgroundColor: '#eaf8e9',
    borderRadius: 10,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityTextBox: {
    flex: 1,
    marginLeft: 18,
  },
  securityTitle: {
    color: '#154f1f',
    fontSize: 17,
    fontWeight: '700',
  },
  securityText: {
    color: '#3d5a3c',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  confirmButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#105219',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
});