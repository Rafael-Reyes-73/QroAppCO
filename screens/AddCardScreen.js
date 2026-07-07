import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function AddCardScreen() {
  const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000');
  const [cardHolder, setCardHolder] = useState('Juan Perez');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('...');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Agregar Tarjeta</Text>

        {/* Tarjeta de crédito estilo imagen */}
        <View style={styles.creditCard}>
          <View style={styles.cardTop}>
            <View style={styles.cardChip}>
              <View style={styles.chipLine} />
              <View style={styles.chipLine} />
              <View style={styles.chipLine} />
            </View>
            <View style={styles.cardBrand}>
              <View style={styles.brandCircle} />
              <View style={[styles.brandCircle, styles.brandCircleRight]} />
            </View>
          </View>
          <Text style={styles.cardNumber}>{cardNumber}</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>TITULAR</Text>
              <Text style={styles.cardValue}>{cardHolder.toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>EXPIRA</Text>
              <Text style={styles.cardValue}>{expiry}</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>CVV</Text>
              <Text style={styles.cardValue}>{cvv}</Text>
            </View>
          </View>
        </View>

        {/* Badge estilo imagen */}
        <View style={styles.badgeRow}>
          <Text style={styles.badgeText}>TITULAR</Text>
          <Text style={styles.badgeSpacer}>·</Text>
          <Text style={styles.badgeText}>NOMBRE DEL TITULAR</Text>
          <Text style={styles.badgeSpacer}>·</Text>
          <Text style={styles.badgeText}>MM/AA</Text>
          <Text style={styles.badgeSpacer}>·</Text>
          <Text style={styles.badgeText}>EXPIRA</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Número de tarjeta</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor="#b0c4d8"
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del titular</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={cardHolder}
              onChangeText={setCardHolder}
              placeholder="Ej. Juan Pérez"
              placeholderTextColor="#b0c4d8"
            />
          </View>
        </View>

        <View style={styles.rowDuo}>
          <View style={[styles.formGroup, styles.flex1]}>
            <Text style={styles.label}>Fecha (MM/AA)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={expiry}
                onChangeText={setExpiry}
                placeholder="12/28"
                placeholderTextColor="#b0c4d8"
              />
            </View>
          </View>
          <View style={[styles.formGroup, styles.flex1]}>
            <Text style={styles.label}>CVV</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={setCvv}
                placeholder="..."
                placeholderTextColor="#b0c4d8"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        {/* Pago Seguro */}
        <View style={styles.secureBadge}>
          <Text style={styles.secureText}>
            <Text style={styles.secureBold}>Pago Seguro:</Text> Tus datos están encriptados
          </Text>
        </View>

        {/* Botón Registrar */}
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>Registrar Tarjeta →</Text>
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
    marginBottom: 20,
  },
  // Estilos de la tarjeta de crédito
  creditCard: {
    backgroundColor: '#0f3d2a',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    minHeight: 200,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardChip: {
    width: 48,
    height: 32,
    backgroundColor: '#c6e9b0',
    borderRadius: 6,
    padding: 4,
    justifyContent: 'space-around',
  },
  chipLine: {
    height: 2,
    backgroundColor: '#8ab37a',
    borderRadius: 1,
    marginHorizontal: 3,
  },
  cardBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
  },
  brandCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
    position: 'absolute',
    right: 4,
  },
  brandCircleRight: {
    right: 0,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 4,
    marginBottom: 20,
    fontFamily: 'System',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  cardLabel: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#b0d6a0',
    opacity: 0.7,
    marginBottom: 3,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    letterSpacing: 0.5,
  },
  // Badge estilo imagen
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#eef2f6',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: '#3f5575',
    textTransform: 'uppercase',
  },
  badgeSpacer: {
    color: '#cbd5e1',
    fontWeight: '300',
    marginHorizontal: 6,
    fontSize: 14,
  },
  // Formulario
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2b405a',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fbfd',
    borderWidth: 1.5,
    borderColor: '#e2e9f2',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    color: '#0e1f33',
    letterSpacing: 0.5,
  },
  rowDuo: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  // Pago Seguro
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3faf7',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#d9ece2',
    marginVertical: 20,
    alignSelf: 'flex-start',
  },
  secureText: {
    fontSize: 14,
    color: '#1d6b4a',
    fontWeight: '400',
  },
  secureBold: {
    fontWeight: '600',
  },
  // Botón Registrar
  registerBtn: {
    backgroundColor: '#0b3a1e',
    paddingVertical: 16,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 30,
  },
  registerBtnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});