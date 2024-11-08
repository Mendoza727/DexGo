import "react-native-gesture-handler";
import { StackNavigation } from "./src/navigation/StackNavigation";
import { ThemeContextProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <StackNavigation />
    </ThemeContextProvider>
  );
}
