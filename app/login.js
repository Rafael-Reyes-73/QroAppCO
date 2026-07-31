import LoginScreen from '../screens/LoginScreen';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  
  // Pasamos el router directamente a LoginScreen
  return <LoginScreen router={router} />;
}