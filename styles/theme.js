// ============================================
// QroStore Premium Design System
// Paleta de colores y estilos compartidos
// ============================================

export const colors = {
  // Verdes primarios QroStore
  primary: '#154f1f',      // Verde oscuro - títulos/headers
  primaryDark: '#105219',  // Verde botones oscuros
  primaryMain: '#0d8a4e',  // Verde principal
  primaryLight: '#c9efc5', // Verde claro - acentos/circulos
  primarySoft: '#f0f7f0',  // Verde suave - fondos
  primaryMuted: '#5a7c58', // Verde texto muted

  // Fondos
  background: '#f7faf7',   // Fondo principal app
  backgroundAlt: '#f5faf7',// Fondo alternativo
  card: '#ffffff',

  // Texto
  textPrimary: '#0a3a1a',
  textDark: '#154f1f',
  textBody: '#4a6a4e',
  textMuted: '#7a8d78',
  textLight: '#8a9a8e',

  // Acentos
  accentGreen: '#7ddfa0',
  accentGold: '#6d542f',
  danger: '#d71920',
  alert: '#c71920',

  // Bordes
  border: '#edf0ed',
  borderDark: '#e8eee8',
};

// ============================================
// ✅ FONTS AGREGADO - Tamaños de texto
// ============================================
export const fonts = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 26,
  title: 28,
  subtitle: 20,
  body: 14,
  caption: 12,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  pill: 25,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  green: {
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
};

// Estilos de header con logo compartido (estilo QroStore)
export const headerLogoWrapper = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: 'rgba(13, 138, 78, 0.06)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.02,
  shadowRadius: 4,
  elevation: 1,
};

export default {
  colors,
  fonts,
  spacing,
  radius,
  shadows,
  headerLogoWrapper,
};