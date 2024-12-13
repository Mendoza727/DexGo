import { StyleSheet, View } from "react-native";
import React from "react";
import { getPokemons } from "../../actions/Pokemons";
import { useQuery } from "@tanstack/react-query";
import { PokemonBg } from "../../components/ui/PokemonBg";

export const HomeScreen = () => {
  const { isLoading, data = []} = useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <View>
      <PokemonBg 
      style={ styles.imgPosition }
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