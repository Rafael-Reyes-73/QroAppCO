# TODO - Mejoras QroStore y pantallas

## ✅ 1. Diseño avanzado de QroStore como principal
- [x] Cambiar `app/qrostore/tienda.js` para importar `screens/QroStoreScreen.js` (diseño avanzado con logo, banner, categorías funcionales, búsqueda, grid de productos, modal de pago)
- [x] Adaptar `screens/QroStoreScreen.js` para usar props `onNavigate`/`onClose` con Expo Router
- [x] Crear ruta `app/qrostore/carrito.js` para el carrito
- [x] Crear ruta `app/qrostore/favoritos.js` para favoritos

## ✅ 2. Navegación integrada con Expo Router (bottom nav persistente compartido)
- [x] Crear componente `screens/QroStoreBottomNav.js` - bottom nav premium reutilizable (Inicio, Tienda, Favoritos, Perfil)
- [x] Integrar QroStoreBottomNav en:
  - [x] `screens/QroStoreScreen.js` (tienda principal - active: "tienda")
  - [x] `screens/CarritoScreen.js` (carrito - active: "carrito")
  - [x] `screens/FavoritosScreen.js` (favoritos - active: "favoritos")
  - [x] `screens/ProfileScreen.js` (perfil - active: "perfil")
- [x] Eliminar bottom nav duplicado (personalizado) en cada pantalla
- [x] Verificar icono carrito en `InicioScreen.js` y pantallas externas - ya navegan a `/qrostore`
- [x] Actualizar `app/_layout.js` con rutas de qrostore/carrito y qrostore/favoritos
- [x] Cambiar `app/qrostore/_layout.js` de Tabs a Stack (consistente con el bottom nav)

## ✅ 3. Diseño mejorado de pantallas restantes
- [x] Mejorar `screens/QroPlayHomeScreen.js` (banner con gradiente, logo, tarjetas de video con animaciones, categorías funcionales, búsqueda)
- [x] Actualizar `app/(tabs)/qroplay.js` para usar la nueva pantalla
- [x] Corregir import erróneo en `screens/MenuScreen.js` (archivo eliminado)
- [x] Corregir typo QROHUERTO en banner
- [x] Eliminar `screens/MenuScreen.js` (código muerto, ya no se usa)

## ✅ 4. Header con logo QroHuerto en todas las pantallas
- [x] `QroStoreScreen.js` - Logo + "QroStore" + subtítulo
- [x] `CarritoScreen.js` - Logo + "Carrito" (con flecha atrás)
- [x] `FavoritosScreen.js` - Logo + "Favoritos"
- [x] `ProfileScreen.js` - Logo + "Perfil"
- [x] `QroPlayHomeScreen.js` - Logo + "QroPlay" + subtítulo

## ✅ 5. Pantallas verificadas con buen diseño
- [x] LoginScreen, ProfileScreen, CatalogScreen, InicioScreen, NotificacionesScreen

## ✅ 6. Limpieza de código
- [x] Eliminar bottom nav antiguo (estilos) de FavoritosScreen
- [x] Eliminar imports no utilizados (Platform, MaterialCommunityIcons) de FavoritosScreen
- [x] Eliminar código muerto MenuScreen.js
- [x] Indentación correcta en todos los archivos

## ✅ 7. Verificación final
- [x] Compila sin errores con `npx expo export --platform web`

