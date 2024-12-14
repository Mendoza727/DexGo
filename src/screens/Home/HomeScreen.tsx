import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonBg } from "@/components/ui/PokemonBg";
import { ActivityIndicator, FAB, Text } from "react-native-paper";
import { globalTheme } from "@/config/theme/Globa-theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PokemonCard } from "@/components/pokemons/PokemonCard";
import { getPokemons } from "@/actions/Pokemons";
import { FullScreenLoader } from "@/components/ui/FullScreenLoader";
import LottieView from "lottie-react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "@/navigation/StackNavigation";

interface Props extends StackScreenProps<RootStackParams, 'Home'>{};

export const HomeScreen = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets()

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", 'infinite'],
    initialPageParam: 0,
    queryFn: (params) => getPokemons(params.pageParam),
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, //60 minutos
  });

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <View style={globalTheme.globalMargin}>
      <PokemonBg
        style={styles.imgPosition}
      />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon?.id}-${index}`}
        numColumns={2}
        style={{
          paddingTop: top + 20,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        initialNumToRender={10}
        windowSize={5}
        ListFooterComponent={() => (
          <View style={{
            height: 150,
            marginBottom: 50,
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            alignItems: "center",
            borderRadius: 10,
            padding: 10,
          }}>
            <LottieView
              source={require('../../lotties/loading.json')}
              autoPlay
              style={{
                width: 400,
                height: 150,
              }}
              loop />
          </View>
        )}
      />

      <FAB
        icon="magnify"
        style={[globalTheme.fab]}
        mode="elevated"
        onPress={() => navigation.push('Search')}
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