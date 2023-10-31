import React, {
  Component,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "../global/mapStyle";
import { PracticeContext } from "../context/contexts2";
import { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const MapComponent = ({
  latitude,
  longitude,
  currentLat,
  currentLon,
  userOrigin,
  userDestination,
}) => {
  const mapRef = useRef(5);
  // useEffect(() => {
  //   if (userDestination.latitude !== null) {
  //     const intervalId = setInterval(() => {
  //       mapRef.current.fitToCoordinates([userOrigin, userDestination]);
  //     }, 500);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }
  // }, [userOrigin, userDestination]);

  // useEffect(() => {
  //   setInterval(() => {
  //     if (userDestination.latitude !== null) {
  //       mapRef.current.fitToCoordinates([userOrigin, userDestination], {
  //         edgePadding: { top: 150, right: 50, left: 50, bottom: 150 },
  //         animated: true,
  //       });
  //     }
  //   }, 500);
  // }, []);

  // useEffect(() => {
  //   if (userDestination.latitude !== null) {
  //     mapRef.current.animateToRegion({
  //       latitude: userDestination.latitude,
  //       longitude: userDestination.longitude,
  //       latitudeDelta: 3,
  //       longitudeDelta: 3,
  //     });
  //   } else {
  //     mapRef.current.animateToRegion(mapState);
  //   }
  // }, [userDestination]);

  // useEffect(() => {
  //   goToLocation();
  // }, []);

  // const goToLocation = (mapRef, userOrigin, userDestination) => {
  //   //   //Animate the user to new region. Complete this animation in 3 seconds
  //   if (userDestination.latitude !== null) {
  //     mapRef.current.fitToCoordinates([userOrigin, userDestination], {
  //       edgePadding: { top: 150, right: 50, left: 50, bottom: 250 },
  //       animated: true,
  //       useNativeDriver: true,
  //     });
  //   } else {
  //     // mapRef.current.animateToRegion(
  //     //   [
  //     //     {
  //     //       latitude: 40.056395,
  //     //       longitude: 20.102161,
  //     //       latitudeDelta: 4,
  //     //       longitudeDelta: 4,
  //     //     },
  //     //   ],
  //     //   {
  //     //     edgePadding: {
  //     //       top: 20,
  //     //       right: 20,
  //     //       bottom: 20,
  //     //       left: 20,
  //     //     },
  //     //     useNativeDriver: true,
  //     //     animated: true,
  //     //   }
  //     // );

  //     mapRef.current.fitToCoordinates([currentLat, currentLon], {
  //       edgePadding: { top: 150, right: 50, left: 50, bottom: 250 },
  //       animated: true,
  //       useNativeDriver: true,
  //     });
  //   }
  // };

  const o = {
    latitude: userOrigin?.latitude,
    longitude: userOrigin?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const d = {
    latitude: userDestination?.latitude,
    longitude: userDestination?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 40.056395,
          longitude: 20.102161,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
        // region={{
        //   latitude:
        //     userDestination !== null
        //       ? (userOrigin.latitude + userDestination.latitude) / 2
        //       : 40.056395,
        //   longitude:
        //     userDestination !== null
        //       ? (userOrigin.longitude + userDestination.longitude) / 2
        //       : 20.102161,
        //   // latitudeDelta: 0.0922,
        //   // longitudeDelta: 0.0421,
        //   latitudeDelta: 4,
        //   longitudeDelta: 4,
        // }}
        ref={mapRef}
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
            coordinate={userDestination}
            anchor={{ x: 0.5, y: 0.5 }}
            /* image={require("../assets/location.png")} */
          >
            <Image
              source={require("../assets/location.png")}
              style={{ borderRadius: 50, width: 20, height: 20 }}
            ></Image>
            {/* coordinate={{ latitude: latitude, longitude: longitude }} */}
          </Marker>
        )}

        {userDestination.latitude && (
          <MapViewDirections
            origin={o}
            destination={d}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="black"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onReady={(result) => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: SCREEN_WIDTH / 10,
                  bottom: SCREEN_HEIGHT / 10,
                  left: SCREEN_WIDTH / 10,
                  top: SCREEN_HEIGHT / 10,
                },
              });
            }}
            onError={(errorMessage) => {
              console.log("GOT AN ERROR:", errorMessage);
            }}
          />
        )}
      </MapView>
    </View>
  );
};

// {
//   userDestination.latitude ? (
//     <Polyline
//       coordinates={[o, d]} //specify our coordinates
//       strokeColor={"#000"}
//       strokeWidth={3}
//       // lineDashPattern={[1]}
//     />
//   ) : (
//     <Text></Text>
//   );
// }

const styles = StyleSheet.create({
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default MapComponent;
