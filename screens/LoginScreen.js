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

const { width, height } = Dimensions.get('window');
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
          console.log('Redirigido a tabs');
        } else {
          console.error('Router no está disponible');
          Alert.alert('Error', 'Router no disponible');
        }
        
      } else {
        console.log('Credenciales incorrectas');
        Alert.alert(
          'Error de autenticación',
          'Credenciales incorrectas.\n\nusuario@qrohuerto.com\n123456'
        );
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5faf7" barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Decoración de fondo elegante */}
          <View style={styles.headerDecor}>
            <LinearGradient
              colors={['rgba(13, 138, 78, 0.04)', 'rgba(13, 138, 78, 0.01)']}
              style={styles.gradientBg}
            />
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
            <View style={styles.decorCircle3} />
            <View style={styles.decorCircle4} />
            <View style={styles.decorLine} />
          </View>

          {/* Logo elegante */}
          <View style={styles.logoContainer}>
            <View style={styles.logoOuterGlow}>
              <View style={styles.logoWrapper}>
                <View style={styles.logoInnerGlow} />
                <Image source={logoImage} style={styles.logo} resizeMode="contain" />
              </View>
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
                <Feather name="mail" size={18} color="#0d8a4e" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#a0b0a4"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputIconContainer}>
                <Feather name="lock" size={18} color="#0d8a4e" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#a0b0a4"
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
                  color="#8a9a8e" 
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
                colors={['#0d8a4e', '#0a7a3e', '#086a34']}
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
                <Feather name="key" size={14} color="#0d8a4e" />
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

          {/* Credenciales info elegante */}
          <View style={styles.credentialsInfo}>
            <LinearGradient
              colors={['rgba(13, 138, 78, 0.03)', 'rgba(13, 138, 78, 0.01)']}
              style={styles.credentialsGradient}
            />
            <View style={styles.credentialsHeader}>
              <View style={styles.credentialsDot} />
              <Text style={styles.credentialsTitle}>Credenciales de prueba</Text>
            </View>
            <View style={styles.credentialRow}>
              <View style={styles.credentialIconBg}>
                <Feather name="mail" size={11} color="#0d8a4e" />
              </View>
              <Text style={styles.credentialsText}>usuario@qrohuerto.com</Text>
            </View>
            <View style={styles.credentialRow}>
              <View style={styles.credentialIconBg}>
                <Feather name="key" size={11} color="#0d8a4e" />
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
    backgroundColor: '#f8fbf9',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fbf9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 20,
  },
  // Decoración de fondo elegante
  headerDecor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.35,
    overflow: 'hidden',
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
    top: -120,
    right: -100,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    top: -60,
    left: -60,
  },
  decorCircle3: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(13, 138, 78, 0.03)',
    top: 20,
    right: 20,
  },
  decorCircle4: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(13, 138, 78, 0.02)',
    bottom: -20,
    left: -30,
  },
  decorLine: {
    position: 'absolute',
    width: 1,
    height: 80,
    backgroundColor: 'rgba(13, 138, 78, 0.06)',
    top: 60,
    right: 80,
    transform: [{ rotate: '25deg' }],
  },
  // Logo elegante
  logoContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 15 : 25,
    marginBottom: 28,
    zIndex: 1,
  },
  logoOuterGlow: {
    padding: 4,
    borderRadius: 45,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
  },
  logoWrapper: {
    width: 130,
    height: 130,
    borderRadius: 38,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 35,
    elevation: 20,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
    position: 'relative',
  },
  logoInnerGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 42,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    top: -5,
    left: -5,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 25,
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
    backgroundColor: '#0d8a4e',
    opacity: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#4a7a5e',
    fontWeight: '400',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  // Formulario premium
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
    borderColor: 'rgba(13, 138, 78, 0.06)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    transition: 'all 0.3s',
  },
  inputWrapperFocused: {
    borderColor: '#0d8a4e',
    shadowColor: '#0d8a4e',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  inputIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    color: '#0a3a1a',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 8,
    opacity: 0.6,
  },
  button: {
    borderRadius: 16,
    marginTop: 6,
    overflow: 'hidden',
    shadowColor: '#0d8a4e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
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
    fontWeight: '700',
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
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
  },
  demoText: {
    color: '#0d8a4e',
    fontSize: 12,
    fontWeight: '600',
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
    backgroundColor: 'rgba(13, 138, 78, 0.08)',
  },
  dividerText: {
    fontSize: 12,
    color: '#8a9a8e',
    paddingHorizontal: 16,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#4a6a4e',
    fontWeight: '400',
  },
  registerLink: {
    fontSize: 14,
    color: '#0d8a4e',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  // Credenciales info elegante
  credentialsInfo: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(13, 138, 78, 0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    zIndex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  credentialsGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    backgroundColor: '#0d8a4e',
    opacity: 0.4,
  },
  credentialsTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0a3a1a',
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
    backgroundColor: 'rgba(13, 138, 78, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  credentialsText: {
    fontSize: 11,
    color: '#4a6a4e',
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 10,
    zIndex: 1,
  },
  versionText: {
    fontSize: 11,
    color: '#b0c0b4',
    fontWeight: '400',
    letterSpacing: 0.8,
  },
});