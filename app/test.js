import TestScreen from '../screens/TestMunicipioScreen';
import { useRouter } from 'expo-router';

export default function Test() {
  const router = useRouter();

  const handleClose = () => {
    // Regresa de forma confiable al inicio (tabs)
    router.replace('/(tabs)');
  };

  return <TestScreen onClose={handleClose} />;
}
