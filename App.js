import "react-native-gesture-handler";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigators from "./navigation/StackNavigators";
import RootNavigator from "./navigation/RootNavigator";
import { PracticeProvider, PracticeContext } from "./context/contexts2";

const App = () => {
  return (
    <PracticeProvider>
      <View style={styles.container}>
        {Platform.OS === "ios" ? (
          <StatusBar barStyle="light-content" style="light"></StatusBar>
        ) : (
          <StatusBar backgroundColor="#2058c0" style="light"></StatusBar>
        )}

        <RootNavigator></RootNavigator>
      </View>
    </PracticeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
