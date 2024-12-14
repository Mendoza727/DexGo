import { View, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '@/navigation/StackNavigation';
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '@/actions/Pokemons';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';
import { FadeInImage } from '@/components/ui/FadeInImages';
import { Formatter } from '@/config/helpers/Formatter';
import { Chip, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonBg } from '@/components/ui/PokemonBg';

interface Props extends StackScreenProps<RootStackParams, 'Pokemon'> { }

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { pokemonId } = route.params;
  const { top } = useSafeAreaInsets();

  const { isLoading, data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading || !pokemon) {
    return <FullScreenLoader />;
  }

  const handlePrevious = () => {
    if (pokemonId > 1) {
      navigation.replace('Pokemon', { pokemonId: pokemonId - 1 });
    }
  };

  const handleNext = () => {
    navigation.replace('Pokemon', { pokemonId: pokemonId + 1 });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: pokemon.color }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={{ ...styles.pokemonName, top: top + 5 }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>
        <PokemonBg style={styles.pokeball} />
        <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
        {pokemon.types.map((type) => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{
              marginLeft: 10,
              backgroundColor: pokemon.color,
            }}
            textStyle={{
              color: 'white', 
              textShadowColor: 'rgba(0, 0, 0, 0.8)', 
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2, 
            }}
          >
            {type}
          </Chip>
        ))}
      </View>

      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20, height: 100 }}
        renderItem={({ item }) => (
          <FadeInImage uri={item} style={{ width: 100, height: 100, marginHorizontal: 5 }} />
        )}
      />

      <Text style={styles.subTitle}>Abilities</Text>
      <View style={styles.cardContainer}>
        <FlatList
          data={pokemon.abilitys}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Chip style={styles.chipStyle} textStyle={{
              color: 'white', 
              textShadowColor: 'rgba(0, 0, 0, 0.8)', 
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2, 
            }} selectedColor="white">
              {Formatter.capitalize(item)}
            </Chip>
          )}
        />
      </View>

      <Text style={styles.subTitle}>Stats</Text>
      <View style={styles.cardContainer}>
        <FlatList
          data={pokemon.stats}
          keyExtractor={(item) => item.name}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.statsCard}>
              <Text style={styles.cardText}>{Formatter.capitalize(item.name)}</Text>
              <Text style={styles.cardValue}>{item.value}</Text>
            </View>
          )}
        />
      </View>


      <Text style={styles.subTitle}>Moves</Text>
      <View style={styles.cardContainer}>
        <FlatList
          data={pokemon.moves}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.statsCard}>
              <Text style={styles.cardText}>{Formatter.capitalize(item.name)}</Text>
              <Text style={styles.cardValue}>lvl {item.level}</Text>
            </View>
          )}
        />
      </View>

      <Text style={styles.subTitle}>Games</Text>
      <View style={styles.cardContainer}>
        <FlatList
          data={pokemon.games}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.statsCard}>
              <Text style={styles.cardText}>{Formatter.capitalize(item)}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handlePrevious}
          style={{
            ...styles.navButton,
            backgroundColor: pokemon.color,
            opacity: pokemonId > 1 ? 1 : 0.5,
          }}
          disabled={pokemonId <= 1}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={{
            ...styles.navButton,
            backgroundColor: pokemon.color,
          }}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 25 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 20,
  },
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
  },
  chipStyle: {
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  statsCard: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  cardValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
});
