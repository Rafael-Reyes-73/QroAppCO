import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SeguimientoCultivoDetalleScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Feather name="arrow-left" size={25} color="#154f1f" />

            <Text style={styles.headerTitle}>Tomate Roma</Text>

            <View style={styles.headerRight}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
                }}
                style={styles.avatar}
              />

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={20} color="#154f1f" />
              </TouchableOpacity>
            </View>
          </View>

          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.hero}
            imageStyle={styles.heroImage}
          />

          <View style={styles.statusCard}>
            <View>
              <Text style={styles.statusLabel}>ETAPA ACTUAL</Text>
              <Text style={styles.statusTitle}>Crecimiento{'\n'}Vegetativo</Text>
            </View>

            <View style={styles.progressCircle}>
              <Text style={styles.progressCircleText}>65%</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <InfoBox icon="calendar" label="Días desde siembra" value="45" />
            <InfoBox icon="ruler" label="Altura aprox" value="22cm" />
          </View>

          <Text style={styles.timelineTitle}>⌁ LÍNEA DE TIEMPO</Text>

          <View style={styles.timeline}>
            <TimelineStep checked label="Germinación" />
            <View style={styles.line} />
            <TimelineStep checked label="Plántula" />
            <View style={styles.line} />
            <TimelineStep active label="Crecimiento" />
            <View style={styles.lineInactive} />
            <TimelineStep locked label="Floración" />
          </View>

          <View style={styles.tasksCard}>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={56}
              color="#91a790"
              style={styles.calendarIcon}
            />

            <View style={styles.taskRow}>
              <View style={styles.taskLeft}>
                <MaterialCommunityIcons name="water-outline" size={22} color="#315834" />
                <Text style={styles.taskTitle}>Riego hoy</Text>
              </View>

              <View style={styles.timeBadge}>
                <Text style={styles.timeBadgeText}>6:00 PM</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.taskRow}>
              <View style={styles.taskLeft}>
                <MaterialCommunityIcons name="fruit-cherries" size={22} color="#6a4e2a" />
                <Text style={styles.taskTitle}>Abono</Text>
              </View>

              <Text style={styles.smallTime}>en 2 días</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity activeOpacity={0.85} style={styles.actionButton}>
              <Feather name="camera" size={21} color="#5a7c58" />
              <Text style={styles.actionText}>Registrar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.actionButton}>
              <Feather name="file-plus" size={21} color="#5a7c58" />
              <Text style={styles.actionText}>Agregar Nota</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.assistantCard}>
            <View style={styles.assistantIcon}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=200&q=80',
                }}
                style={styles.assistantImage}
              />
              <Text style={styles.assistantMini}>Morita</Text>
            </View>

            <View style={styles.assistantContent}>
              <Text style={styles.assistantTitle}>Asistente Morita</Text>
              <Text style={styles.assistantText}>
                "Morita recomienda: Es buen momento para revisar el drenaje del
                sustrato. Las lluvias de anoche pudieron saturar la maceta."
              </Text>
              <Text style={styles.assistantLink}>Ver detalles técnicos ↗</Text>
            </View>

            <MaterialCommunityIcons
              name="cog"
              size={92}
              color="rgba(120,176,104,0.16)"
              style={styles.assistantBgIcon}
            />
          </View>
        </ScrollView>

        <View style={styles.bottomNav}>
          <NavItem icon="home" label="Inicio" />
          <View style={styles.navActive}>
            <MaterialCommunityIcons name="sprout" size={21} color="#9bd391" />
            <Text style={styles.navActiveText}>Mi Huerto</Text>
          </View>
          <NavItem icon="shopping-bag" label="Tienda" />
          <NavItem icon="user" label="Perfil" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <View style={styles.infoBox}>
      <MaterialCommunityIcons name={icon} size={28} color="#154f1f" />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function TimelineStep({ checked, active, locked, label }) {
  return (
    <View style={styles.timelineItem}>
      <View
        style={[
          styles.timelineCircle,
          checked && styles.timelineChecked,
          active && styles.timelineActive,
          locked && styles.timelineLocked,
        ]}
      >
        {checked && <Feather name="check" size={24} color="#ffffff" />}
        {active && <MaterialCommunityIcons name="leaf" size={25} color="#ffffff" />}
        {locked && <Feather name="lock" size={18} color="#b8beb8" />}
      </View>

      <Text
        style={[
          styles.timelineLabel,
          active && styles.timelineLabelActive,
          locked && styles.timelineLabelLocked,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function NavItem({ icon, label }) {
  return (
    <View style={styles.navItem}>
      <Feather name={icon} size={21} color="#3d463c" />
      <Text style={styles.navText}>{label}</Text>
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
  scrollContent: {
    paddingBottom: 112,
  },
  header: {
    height: 66,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#154f1f',
    fontSize: 25,
    fontWeight: '900',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  closeButton: {
    marginLeft: 8,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    height: 254,
  },
  heroImage: {
    resizeMode: 'cover',
  },
  statusCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 40,
    marginTop: -40,
    borderRadius: 10,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    color: '#4e584e',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.3,
    marginBottom: 8,
  },
  statusTitle: {
    color: '#154f1f',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  progressCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 6,
    borderColor: '#1d5b24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleText: {
    color: '#154f1f',
    fontSize: 15,
    fontWeight: '900',
  },
  statsRow: {
    paddingHorizontal: 40,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    width: '48%',
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    marginTop: 8,
    color: '#3e473e',
    fontSize: 12,
    fontWeight: '700',
  },
  infoValue: {
    color: '#154f1f',
    fontSize: 27,
    fontWeight: '900',
  },
  timelineTitle: {
    marginHorizontal: 40,
    marginTop: 28,
    color: '#4e584e',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  timeline: {
    marginHorizontal: 40,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  timelineItem: {
    alignItems: 'center',
    width: 64,
  },
  timelineCircle: {
    width: 49,
    height: 49,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineChecked: {
    backgroundColor: '#88aa84',
  },
  timelineActive: {
    backgroundColor: '#1e6626',
    borderWidth: 7,
    borderColor: '#c9efc5',
  },
  timelineLocked: {
    backgroundColor: '#eef0ee',
  },
  timelineLabel: {
    marginTop: 8,
    color: '#5a6259',
    fontSize: 12,
    fontWeight: '800',
  },
  timelineLabelActive: {
    color: '#154f1f',
  },
  timelineLabelLocked: {
    color: '#a9afa9',
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: '#638762',
    marginTop: 24,
  },
  lineInactive: {
    width: 30,
    height: 2,
    backgroundColor: '#cfd5cf',
    marginTop: 24,
  },
  tasksCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 40,
    marginTop: 40,
    paddingHorizontal: 25,
    paddingVertical: 26,
  },
  calendarIcon: {
    alignSelf: 'center',
    marginBottom: 28,
  },
  taskRow: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    marginLeft: 10,
    fontSize: 16,
    color: '#252b25',
    fontWeight: '800',
  },
  timeBadge: {
    backgroundColor: '#c9efc5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  timeBadgeText: {
    color: '#5a7c58',
    fontSize: 12,
    fontWeight: '900',
  },
  smallTime: {
    color: '#4b524b',
    fontSize: 12,
    fontWeight: '900',
  },
  divider: {
    height: 1,
    backgroundColor: '#e4e7e4',
    marginVertical: 10,
  },
  actionRow: {
    paddingHorizontal: 40,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    height: 47,
    borderRadius: 24,
    backgroundColor: '#c9efc5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionText: {
    color: '#5a7c58',
    fontSize: 15,
    marginLeft: 8,
    fontWeight: '700',
  },
  assistantCard: {
    backgroundColor: '#2d6129',
    marginHorizontal: 40,
    marginTop: 24,
    borderRadius: 9,
    padding: 25,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  assistantIcon: {
    width: 52,
    alignItems: 'center',
    marginRight: 20,
  },
  assistantImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  assistantMini: {
    fontSize: 8,
    color: '#154f1f',
    marginTop: -20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 3,
  },
  assistantContent: {
    flex: 1,
  },
  assistantTitle: {
    color: '#9bd391',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  assistantText: {
    color: '#9bd391',
    fontSize: 16,
    lineHeight: 22,
  },
  assistantLink: {
    color: '#9bd391',
    marginTop: 20,
    fontSize: 13,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
  assistantBgIcon: {
    position: 'absolute',
    right: -15,
    top: -13,
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
    width: 92,
    height: 47,
    borderRadius: 24,
    backgroundColor: '#1f6a29',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navActiveText: {
    fontSize: 12,
    color: '#9bd391',
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
});