import NotificacionesScreen from '../screens/NotificacionesScreen';
import { useRouter } from 'expo-router';

export default function Notificaciones() {
  const router = useRouter();
  
  const handleClose = () => {
    router.back();
  };
  
  return <NotificacionesScreen onClose={handleClose} />;
}