module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'], // Asegúrate de que esta sea tu carpeta principal
          alias: {
            '@/': './src/', // Alias configurado correctamente
          },
        },
      ],
    ],
  };
};