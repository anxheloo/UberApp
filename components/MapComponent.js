import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "../global/mapStyle";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class MapComponent extends Component {
  render() {
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
        ></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
