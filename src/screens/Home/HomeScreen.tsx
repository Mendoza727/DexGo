import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { getPokemons } from "@/actions/Pokemons";
import { useQuery } from "@tanstack/react-query";
import { PokemonBg } from "@/components/ui/PokemonBg";
import { Text } from "react-native-paper";
import { globalTheme } from "@/config/theme/Globa-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PokemonCard } from "@/components/pokemons/PokemonCard";

export const HomeScreen = () => {
  const { top, bottom } = useSafeAreaInsets()

  const { isLoading, data: pokemons = [] } = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60, //60 minutos
  });

  
  return (
    <View style={globalTheme.globalMargin}>
      <PokemonBg
        style={styles.imgPosition}
      />

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{
          paddingTop: top + 20,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Text variant="displayMedium">Pokedex</Text>
        )}
        renderItem={({ item }) => <PokemonCard pokemon={item} /> }
      />
    </View>
  );
};


const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100
  }
})