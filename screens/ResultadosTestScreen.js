import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, shadows, radius } from '../styles/theme';

const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function ResultadosTestScreen({ onClose }) {
  const [likedItems, setLikedItems] = useState({});
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const results = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&w=900&q=80',
      compatibility: '95% Compatible',
      tag: 'Fruto',
      title: 'Tomate Cherry',
      text: 'Ideal para balcones con alta exposición solar. Produce frutos...',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80',
      compatibility: '92% Compatible',
      tag: 'Aromática',
      title: 'Brócoli',
      text: 'Perfecto para interiores cerca de ventanas. Su aroma repele plagas...',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80',
      compatibility: '88% Compatible',
      tag: 'Hortaliza',
      title: 'Tomate Roma',
      text: 'Resistente a climas más frescos. Crecimiento rápido ideal para...',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor={colors.background} />

      <View style={styles.container}>
        {/* ===== HEADER PREMIUM ===== */}
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
              <Text style={styles.headerTitle}>Resultados</Text>
              <Text style={styles.headerSubtitle}>Tus recomendaciones ideales</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="search" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ===== ENCABEZADO ===== */}
          <View style={styles.heading}>
            <View style={styles.kickerRow}>
              <LinearGradient
                colors={[colors.primaryLight, colors.primaryMain]}
                style={styles.kickerLine}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
              <Text style={styles.kicker}>ANÁLISIS DE SUELO Y CLIMA</Text>
            </View>
            <Text style={styles.title}>Tus Recomendaciones Ideales</Text>
            <Text style={styles.description}>
              Basado en tus condiciones actuales de iluminación y tipo de
              sustrato, estas variedades tienen la mayor probabilidad de éxito
              en tu hogar.
            </Text>
          </View>

          {/* ===== TARJETAS ===== */}
          <View style={styles.cardsList}>
            {results.map((item) => {
              const liked = likedItems[item.id];
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.cardWrapper,
                    { transform: [{ scale: liked ? scaleAnim : 1 }] },
                  ]}
                >
                  <View style={styles.card}>
                    <ImageBackground
                      source={{ uri: item.image }}
                      style={styles.cardImage}
                      imageStyle={styles.cardImageRadius}
                    >
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.25)']}
                        style={styles.cardImageOverlay}
                      />
                      <TouchableOpacity
                        style={styles.favoriteCircle}
                        onPress={() => handleLike(item.id)}
                        activeOpacity={0.7}
                      >
                        <Animated.View style={{ transform: [{ scale: liked ? scaleAnim : 1 }] }}>
                          <Feather
                            name="heart"
                            size={20}
                            color={liked ? colors.danger : colors.primary}
                          />
                        </Animated.View>
                      </TouchableOpacity>

                      <LinearGradient
                        colors={['rgba(13,138,78,0.9)', colors.primary]}
                        style={styles.compatibilityBadge}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                      >
                        <Feather name="star" size={10} color={colors.accentGreen} />
                        <Text style={styles.compatibilityText}>{item.compatibility}</Text>
                      </LinearGradient>
                    </ImageBackground>

                    <View style={styles.cardBody}>
                      <View style={styles.cardTop}>
                        <View style={styles.cardInfo}>
                          <View style={styles.tag}>
                            <Text style={styles.tagText}>{item.tag}</Text>
                          </View>

                          <Text style={styles.cardTitle}>{item.title}</Text>
                          <Text style={styles.cardText}>{item.text}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.7} style={styles.plusButton}>
                          <Feather name="plus" size={20} color="#ffffff" />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity activeOpacity={0.85} style={styles.detailButton}>
                        <Text style={styles.detailText}>Ver Detalle</Text>
                        <Feather name="arrow-right" size={14} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>

          {/* ===== CAJA VACÍA ===== */}
          <LinearGradient
            colors={['rgba(13,138,78,0.04)', 'rgba(13,138,78,0.02)']}
            style={styles.emptyBox}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.emptyIconContainer}>
              <Feather name="search" size={32} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>¿No encontraste lo que buscabas?</Text>
            <Text style={styles.emptyText}>
              Ajusta los parámetros de tu test para explorar nuevas variedades
              que se adapten a diferentes rincones de tu espacio.
            </Text>

            <TouchableOpacity activeOpacity={0.85} style={styles.repeatButton}>
              <Feather name="refresh-cw" size={16} color="#ffffff" />
              <Text style={styles.repeatText}>Repetir Test</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ===== HEADER =====
  header: {
    height: 76,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
    fontSize: fonts.xxl,
    fontWeight: '900',
    color: colors.primary,
    lineHeight: 24,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ===== SCROLL =====
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  // ===== ENCABEZADO =====
  heading: {
    marginBottom: 22,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  kickerLine: {
    width: 4,
    height: 18,
    borderRadius: 2,
  },
  kicker: {
    color: colors.primaryMain,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 26,
    color: colors.textDark,
    fontWeight: '900',
    lineHeight: 32,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: fonts.md,
    color: colors.textBody,
    lineHeight: 22,
    fontWeight: '500',
  },
  // ===== TARJETAS =====
  cardsList: {
    gap: 16,
  },
  cardWrapper: {
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.elevated,
  },
  cardImage: {
    height: 190,
  },
  cardImageRadius: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  favoriteCircle: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  compatibilityBadge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  compatibilityText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flex: 1,
  },
  tag: {
    backgroundColor: colors.primarySoft,
    alignSelf: 'flex-start',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
    marginBottom: 5,
  },
  tagText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  cardTitle: {
    fontSize: fonts.xxl,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 0.2,
  },
  cardText: {
    marginTop: 4,
    fontSize: fonts.sm,
    color: colors.textBody,
    lineHeight: 19,
    fontWeight: '500',
  },
  plusButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primaryMain,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    ...shadows.green,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: colors.primaryMain,
    borderRadius: radius.md,
    marginTop: 14,
    gap: 6,
    ...shadows.green,
  },
  detailText: {
    color: '#ffffff',
    fontSize: fonts.md,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  // ===== CAJA VACÍA =====
  emptyBox: {
    marginTop: 24,
    borderRadius: radius.xl,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.08)',
  },
  emptyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: fonts.xl,
    fontWeight: '800',
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  emptyText: {
    fontSize: fonts.md,
    color: colors.textBody,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 20,
  },
  repeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryMain,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radius.pill,
    gap: 8,
    ...shadows.green,
  },
  repeatText: {
    color: '#ffffff',
    fontSize: fonts.md,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
