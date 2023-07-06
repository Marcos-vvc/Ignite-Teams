import { ThemeProvider } from "styled-components/native";
import { Groups } from "@screens/Groups";
import { Loading } from "@components/Loading";
import { StatusBar } from "react-native";
import { Players } from "@screens/Players";
import theme from "./src/theme";
import { Routes } from "./src/routes";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
