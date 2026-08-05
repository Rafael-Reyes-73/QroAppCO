import UbicacionProveedoresScreen from '../screens/UbicacionProveedoresScreen';
import { useRouter } from 'expo-router';

export default function Ubicacion() {
  const router = useRouter();
  
  const handleClose = () => {
    router.back();
  };
  
  return <UbicacionProveedoresScreen onClose={handleClose} />;
}