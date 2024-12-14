import { View, StyleSheet } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { globalTheme } from '@/config/theme/Globa-theme';
import { Text, TextInput } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { PokemonCard } from '@/components/pokemons/PokemonCard';
import { Pokemon } from '@/domain/entities/Pokemon';
import { FlatList } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';
import { getPokemonByIds, getPokemosNamesWithId } from '@/actions/Pokemons';
import { useDebounceValue } from '@/hooks/useDebounceValue';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState<string | null>('');
  
  const debounceValue = useDebounceValue(term as any);

  const { isLoading, data: pokemonList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemosNamesWithId()
  });

  const pokemonNameList = useMemo(() => {
    if (!isNaN(Number(debounceValue))) {
      const pokemon = pokemonList.find(pokemon => pokemon.id === Number(debounceValue))
      return pokemon ? [pokemon] : [];
    }

    if (debounceValue?.length === 0) return [];
    if (debounceValue!.length < 3) return [];

    return pokemonList.filter(pokemon =>
      pokemon.name.toLocaleLowerCase().includes(debounceValue?.toLocaleLowerCase() as string)
    )
  }, [debounceValue]);

  const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameList],
    queryFn: () => getPokemonByIds(pokemonNameList.map(id => id.id)),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <View style={[globalTheme.globalMargin, { top: top + 20 }]}>
      <TextInput
        placeholder='search pokemon'
        mode='flat'
        autoFocus
        autoCorrect={false}
        left={<TextInput.Icon icon="magnify" />}
        onChangeText={setTerm}
        value={term as string}
        style={{
          backgroundColor: 'white'
        }}
      />

      {
        isLoadingPokemons &&
        <View style={styles.welcome}>
          <LottieView
            style={styles.lottieAnimation}
            source={require('../../lotties/loading.json')}
            autoPlay
            loop
          />
        </View>
      }

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon?.id}-${index}`}
        numColumns={2}
        style={{
          paddingTop: top + 20,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.6}
        initialNumToRender={10}
        windowSize={5}
        ListFooterComponent={ <View style={{ height: 160 }}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 150
  },
  lottieAnimation: {
    width: 175,
    height: 175,
  }
})
