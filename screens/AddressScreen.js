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

export default function AddressScreen() {
  const [selectedAddress, setSelectedAddress] = useState('Hogar');
  const [showForm, setShowForm] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Direccion de Envio</Text>
        <Text style={styles.subtitle}>Seleccionar direccion</Text>
        <Text style={styles.addressCount}>2 Registradas</Text>

        <TouchableOpacity style={[styles.addressCard, selectedAddress === 'Hogar' && styles.addressCardActive]} onPress={() => setSelectedAddress('Hogar')}>
          <View style={styles.addressHeader}>
            <View style={styles.addressNameContainer}>
              <Text style={styles.addressName}>Hogar</Text>
              <View style={styles.defaultBadge}><Text style={styles.defaultBadgeText}>Predeterminada</Text></View>
            </View>
            <Text style={styles.editText}>Editar</Text>
          </View>
          <Text style={styles.addressText}>Av. Constituyentes 124, Int. 4B</Text>
          <Text style={styles.addressCity}>Centro, Queretaro, QRO. 76000</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.addressCard, selectedAddress === 'Trabajo' && styles.addressCardActive]} onPress={() => setSelectedAddress('Trabajo')}>
          <View style={styles.addressHeader}>
            <View style={styles.addressNameContainer}>
              <Text style={styles.addressName}>Trabajo</Text>
            </View>
            <Text style={styles.editText}>Editar</Text>
          </View>
          <Text style={styles.addressText}>Parque Industrial Bernardo Quintana</Text>
          <Text style={styles.addressCity}>El Marques, Queretaro, QRO. 76246</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newAddressBtn} onPress={() => setShowForm(!showForm)}>
          <Text style={styles.newAddressText}>Registrar nueva direccion</Text>
        </TouchableOpacity>

        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Detalles de Entrega</Text>
            <Text style={styles.formSubtitle}>Completa los campos requeridos (*)</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Calle</Text>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.input} placeholder="Calle *" placeholderTextColor="#8ab89a" />
                <Text style={styles.charCount}>0/100</Text>
              </View>
              <Text style={styles.helperText}>Ej. Calle de la Amargura</Text>
            </View>

            <View style={styles.rowDuo}>
              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>Num. Ext.</Text>
                <View style={styles.inputWrapper}><TextInput style={styles.input} placeholder="Ej. 12" placeholderTextColor="#8ab89a" /></View>
              </View>
              <View style={[styles.formGroup, styles.flex1]}>
                <Text style={styles.label}>Num. Int.</Text>
                <View style={styles.inputWrapper}><TextInput style={styles.input} placeholder="Ej. Depto 4" placeholderTextColor="#8ab89a" /></View>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Municipio</Text>
              <TouchableOpacity style={styles.selectWrapper}>
                <Text style={styles.selectPlaceholder}>Selecciona municipio</Text>
                <Text style={styles.selectArrow}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Codigo Postal</Text>
              <View style={styles.inputWrapper}><TextInput style={styles.input} placeholder="Ej. 76000" placeholderTextColor="#8ab89a" keyboardType="numeric" /></View>
            </View>

            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Guardar y Continuar →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.secureContainer}>
          <Text style={styles.secureText}><Text style={styles.secureBold}>PAGO SEGURO</Text> POR QROSTORE</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f9f7' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', color: '#0b2a1a', marginBottom: 4 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#0b2a1a', marginBottom: 2 },
  addressCount: { fontSize: 14, color: '#4a7a5e', marginBottom: 16 },
  addressCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: '#e8f5ee' },
  addressCardActive: { borderColor: '#0b3a1e', backgroundColor: '#f2faf5' },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  addressNameContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addressName: { fontSize: 15, fontWeight: '600', color: '#0b2a1a' },
  defaultBadge: { backgroundColor: '#e6f5ed', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 40, borderWidth: 1, borderColor: '#b8dfc8' },
  defaultBadgeText: { fontSize: 9, fontWeight: '600', color: '#1a7540', textTransform: 'uppercase' },
  editText: { fontSize: 13, fontWeight: '500', color: '#1a7540' },
  addressText: { fontSize: 14, color: '#0b2a1a', marginBottom: 2 },
  addressCity: { fontSize: 13, color: '#4a7a5e' },
  newAddressBtn: { backgroundColor: '#fff', paddingVertical: 14, borderRadius: 60, borderWidth: 2, borderColor: '#0b3a1e', borderStyle: 'dashed', alignItems: 'center', marginBottom: 16 },
  newAddressText: { fontSize: 15, fontWeight: '600', color: '#0b3a1e' },
  formContainer: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 16 },
  formTitle: { fontSize: 18, fontWeight: '700', color: '#0b2a1a', marginBottom: 4 },
  formSubtitle: { fontSize: 13, color: '#4a7a5e', marginBottom: 16 },
  formGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: '#0b2a1a', marginBottom: 4 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f9f7', borderWidth: 1.5, borderColor: '#c6e2d4', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 2 },
  input: { flex: 1, fontSize: 15, fontWeight: '500', color: '#0b2a1a', paddingVertical: 10 },
  charCount: { fontSize: 12, color: '#8ab89a' },
  helperText: { fontSize: 12, color: '#8ab89a', marginTop: 4, marginLeft: 4 },
  rowDuo: { flexDirection: 'row', gap: 12 },
  flex1: { flex: 1 },
  selectWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f5f9f7', borderWidth: 1.5, borderColor: '#c6e2d4', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 },
  selectPlaceholder: { fontSize: 15, color: '#8ab89a' },
  selectArrow: { fontSize: 16, color: '#4a7a5e' },
  saveBtn: { backgroundColor: '#0b3a1e', paddingVertical: 16, borderRadius: 60, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  saveBtnText: { color: 'white', fontSize: 17, fontWeight: '600', letterSpacing: 0.4 },
  secureContainer: { backgroundColor: '#e6f5ed', paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#b8dfc8', alignItems: 'center', marginTop: 4 },
  secureText: { fontSize: 13, color: '#1a7540', fontWeight: '500', letterSpacing: 0.5 },
  secureBold: { fontWeight: '700' },
});