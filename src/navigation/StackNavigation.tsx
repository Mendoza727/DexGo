import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '@/screens/Home/HomeScreen';
import { PokemonScreen } from '@/screens/Pokemon/PokemonScreen';
import { SearchScreen } from '@/screens/Search/SearchScreen';

export type RootStackParams = {
    Home: undefined,
    Pokemon: { pokemonId: number };
    Search: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pokemon" component={PokemonScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}