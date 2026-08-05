import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, shadows, radius, spacing } from '../styles/theme';

const { height } = Dimensions.get('window');
const logoImage = require('../assets/logo_qrohuerto.jpeg');

export default function LoginScreen({ router }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    console.log('Intentando login con:', email, password);

    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email === 'usuario@qrohuerto.com' && password === '123456') {
        console.log('Credenciales correctas! Redirigiendo...');

        if (router) {
          router.replace('/(tabs)');
        } else {
          console.error('Router no está disponible');
          Alert.alert('Error', 'Router no disponible');
        }
      } else {
        Alert.alert(
          'Error de autenticación',
          'Credenciales incorrectas.\n\nusuario@qrohuerto.com\n123456'
        );
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.bg} barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Decoración de fondo premium */}
          <LinearGradient
            colors={['rgba(16,82,25,0.05)', 'rgba(16,82,25,0.01)']}
            style={styles.headerDecor}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
            <View style={styles.decorCircle3} />
          </LinearGradient>

          {/* Logo limpio (estilo inicio) */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={logoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.taglineContainer}>
              <View style={styles.taglineDot} />
              <Text style={styles.subtitle}>Tu huerto inteligente</Text>
              <View style={styles.taglineDot} />
            </View>
          </View>

          {/* Formulario premium */}
          <View style={styles.form}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIconContainer}>
                <Feather name="mail" size={18} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputIconContainer}>
                <Feather name="lock" size={18} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    <Feather name="arrow-right" size={20} color="#ffffff" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => {
                setEmail('usuario@qrohuerto.com');
                setPassword('123456');
              }}
              activeOpacity={0.7}
            >
              <View style={styles.demoButtonInner}>
                <Feather name="key" size={14} color={colors.primary} />
                <Text style={styles.demoText}>Usar credenciales de prueba</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Credenciales info premium */}
          <View style={styles.credentialsInfo}>
            <View style={styles.credentialsHeader}>
              <View style={styles.credentialsDot} />
              <Text style={styles.credentialsTitle}>Credenciales de prueba</Text>
            </View>
            <View style={styles.credentialRow}>
              <View style={styles.credentialIconBg}>
                <Feather name="mail" size={11} color={colors.primary} />
              </View>
              <Text style={styles.credentialsText}>usuario@qrohuerto.com</Text>
            </View>
            <View style={styles.credentialRow}>
              <View style={styles.credentialIconBg}>
                <Feather name="key" size={11} color={colors.primary} />
              </View>
              <Text style={styles.credentialsText}>123456</Text>
            </View>
          </View>

          {/* Versión */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>QroHuerto v2.4</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 20,
  },
  headerDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(16,82,25,0.04)',
    top: -120,
    right: -100,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(16,82,25,0.05)',
    top: -60,
    left: -60,
  },
  decorCircle3: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(16,82,25,0.03)',
    top: 20,
    right: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 32,
    marginBottom: 30,
    zIndex: 1,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    width: 180,
    height: 60,
    borderRadius: radius.sm,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    opacity: 0.3,
  },
  subtitle: {
    fontSize: fonts.xs,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  form: {
    flex: 1,
    zIndex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(16,82,25,0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  inputIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(16,82,25,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    color: colors.textDark,
    fontWeight: '600',
  },
  eyeButton: {
    padding: 8,
    opacity: 0.6,
  },
  button: {
    borderRadius: 16,
    marginTop: 6,
    overflow: 'hidden',
    ...shadows.button,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    gap: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  demoButton: {
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 6,
  },
  demoButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(16,82,25,0.05)',
  },
  demoText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(16,82,25,0.08)',
  },
  dividerText: {
    fontSize: 12,
    color: colors.textMuted,
    paddingHorizontal: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: colors.textBody,
    fontWeight: '500',
  },
  registerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  credentialsInfo: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(16,82,25,0.05)',
    ...shadows.soft,
    zIndex: 1,
  },
  credentialsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  credentialsDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    opacity: 0.4,
  },
  credentialsTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 0.5,
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 3,
  },
  credentialIconBg: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: 'rgba(16,82,25,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  credentialsText: {
    fontSize: 11,
    color: colors.textBody,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  versionText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
    letterSpacing: 0.8,
  },
});
