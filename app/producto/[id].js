import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import ProductDetailScreen from '../../screens/ProductDetailScreen';
import { products } from '../../data/products';

export default function Producto() {
  const { id } = useLocalSearchParams();
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }
  
  return <ProductDetailScreen product={product} />;
}