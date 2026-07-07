import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b3a1e" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <View style={styles.playerContainer}>
          <View style={styles.videoThumbnail}>
            <Text style={styles.playIcon}>►</Text>
            <View style={styles.videoTimeBadge}><Text style={styles.videoTimeBadgeText}>04:20 / 12:45</Text></View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}><View style={[styles.progressFill, { width: '35%' }]} /></View>
            <View style={styles.progressTime}>
              <Text style={styles.progressTimeText}>04:20</Text>
              <Text style={styles.progressTimeText}>12:45</Text>
            </View>
          </View>
          <View style={styles.controlsContainer}>
            <TouchableOpacity><Text style={styles.controlText}>◄◄</Text></TouchableOpacity>
            <TouchableOpacity style={styles.playBtn} onPress={() => setIsPlaying(!isPlaying)}>
              <Text style={styles.playBtnText}>{isPlaying ? '❚❚' : '►'}</Text>
            </TouchableOpacity>
            <TouchableOpacity><Text style={styles.controlText}>►►</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.videoTitle}>Tecnicas de Poda para Tomates</Text>
        <Text style={styles.videoDescription}>
          Aprende los fundamentos de la poda selectiva para maximizar el rendimiento de tu cosecha.
        </Text>

        <View style={styles.tagsContainer}>
          <View style={styles.tag}><Text style={styles.tagText}>Organico</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>12 min</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>Nivel Medio</Text></View>
        </View>

        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Videos Relacionados</Text>
          <TouchableOpacity style={styles.relatedItem}>
            <View style={styles.relatedThumbnail}>
              <Text style={styles.relatedPlay}>►</Text>
              <View style={styles.relatedDuration}><Text style={styles.relatedDurationText}>08:20</Text></View>
            </View>
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedName}>Riego por Goteo: Guia de Instalacion</Text>
              <Text style={styles.relatedMeta}>Huerto Urbano • 12K vistas</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.relatedItem}>
            <View style={styles.relatedThumbnail}>
              <Text style={styles.relatedPlay}>►</Text>
              <View style={styles.relatedDuration}><Text style={styles.relatedDurationText}>10:15</Text></View>
            </View>
            <View style={styles.relatedInfo}>
              <Text style={styles.relatedName}>Composta en Casa: Cero Desperdicios</Text>
              <Text style={styles.relatedMeta}>Vida Verde • 8.5K vistas</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0b2a1a' },
  container: { flex: 1, backgroundColor: '#f5f9f7', paddingHorizontal: 16, paddingTop: 10 },
  playerContainer: { backgroundColor: '#0b2a1a', borderRadius: 20, padding: 16, marginBottom: 16 },
  videoThumbnail: { height: 200, backgroundColor: '#1a4a2a', borderRadius: 12, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  playIcon: { fontSize: 60, color: 'white' },
  videoTimeBadge: { position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.75)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  videoTimeBadgeText: { color: 'white', fontSize: 12, fontWeight: '500' },
  progressContainer: { marginTop: 12 },
  progressBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: '#c6e9b0', borderRadius: 2 },
  progressTime: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  progressTimeText: { color: 'rgba(255,255,255,0.6)', fontSize: 11 },
  controlsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 12 },
  controlText: { fontSize: 20, color: 'white' },
  playBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  playBtnText: { fontSize: 24, color: 'white' },
  videoTitle: { fontSize: 20, fontWeight: '700', color: '#0b2a1a', marginBottom: 8 },
  videoDescription: { fontSize: 14, color: '#4a7a5e', lineHeight: 20, marginBottom: 12 },
  tagsContainer: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  tag: { backgroundColor: '#e6f5ed', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 40, borderWidth: 1, borderColor: '#b8dfc8' },
  tagText: { fontSize: 12, fontWeight: '500', color: '#1a7540' },
  relatedSection: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 8 },
  relatedTitle: { fontSize: 17, fontWeight: '600', color: '#0b2a1a', marginBottom: 12 },
  relatedItem: { flexDirection: 'row', gap: 12, paddingVertical: 10 },
  relatedThumbnail: { width: 80, height: 50, backgroundColor: '#1a4a2a', borderRadius: 8, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  relatedPlay: { fontSize: 18, color: 'white' },
  relatedDuration: { position: 'absolute', bottom: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.75)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3 },
  relatedDurationText: { color: 'white', fontSize: 9, fontWeight: '500' },
  relatedInfo: { flex: 1, justifyContent: 'center' },
  relatedName: { fontSize: 13, fontWeight: '600', color: '#0b2a1a', marginBottom: 2 },
  relatedMeta: { fontSize: 11, color: '#4a7a5e' },
  bottomSpacer: { height: 20 },
});