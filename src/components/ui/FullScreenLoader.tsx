import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';  // Para el gradiente de fondo

export const FullScreenLoader = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ff0000', '#ffffff']}  // Colores de gradiente similares a la Pokébola (rojo y blanco)
        style={styles.gradientBackground}
      >
        <View style={styles.welcome}>
          <LottieView
            style={styles.lottieAnimation}
            source={require('../../lotties/pokemonLoading.json')}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.text}>Cargando...</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  text: {
    fontSize: 36, 
    color: '#fff',  
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10, 
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  welcome: {
    height: 250, 
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  lottieAnimation: {
    width: 300, 
    height: 300,
  }
});
