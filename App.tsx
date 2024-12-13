import "react-native-gesture-handler";
import { StackNavigation } from "./src/navigation/StackNavigation";
import { ThemeContextProvider } from "./src/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigation />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
