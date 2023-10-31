import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import React, { useRef, useContext, useState } from "react";
import { parameters, colors } from "../global/styles";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { PracticeContext } from "../context/contexts2";
import { OriginContexts, DestinationContexts } from "../context/contexts";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Destination = ({ navigation, route }) => {
  // const { lat, setLat, lon, setLon, address, setAddress, name, setName } =
  //   useContext(PracticeContext);

  const { currentLat, currentLon } = route.params;

  const { origin, dispatchOrigin } = useContext(OriginContexts);
  const { destination, dispatchDestination } = useContext(DestinationContexts);

  const [display, setDisplay] = useState(false);
  console.log("THIS IS DISPLAY:", display);

  const textInput1 = useRef(4);
  const textInput2 = useRef(5);

  const getAddress = () => {
    console.log(textInput1.current?.getAddressText());
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <StatusBar barStyle={"dark-content"}></StatusBar>
      ) : (
        <StatusBar
          backgroundColor="#2058c0"
          barStyle="light-content"
          style="light"
        ></StatusBar>
      )}

      <View
        style={{
          paddingTop: parameters.statusBarHeight,
          backgroundColor: colors.white,
        }}
      ></View>

      <View style={styles.view2}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.view1}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: 10,
            justifyContent: "center",
            // marginBottom: 10,
          }}
          onPress={() => {}}
        >
          <View style={styles.view3}>
            <FontAwesome name="user-circle" size={25} color={colors.grey3} />
            <Text style={{ marginHorizontal: 5 }}>For Someone</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={27}
              color={colors.grey3}
            />
          </View>
        </TouchableOpacity>
      </View>

      {!display && (
        <GooglePlacesAutocomplete
          ref={textInput1}
          nearbyPlacesAPI="GooglePlacesSearch"
          placeholder="From Where..."
          listViewDisplayed="auto"
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          autoFocus={true}
          styles={autoComplete}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            // components: "country:AL",
          }}
          // onPress={(data, details = null) => {
          //   setLat(details.geometry.location.lat);
          //   setLon(details.geometry.location.lng);
          //   console.log(
          //     "THIS IS LAT and LON 2-2:",
          //     details.geometry.location.lat,
          //     details.geometry.location.lng
          //   );
          //   navigation.goBack();
          // }}

          onPress={(data, details = null) => {
            dispatchOrigin({
              type: "ADD_ORIGIN",
              payload: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: details.formatted_address,
                name: details.name,
              },
            }),
              setDisplay(true);
            // navigation.goBack();
          }}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          predefinedPlaces={[
            {
              type: "favorite",
              description: "Current Location",
              // geometry: { location: { lat: latitude, lng: longitude } },
              geometry: { location: { lat: currentLat, lng: currentLon } },
            },
            // {
            //   type: "favorite",
            //   description: "Dominos Pizza",
            //   geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
            // },
            // {
            //   type: "favorite",
            //   description: "Chicken Republic",
            //   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
            // },
          ]}
        />
      )}

      {display && (
        <GooglePlacesAutocomplete
          ref={textInput2}
          nearbyPlacesAPI="GooglePlacesSearch"
          placeholder="Going to..."
          listViewDisplayed="auto"
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          autoFocus={true}
          styles={autoComplete}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
            // components: "country:AL",
          }}
          // onPress={(data, details = null) => {
          //   setLat(details.geometry.location.lat);
          //   setLon(details.geometry.location.lng);
          //   console.log(
          //     "THIS IS LAT and LON 2-2:",
          //     details.geometry.location.lat,
          //     details.geometry.location.lng
          //   );
          //   navigation.goBack();
          // }}

          onPress={(data, details = null) => {
            dispatchDestination({
              type: "ADD_DESTINATION",
              payload: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                address: details.formatted_address,
                name: details.name,
              },
            }),
              navigation.navigate("RequestScreen", { state2: 0 });
            // navigation.goBack();
          }}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          predefinedPlaces={
            [
              // {
              //   type: "favorite",
              //   description: "Current Location",
              //   // geometry: { location: { lat: latitude, lng: longitude } },
              //   geometry: { location: { lat: lat, lng: lon } },
              // },
              // {
              //   type: "favorite",
              //   description: "Dominos Pizza",
              //   geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
              // },
              // {
              //   type: "favorite",
              //   description: "Chicken Republic",
              //   geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
              // },
            ]
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: parameters.statusBarHeight,
  },

  view1: {
    position: "absolute",
    top: 5,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  view2: {
    // height: SCREEN_HEIGHT * 0.21,
    // paddingBottom: 10,
    alignItems: "center",
    backgroundColor: colors.white,
    // marginBottom: 10,
  },

  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: colors.white,
    //height:30,
    // zIndex: 10,
  },
});

const autoComplete = {
  textInput: {
    backgroundColor: colors.grey6,
    height: 50,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white,
  },

  textInputContainer: {
    flexDirection: "row",
  },
};

export default Destination;
