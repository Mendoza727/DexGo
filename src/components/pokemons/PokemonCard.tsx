import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Pokemon } from '@/domain/entities/Pokemon';
import { Card, Text } from 'react-native-paper';
import { FadeInImage } from '@/components/ui/FadeInImages';
import { memo } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '@/navigation/StackNavigation';
import { Formatter } from '@/config/helpers/Formatter';

interface Props {
    pokemon: Pokemon | any;
}

const getContrastColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? 'black' : 'white';
};

export const PokemonCard = memo(({ pokemon }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const colorLuminous = getContrastColor(pokemon.color);

    return (
        <Pressable
            style={{ flex: 1 }}
            onPress={() => navigation.navigate('Pokemon', { pokemonId: pokemon.id })}
        >
            <Card style={[styles.cardContainer, { backgroundColor: pokemon.color }]}>
                <Text
                    style={[
                        styles.name,
                        {
                            textShadowColor: 'rgba(0, 0, 0, 0.8)',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 2
                        }
                    ]}
                    variant="bodyLarge"
                    lineBreakMode="middle"
                >
                    {Formatter.capitalize(pokemon.name)}
                    {'\n#' + pokemon.id}
                </Text>

                {/* pokeball image background */}
                <View style={styles.pokeballContainer}>
                    <Image
                        source={require('../../assets/pokeball-light.png')}
                        style={styles.pokeball}
                    />
                </View>

                {/* pokemon image */}
                <FadeInImage
                    uri={pokemon.avatar}
                    style={styles.pokemonImage}
                />

                {/* types pokemon */}
                <Text
                    style={[
                        styles.name,
                        { marginTop: 35, color: colorLuminous, textShadowColor: 'rgba(0, 0, 0, 0.8)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 },
                    ]}
                >
                    {pokemon.types[0]}
                </Text>
            </Card>
        </Pressable>
    );
});

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        flex: 0.5,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        color: 'white',
        top: 10,
        left: 10,
    },
    pokeball: {
        width: 100,
        height: 100,
        right: -25,
        top: -25,
        opacity: 0.4,
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -15,
        top: -30,
    },
    pokeballContainer: {
        alignItems: 'flex-end',
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
        opacity: 0.5,
    },
});
