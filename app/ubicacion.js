import UbicacionProveedoresScreen from '../screens/UbicacionProveedoresScreen';
import { useRouter } from 'expo-router';

export default function Ubicacion() {
  const router = useRouter();
  
  const handleClose = () => {
    // Regresa de forma confiable al inicio (tabs)
    router.replace('/(tabs)');
  };
  
  return <UbicacionProveedoresScreen onClose={handleClose} />;
}
