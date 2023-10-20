import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { StatusBar } from "expo-status-bar";
import { colors } from "./global/styles";
import { color } from "@rneui/base";

const App = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <StatusBar barStyle="dark-content"></StatusBar>
      ) : (
        <StatusBar backgroundColor="#2058c0" style="light"></StatusBar>
      )}
      <HomeScreen></HomeScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
