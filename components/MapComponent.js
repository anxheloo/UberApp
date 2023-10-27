import React, { Component, useContext, useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "../global/mapStyle";
import { PracticeContext } from "../context/contexts2";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const MapComponent = ({ latitude, longitude, userOrigin, userDestination }) => {
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
      >
        {userOrigin.latitude && (
          <Marker
            image={require("../assets/location.png")}
            // coordinate={{ latitude: latitude, longitude: longitude }}
            coordinate={userOrigin}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}

        {userDestination.latitude && (
          <Marker
            image={require("../assets/location.png")}
            // coordinate={{ latitude: latitude, longitude: longitude }}
            coordinate={userDestination}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default MapComponent;
