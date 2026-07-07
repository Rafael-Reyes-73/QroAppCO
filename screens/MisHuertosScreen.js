import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MisHuertosScreen({ onClose }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons name="leaf" size={20} color="#154f1f" />
            <Text style={styles.headerTitle}>MyHuerto</Text>
          </View>

          <View style={styles.headerIcons}>
            <Feather name="search" size={22} color="#3d463c" />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={21} color="#154f1f" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Mis Huertos</Text>

          <View style={styles.activeRow}>
            <View style={styles.dot} />
            <Text style={styles.activeText}>12 Cultivos Activos</Text>
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.newButton}>
            <Feather name="plus" size={19} color="#ffffff" />
            <Text style={styles.newButtonText}>Nuevo Cultivo</Text>
          </TouchableOpacity>

          <GardenCard
            image="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80"
            tag="En Proceso"
            title="Tomate Roma"
            cycle="Ciclo: 75 d"
            planted="Sembrado el 15 de Oct"
            phase="Crecimiento Vegetativo"
            progress="65%"
            width="65%"
            taskIcon="water-outline"
            task="Riego Próximo"
            taskTime="Hoy, 6:00 PM"
            liked
          />

          <GardenCard
            image="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80"
            tag="Floración"
            title="Brocoli"
            cycle="Ciclo: 40 d"
            planted="Sembrado el 28 de Oct"
            phase="Floración Temprana"
            progress="82%"
            width="82%"
            taskIcon="content-cut"
            task="Poda Necesaria"
            taskTime="Mañana, 8:00 AM"
          />

          <GardenCard
            image="https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=80"
            tag="Germinación"
            title="Zanahoria Nantes"
            cycle="Ciclo: 90 d"
            planted="Sembrado el 05 de Nov"
            phase="Germinación"
            progress="15%"
            width="15%"
            taskIcon="flask-outline"
            task="Nutrientes"
            taskTime="En 3 días"
            brown
          />
        </ScrollView>

        <TouchableOpacity activeOpacity={0.85} style={styles.cameraButton}>
          <Feather name="aperture" size={30} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.bottomNav}>
          <NavItem icon="home" label="Home" />
          <View style={styles.navActive}>
            <MaterialCommunityIcons name="sprout" size={21} color="#5a7c58" />
            <Text style={styles.navActiveText}>Garden</Text>
          </View>
          <NavItem icon="shopping-bag" label="Store" />
          <NavItem icon="user" label="Profile" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function GardenCard({
  image,
  tag,
  title,
  cycle,
  planted,
  phase,
  progress,
  width,
  taskIcon,
  task,
  taskTime,
  liked,
  brown,
}) {
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.cardImage} imageStyle={styles.cardImageRadius}>
        <View style={styles.imageDark} />

        <View style={[styles.tag, brown && styles.tagBrown]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>

        <View style={styles.heartCircle}>
          <MaterialCommunityIcons
            name={liked ? 'heart' : 'heart-outline'}
            size={28}
            color="#154f1f"
          />
        </View>
      </ImageBackground>

      <View style={styles.cardBody}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cycleText}>{cycle}</Text>
        </View>

        <Text style={styles.planted}>{planted}</Text>

        <View style={styles.progressHeader}>
          <Text style={styles.phase}>{phase}</Text>
          <Text style={styles.progressNumber}>{progress}</Text>
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width }]} />
        </View>

        <View style={styles.taskBox}>
          <View style={styles.taskIconBox}>
            <MaterialCommunityIcons name={taskIcon} size={24} color="#154f1f" />
          </View>

          <View>
            <Text style={styles.taskLabel}>{task}</Text>
            <Text style={styles.taskTime}>{taskTime}</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.followButton}>
          <Text style={styles.followText}>Ver Seguimiento</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    height: 66,
    paddingHorizontal: 20,
    backgroundColor: '#f7faf7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#154f1f',
    fontSize: 17,
    fontWeight: '900',
    marginLeft: 7,
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
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 30,
    color: '#154f1f',
    fontWeight: '900',
    marginTop: 14,
  },
  activeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3d7d3c',
    marginRight: 8,
  },
  activeText: {
    color: '#4c554c',
    fontSize: 16,
  },
  newButton: {
    height: 44,
    backgroundColor: '#105219',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 42,
  },
  newButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    height: 192,
  },
  cardImageRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  tag: {
    position: 'absolute',
    left: 16,
    bottom: 15,
    backgroundColor: '#77a86d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 13,
  },
  tagBrown: {
    backgroundColor: '#8f744b',
  },
  tagText: {
    color: '#d9efd3',
    fontSize: 12,
    fontWeight: '900',
  },
  heartCircle: {
    position: 'absolute',
    right: 16,
    top: 15,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#eef4ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    padding: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardTitle: {
    flex: 1,
    color: '#154f1f',
    fontSize: 27,
    fontWeight: '900',
  },
  cycleText: {
    color: '#2f382f',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 5,
  },
  planted: {
    color: '#3e463e',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
  },
  progressHeader: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phase: {
    color: '#154f1f',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  progressNumber: {
    color: '#3f493f',
    fontSize: 16,
  },
  progressBg: {
    height: 7,
    borderRadius: 5,
    backgroundColor: '#dfe4df',
    marginTop: 9,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#154f1f',
  },
  taskBox: {
    height: 59,
    backgroundColor: '#f0f3f0',
    borderRadius: 7,
    marginTop: 24,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIconBox: {
    width: 34,
    height: 34,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  taskLabel: {
    fontSize: 12,
    color: '#545c54',
    fontWeight: '900',
  },
  taskTime: {
    fontSize: 15,
    color: '#154f1f',
    fontWeight: '900',
    marginTop: 2,
  },
  followButton: {
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  followText: {
    color: '#154f1f',
    fontSize: 15,
    fontWeight: '900',
  },
  cameraButton: {
    position: 'absolute',
    right: 22,
    bottom: 100,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#105219',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
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
    width: 78,
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
});