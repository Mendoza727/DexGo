import { createContext, PropsWithChildren } from "react";
import {
  NavigationContainer,
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
} from "@react-navigation/native";
import {
  adaptNavigationTheme,
  Provider as PaperProvider,
  MD3LightTheme as PaperLightTheme,
  MD3DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { useColorScheme } from "react-native";

// Adaptación de temas para react-navigation
const { LightTheme: NavigationLightTheme, DarkTheme: NavigationDarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavDefaultTheme,
  reactNavigationDark: NavDarkTheme,
});

// Estilos de fuentes por defecto
const defaultFontConfig = {
  regular: { fontFamily: "Roboto-Regular", fontWeight: "400" as "400" },
  medium: { fontFamily: "Roboto-Medium", fontWeight: "500" as "500" },
  bold: { fontFamily: "Roboto-Bold", fontWeight: "700" as "700" },
  heavy: { fontFamily: "Roboto-Black", fontWeight: "900" as "900" },
};

// Combina los temas de Navigation y Paper, asegurándose de que `fonts` no sea `undefined`
const CombinedLightTheme = {
  ...PaperLightTheme,
  ...NavigationLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    ...NavigationLightTheme.colors,
  },
  fonts: { ...PaperLightTheme.fonts, ...defaultFontConfig }, // Se asegura que fonts esté definido
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
  fonts: { ...PaperDarkTheme.fonts, ...defaultFontConfig }, // Se asegura que fonts esté definido
};

// Tema adaptado solo para NavigationContainer (excluyendo fonts e isV3)
const getNavigationTheme = (theme: typeof CombinedLightTheme | typeof CombinedDarkTheme) => ({
  ...theme,
  colors: theme.colors,
  fonts: defaultFontConfig, // Asegura que `fonts` esté siempre presente
});

export const ThemeContext = createContext({
  isDark: false,
  theme: CombinedLightTheme,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;

  // Tema adaptado solo con propiedades necesarias para NavigationContainer
  const navigationTheme = getNavigationTheme(theme);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{
            isDark: isDarkTheme,
            theme
        }}>
        {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
