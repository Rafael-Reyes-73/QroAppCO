import FavoritosScreen from '../../screens/FavoritosScreen';
import { useRouter } from 'expo-router';

export default function Favoritos() {
  const router = useRouter();

  const handleNavigate = (route) => {
    if (route === 'tienda') router.replace('/qrostore/tienda');
    else if (route === 'inicio') router.replace('/(tabs)');
    else if (route === 'perfil') router.replace('/qrostore/perfil');
    else router.back();
  };

  const handleClose = () => {
    router.back();
  };

  return <FavoritosScreen onNavigate={handleNavigate} onClose={handleClose} />;
}
