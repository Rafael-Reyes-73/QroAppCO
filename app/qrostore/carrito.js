import CarritoScreen from '../../screens/CarritoScreen';
import { useRouter } from 'expo-router';

export default function Carrito() {
  const router = useRouter();

  const handleNavigate = (route) => {
    if (route === 'qrostore') router.back();
    else if (route === 'inicio') router.replace('/(tabs)');
    else if (route === 'perfil') router.replace('/(tabs)/perfil');
    else if (route === 'favoritos') router.push('/qrostore/favoritos');
    else router.back();
  };

  const handleClose = () => {
    router.back();
  };

  return <CarritoScreen onNavigate={handleNavigate} onClose={handleClose} />;
}
