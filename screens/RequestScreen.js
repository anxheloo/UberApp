import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import MapComponent from "../components/MapComponent";
import { parameters } from "../global/styles";

const RequestScreen = () => {
  return (
    <View style={styles.container}>
      <MapComponent></MapComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
});

export default RequestScreen;
