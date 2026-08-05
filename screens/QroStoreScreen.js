import React, { useState, useMemo, useRef } from 'react';
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
  Animated,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import QroStoreBottomNav from './QroStoreBottomNav';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

const productosIniciales = [
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
  {
    id: 5,
    nombre: 'Semillas de Tomate',
    categoria: 'Semillas',
    precio: 42,
    descripcion: 'Semillas seleccionadas de tomate Roma, alta germinación y sabor.',
    imagen:
      'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    nombre: 'Maceta de Fibra',
    categoria: 'Sustratos',
    precio: 58,
    descripcion: 'Maceta biodegradable de fibra de coco para trasplante directo.',
    imagen:
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    nombre: 'Regadera de Jardín',
    categoria: 'Herramientas',
    precio: 96,
    descripcion: 'Regadera ligera con rociador regulable, 2 litros de capacidad.',
    imagen:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    nombre: 'Tijeras de Poda',
    categoria: 'Herramientas',
    precio: 129,
    descripcion: 'Tijeras de poda profesional con hojas de acero inoxidable.',
    imagen:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
  },
];

const categorias = ['Todos', 'Fertilizantes', 'Tierra', 'Ropa', 'Semillas', 'Herramientas'];

export default function QroStoreScreen({ onClose, onNavigate }) {
  const [favoritos, setFavoritos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVista, setModalVista] = useState('pago');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('mastercard');
  const [searchText, setSearchText] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [cartCount, setCartCount] = useState(2);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaTarjeta, setFechaTarjeta] = useState('');
  const [cvvTarjeta, setCvvTarjeta] = useState('');

  const productosFiltrados = useMemo(() => {
    return productosIniciales.filter((p) => {
      const matchCategoria =
        categoriaActiva === 'Todos' ||
        (categoriaActiva === 'Tierra'
          ? p.categoria === 'Sustratos'
          : p.categoria === categoriaActiva);
      const matchSearch = p.nombre
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchCategoria && matchSearch;
    });
  }, [categoriaActiva, searchText]);

  const toggleFavorito = (id) => {
    setFavoritos(
      (prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const agregarCarrito = (producto) => {
    setCartCount((c) => c + 1);
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
    setCartCount((c) => c + 1);
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
{/* ===== HEADER CON LOGO ===== */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoWrapper}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.headerTitle}>QroStore</Text>
              <Text style={styles.headerSubtitle}>Productos para tu huerto</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.headerIconButton}
              onPress={() => onNavigate('carrito')}
            >
              <Feather name="shopping-cart" size={21} color="#154f1f" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
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
          {/* ===== BUSCADOR FUNCIONAL ===== */}
          <View style={styles.searchBox}>
            <Feather name="search" size={20} color="#6d766c" />
            <TextInput
              placeholder="Buscar productos, semillas o fertilizantes..."
              placeholderTextColor="#7a8179"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
            />
            {searchText !== '' && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Feather name="x" size={18} color="#6d766c" />
              </TouchableOpacity>
            )}
          </View>

          {/* ===== BANNER ===== */}
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.banner}
            imageStyle={styles.bannerRadius}
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerBadge}>
              <View style={styles.bannerBadgeDot} />
<Text style={styles.bannerBadgeText}>QROHUERTO</Text>
            </View>
            <Text style={styles.bannerTitle}>Todo para tu huerto</Text>
            <Text style={styles.bannerText}>
              Fertilizantes, tierra, semillas y productos QroHuerto.
            </Text>
            <View style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Explorar</Text>
              <Feather name="arrow-right" size={14} color="#105219" />
            </View>
          </ImageBackground>

          {/* ===== CATEGORÍAS FUNCIONALES ===== */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categorias.map((cat) => {
              const active = categoriaActiva === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setCategoriaActiva(cat)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ===== ENCABEZADO DE SECCIÓN ===== */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                {searchText ? 'Resultados de búsqueda' : 'Productos destacados'}
              </Text>
              <Text style={styles.sectionCount}>
                {productosFiltrados.length} productos disponibles
              </Text>
            </View>
            {productosFiltrados.length > 0 && (
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.sectionLink}>Ver todo</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ===== GRID DE PRODUCTOS ===== */}
          {productosFiltrados.length > 0 ? (
            <View style={styles.productsGrid}>
              {productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  favorito={favoritos.includes(producto.id)}
                  scaleAnim={favoritos.includes(producto.id) ? scaleAnim : null}
                  onFavorito={() => toggleFavorito(producto.id)}
                  onCarrito={() => agregarCarrito(producto)}
                  onComprar={() => abrirCompra(producto)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Feather name="search" size={36} color="#b2c8b0" />
              </View>
              <Text style={styles.emptyText}>No se encontraron productos</Text>
              <Text style={styles.emptySubtext}>
                Prueba con otra categoría o búsqueda diferente
              </Text>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

{/* ===== BOTTOM NAV PERSISTENTE ===== */}
        <QroStoreBottomNav active="tienda" onNavigate={onNavigate} />

        {/* ===== MODAL DE PAGO ===== */}
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
                      <Text style={styles.modalTitle}>
                        Selecciona método de pago
                      </Text>

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
                        <Text style={styles.paymentTitle}>
                          Mastercard •••• 8888
                        </Text>
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

                      <Text style={styles.modalTitleCard}>
                        Agregar nueva tarjeta
                      </Text>

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
                          {fechaTarjeta.trim() !== ''
                            ? fechaTarjeta
                            : 'MM/AA'}
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

function ProductCard({ producto, favorito, scaleAnim, onFavorito, onCarrito, onComprar }) {
  const cardScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(cardScale, {
      toValue: 0.96,
      duration: 90,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(cardScale, {
      toValue: 1,
      duration: 90,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.productCard,
        { transform: [{ scale: cardScale }] },
      ]}
    >
      <TouchableOpacity activeOpacity={0.95} onPressIn={handlePressIn} onPressOut={handlePressOut}>
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
            <Animated.View style={{ transform: [{ scale: scaleAnim || 1 }] }}>
              <MaterialCommunityIcons
                name={favorito ? 'heart' : 'heart-outline'}
                size={25}
                color={favorito ? '#c71920' : '#154f1f'}
              />
            </Animated.View>
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
              <Feather name="shopping-cart" size={18} color="#154f1f" />
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
      </TouchableOpacity>
    </Animated.View>
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
  // ===== HEADER CON LOGO =====
  header: {
    height: 76,
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
logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginRight: 12,
  },
  logo: {
    width: 90,
    height: 32,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: '#154f1f',
    lineHeight: 26,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#6d7d6a',
    fontWeight: '600',
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f0f7f0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#d71920',
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  closeButton: {
    marginLeft: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ===== SCROLL =====
  scrollContent: {
    padding: 20,
    paddingBottom: 118,
  },
  // ===== BUSCADOR =====
  searchBox: {
    height: 54,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e8eee8',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#222822',
    fontWeight: '500',
  },
  // ===== BANNER =====
  banner: {
    height: 170,
    borderRadius: 16,
    padding: 22,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  bannerRadius: {
    borderRadius: 16,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,82,25,0.70)',
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  bannerBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7ddfa0',
    marginRight: 7,
  },
  bannerBadgeText: {
    color: '#7ddfa0',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 33,
  },
  bannerText: {
    color: '#eaf8e9',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
    marginTop: 4,
    width: '86%',
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#c9efc5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    gap: 6,
  },
  bannerButtonText: {
    color: '#105219',
    fontSize: 12,
    fontWeight: '800',
  },
  // ===== CATEGORÍAS =====
  categoryScroll: {
    paddingBottom: 4,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e8eee8',
  },
  chipActive: {
    backgroundColor: '#105219',
    borderColor: '#105219',
  },
  chipText: {
    color: '#5a7c58',
    fontSize: 13,
    fontWeight: '800',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  // ===== SECCIÓN =====
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    flex: 1,
    color: '#154f1f',
    fontSize: 22,
    fontWeight: '900',
  },
  sectionCount: {
    color: '#7a8d78',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionLink: {
    color: '#154f1f',
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 10,
  },
  // ===== GRID =====
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    height: 140,
  },
  productImageRadius: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
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
    fontSize: 16,
    fontWeight: '900',
  },
  productDescription: {
    color: '#555d55',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
    marginTop: 5,
    minHeight: 48,
  },
  priceRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    flex: 1,
    color: '#6d542f',
    fontSize: 14,
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
    borderRadius: 9,
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
  // ===== VACÍO =====
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f0f7f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyText: {
    color: '#154f1f',
    fontSize: 16,
    fontWeight: '800',
  },
  emptySubtext: {
    color: '#7a8d78',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 5,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 10,
  },
  // ===== BOTTOM NAV =====
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#edf0ed',
    paddingBottom: Platform.OS === 'ios' ? 16 : 6,
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
    position: 'relative',
  },
  navText: {
    fontSize: 11,
    color: '#3d463c',
    fontWeight: '700',
    marginTop: 3,
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#d71920',
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  navBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '800',
  },
  // ===== MODAL =====
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
    fontSize: 22,
    fontWeight: '900',
  },
  modalTitleCard: {
    flex: 1,
    textAlign: 'center',
    color: '#154f1f',
    fontSize: 20,
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
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  summaryName: {
    color: '#154f1f',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 5,
  },
  summaryPrice: {
    color: '#6d542f',
    fontSize: 16,
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
    fontSize: 15,
    fontWeight: '800',
  },
  paymentSubtitle: {
    color: '#4d554d',
    fontSize: 12,
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
    fontSize: 14,
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
    fontSize: 15,
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
    fontSize: 20,
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
    fontSize: 14,
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

