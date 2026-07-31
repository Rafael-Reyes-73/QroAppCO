import { Redirect } from 'expo-router';

export default function QroStoreIndex() {
  // Redirige automáticamente a la tienda
  return <Redirect href="/qrostore/tienda" />;
}