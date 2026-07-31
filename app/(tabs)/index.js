import InicioScreen from '../../screens/InicioScreen';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  
  // Pasamos el router a InicioScreen para navegación
  return <InicioScreen router={router} />;
}