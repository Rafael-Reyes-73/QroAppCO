import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const productos = [
  {
    id: 1,
    nombre: 'Playera QroHuerto',
    categoria: 'Ropa',
    precio: 249,
    descripcion: 'Playera cómoda con diseño ecológico para amantes del huerto urbano.',
    imagen:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    nombre: 'Fertilizante Orgánico',
    categoria: 'Fertilizantes',
    precio: 189,
    descripcion: 'Mezcla natural ideal para fortalecer raíces y mejorar el crecimiento.',
    imagen:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    nombre: 'Tierra Preparada',
    categoria: 'Sustratos',
    precio: 135,
    descripcion: 'Sustrato rico en nutrientes para macetas, jardineras y huertos caseros.',
    imagen:
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    nombre: 'Kit de Herramientas',
    categoria: 'Herramientas',
    precio: 329,
    descripcion: 'Kit básico con pala, rastrillo y atomizador para cuidado diario.',
    imagen:
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
  },
];

export default function QroStoreScreen({ onClose, onNavigate }) {
  const [favoritos, setFavoritos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVista, setModalVista] = useState('pago');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('mastercard');

  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaTarjeta, setFechaTarjeta] = useState('');
  const [cvvTarjeta, setCvvTarjeta] = useState('');

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((item) => item !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const agregarCarrito = (producto) => {
    Alert.alert(
      'Producto añadido al carrito',
      `${producto.nombre} se agregó correctamente al carrito.`
    );
  };

  const abrirCompra = (producto) => {
    setProductoSeleccionado(producto);
    setModalVista('pago');
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setModalVista('pago');
  };

  const confirmarCompra = () => {
    Alert.alert(
      'Compra simulada',
      `Método seleccionado: ${
        metodoSeleccionado === 'mastercard'
          ? 'Mastercard •••• 8888'
          : 'Nueva tarjeta'
      }.`
    );

    cerrarModal();
  };

  const abrirFormularioTarjeta = () => {
    setMetodoSeleccionado('nuevo');
    setModalVista('nuevaTarjeta');
  };

  const confirmarNuevaTarjeta = () => {
    if (
      nombreTarjeta.trim() === '' ||
      numeroTarjeta.trim() === '' ||
      fechaTarjeta.trim() === '' ||
      cvvTarjeta.trim() === ''
    ) {
      Alert.alert('Campos incompletos', 'Completa todos los datos de la tarjeta.');
      return;
    }

    setNombreTarjeta('');
    setNumeroTarjeta('');
    setFechaTarjeta('');
    setCvvTarjeta('');
    setMetodoSeleccionado('mastercard');
    setModalVista('pago');

    Alert.alert('Tarjeta agregada', 'La tarjeta fue agregada exitosamente.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={24}
              color="#154f1f"
            />
            <Text style={styles.headerTitle}>QroStore</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onNavigate('carrito')}
            >
              <Feather name="shopping-cart" size={22} color="#154f1f" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={21} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.searchBox}>
            <Feather name="search" size={22} color="#6d766c" />
            <TextInput
              editable={false}
              placeholder="Buscar productos, semillas o fertilizantes..."
              placeholderTextColor="#7a8179"
              style={styles.searchInput}
            />
          </View>

          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.banner}
            imageStyle={styles.bannerRadius}
          >
            <View style={styles.bannerOverlay} />
            <Text style={styles.bannerTitle}>Todo para tu huerto</Text>
            <Text style={styles.bannerText}>
              Fertilizantes, tierra, semillas y productos QroHuerto.
            </Text>
          </ImageBackground>

          <View style={styles.categoryRow}>
            <CategoryChip label="Todos" active />
            <CategoryChip label="Fertilizantes" />
            <CategoryChip label="Tierra" />
            <CategoryChip label="Ropa" />
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Productos destacados</Text>
            <Text style={styles.sectionLink}>Ver todo</Text>
          </View>

          <View style={styles.productsGrid}>
            {productos.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                favorito={favoritos.includes(producto.id)}
                onFavorito={() => toggleFavorito(producto.id)}
                onCarrito={() => agregarCarrito(producto)}
                onComprar={() => abrirCompra(producto)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.navItem}
            onPress={() => onNavigate('inicio')}
          >
            <Feather name="home" size={21} color="#3d463c" />
            <Text style={styles.navText}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.navItem}
            onPress={() => onNavigate('favoritos')}
          >
            <Feather name="heart" size={21} color="#3d463c" />
            <Text style={styles.navText}>Favoritos</Text>
          </TouchableOpacity>

          <View style={styles.navActive}>
            <Feather name="shopping-bag" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>Tienda</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.navItem}
            onPress={() => onNavigate('perfil')}
          >
            <Feather name="user" size={21} color="#3d463c" />
            <Text style={styles.navText}>Perfil</Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={cerrarModal}
        >
          <KeyboardAvoidingView
            style={styles.modalKeyboard}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                {modalVista === 'pago' ? (
                  <>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Selecciona método de pago</Text>

                      <TouchableOpacity onPress={cerrarModal}>
                        <Feather name="x" size={24} color="#154f1f" />
                      </TouchableOpacity>
                    </View>

                    {productoSeleccionado && (
                      <View style={styles.purchaseSummary}>
                        <Text style={styles.summaryLabel}>Producto</Text>
                        <Text style={styles.summaryName}>
                          {productoSeleccionado.nombre}
                        </Text>
                        <Text style={styles.summaryPrice}>
                          ${productoSeleccionado.precio} MXN
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={[
                        styles.paymentOption,
                        metodoSeleccionado === 'mastercard' &&
                          styles.paymentOptionActive,
                      ]}
                      onPress={() => setMetodoSeleccionado('mastercard')}
                    >
                      <View style={styles.cardIconBox}>
                        <MaterialCommunityIcons
                          name="credit-card-outline"
                          size={25}
                          color="#154f1f"
                        />
                      </View>

                      <View style={styles.paymentTextBox}>
                        <Text style={styles.paymentTitle}>Mastercard •••• 8888</Text>
                        <Text style={styles.paymentSubtitle}>Expira 09/25</Text>
                      </View>

                      <View
                        style={[
                          styles.radioOuter,
                          metodoSeleccionado === 'mastercard' &&
                            styles.radioOuterActive,
                        ]}
                      >
                        {metodoSeleccionado === 'mastercard' && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.addPayment}
                      onPress={abrirFormularioTarjeta}
                    >
                      <Feather name="plus-circle" size={22} color="#536052" />
                      <Text style={styles.addPaymentText}>
                        Agregar método de pago
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.confirmButton}
                      onPress={confirmarCompra}
                    >
                      <Text style={styles.confirmText}>Confirmar compra</Text>
                      <Feather name="arrow-right" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity onPress={() => setModalVista('pago')}>
                        <Feather name="arrow-left" size={24} color="#154f1f" />
                      </TouchableOpacity>

                      <Text style={styles.modalTitleCard}>Agregar nueva tarjeta</Text>

                      <TouchableOpacity onPress={cerrarModal}>
                        <Feather name="x" size={24} color="#154f1f" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.fakeCard}>
                      <Text style={styles.fakeCardBrand}>Mastercard</Text>

                      <Text style={styles.fakeCardNumber}>
                        {numeroTarjeta.trim() !== ''
                          ? numeroTarjeta
                          : '•••• •••• •••• ••••'}
                      </Text>

                      <View style={styles.fakeCardBottom}>
                        <Text style={styles.fakeCardText}>
                          {nombreTarjeta.trim() !== ''
                            ? nombreTarjeta
                            : 'NOMBRE DEL TITULAR'}
                        </Text>

                        <Text style={styles.fakeCardText}>
                          {fechaTarjeta.trim() !== '' ? fechaTarjeta : 'MM/AA'}
                        </Text>
                      </View>
                    </View>

                    <TextInput
                      style={styles.input}
                      placeholder="Nombre del titular"
                      placeholderTextColor="#8b9588"
                      value={nombreTarjeta}
                      onChangeText={setNombreTarjeta}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Número de tarjeta"
                      placeholderTextColor="#8b9588"
                      value={numeroTarjeta}
                      onChangeText={setNumeroTarjeta}
                      keyboardType="numeric"
                    />

                    <View style={styles.inputRow}>
                      <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="MM/AA"
                        placeholderTextColor="#8b9588"
                        value={fechaTarjeta}
                        onChangeText={setFechaTarjeta}
                      />

                      <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="CVV"
                        placeholderTextColor="#8b9588"
                        value={cvvTarjeta}
                        onChangeText={setCvvTarjeta}
                        keyboardType="numeric"
                        secureTextEntry
                      />
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.confirmButton}
                      onPress={confirmarNuevaTarjeta}
                    >
                      <Text style={styles.confirmText}>Guardar tarjeta</Text>
                      <Feather name="check" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

function CategoryChip({ label, active }) {
  return (
    <View style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </View>
  );
}

function ProductCard({ producto, favorito, onFavorito, onCarrito, onComprar }) {
  return (
    <View style={styles.productCard}>
      <ImageBackground
        source={{ uri: producto.imagen }}
        style={styles.productImage}
        imageStyle={styles.productImageRadius}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.favoriteButton}
          onPress={onFavorito}
        >
          <MaterialCommunityIcons
            name={favorito ? 'heart' : 'heart-outline'}
            size={25}
            color={favorito ? '#c71920' : '#154f1f'}
          />
        </TouchableOpacity>

        <View style={styles.productTag}>
          <Text style={styles.productTagText}>{producto.categoria}</Text>
        </View>
      </ImageBackground>

      <View style={styles.productBody}>
        <Text style={styles.productName}>{producto.nombre}</Text>
        <Text style={styles.productDescription}>{producto.descripcion}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${producto.precio} MXN</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.cartButton}
            onPress={onCarrito}
          >
            <Feather name="shopping-cart" size={19} color="#154f1f" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buyButton}
          onPress={onComprar}
        >
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
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
    marginLeft: 8,
    fontSize: 25,
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
    padding: 20,
    paddingBottom: 118,
  },
  searchBox: {
    height: 56,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 13,
    fontSize: 15,
    color: '#333',
  },
  banner: {
    height: 165,
    borderRadius: 12,
    padding: 22,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 18,
  },
  bannerRadius: {
    borderRadius: 12,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,82,25,0.72)',
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
  },
  bannerText: {
    color: '#eaf8e9',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    marginTop: 8,
    width: '85%',
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#c9efc5',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#105219',
  },
  chipText: {
    color: '#5a7c58',
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    flex: 1,
    color: '#154f1f',
    fontSize: 24,
    fontWeight: '900',
  },
  sectionLink: {
    color: '#154f1f',
    fontSize: 13,
    fontWeight: '900',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    height: 145,
  },
  productImageRadius: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productTag: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: '#c9efc5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 13,
  },
  productTagText: {
    color: '#5a7c58',
    fontSize: 11,
    fontWeight: '900',
  },
  productBody: {
    padding: 14,
  },
  productName: {
    color: '#154f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  productDescription: {
    color: '#555d55',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    marginTop: 6,
    minHeight: 52,
  },
  priceRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    flex: 1,
    color: '#6d542f',
    fontSize: 15,
    fontWeight: '900',
  },
  cartButton: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#c9efc5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButton: {
    height: 38,
    borderRadius: 8,
    backgroundColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 13,
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
    width: 82,
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
  modalKeyboard: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#f7faf7',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 22,
    paddingBottom: 32,
    maxHeight: '92%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    flex: 1,
    color: '#154f1f',
    fontSize: 23,
    fontWeight: '900',
  },
  modalTitleCard: {
    flex: 1,
    textAlign: 'center',
    color: '#154f1f',
    fontSize: 22,
    fontWeight: '900',
  },
  purchaseSummary: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
  },
  summaryLabel: {
    color: '#5a6259',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  summaryName: {
    color: '#154f1f',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 5,
  },
  summaryPrice: {
    color: '#6d542f',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 6,
  },
  paymentOption: {
    height: 88,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  paymentOptionActive: {
    borderColor: '#105219',
  },
  cardIconBox: {
    width: 50,
    height: 34,
    borderRadius: 5,
    backgroundColor: '#e6eae6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  paymentTextBox: {
    flex: 1,
  },
  paymentTitle: {
    color: '#161c16',
    fontSize: 16,
    fontWeight: '800',
  },
  paymentSubtitle: {
    color: '#4d554d',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
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
  radioOuterActive: {
    borderColor: '#154f1f',
  },
  radioInner: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#154f1f',
  },
  addPayment: {
    height: 66,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#b8c8b2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    backgroundColor: '#ffffff',
  },
  addPaymentText: {
    marginLeft: 8,
    color: '#536052',
    fontSize: 15,
    fontWeight: '800',
  },
  confirmButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#105219',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    marginRight: 8,
  },
  fakeCard: {
    height: 165,
    backgroundColor: '#154f1f',
    borderRadius: 18,
    padding: 22,
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  fakeCardBrand: {
    color: '#c9efc5',
    fontSize: 18,
    fontWeight: '900',
  },
  fakeCardNumber: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 2,
  },
  fakeCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fakeCardText: {
    color: '#dfeedd',
    fontSize: 11,
    fontWeight: '800',
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#222822',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e7e1',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
});