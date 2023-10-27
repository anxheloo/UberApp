import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import { colors, parameters, title } from "../global/styles";
// import { Icon } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { filterData, carsAround } from "../global/data";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { mapStyle } from "../global/mapStyle";
import * as Location from "expo-location";
import { Linking } from "react-native";
// import { useDrawerStatus } from "@react-navigation/drawer";
import { PracticeContext } from "../context/contexts2";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const _map = useRef(1);
  const [userLocation, setUserLocation] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // const { lat, setLat, lon, setLon, address, setAddress, name, setName } =
  //   useContext(PracticeContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync({
        // title: "Are you sure?",
      });
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      // setUserLocation(location);
      setLat(location.coords.latitude);
      setLon(location.coords.longitude);
      // console.log("1-THIS IS USER location: ", userLocation);
      // console.log("1-THIS IS USER location: ", location);
      // console.log("1-THIS IS lon: ", userLocation.coords.longitude);
      // console.log("1-THIS IS lat: ", userLocation.coords.latitude);
      // console.log("2-THIS IS lon: ", lon);
      // console.log("2-THIS IS lat: ", lat);
      // console.log("3-THIS IS USER location: ", location);
      console.log("1-THIS IS lon: ", location.coords.longitude);
      console.log("1-THIS IS lat: ", location.coords.latitude);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: parameters.statusBarHeight,
          backgroundColor: colors.blue,
        }}
      ></View>

      <View style={styles.header}>
        <View style={styles.icon1}>
          <TouchableOpacity
            onPress={() => {
              console.log("button pressed");
              navigation.openDrawer();
            }}
          >
            <Feather name="menu" size={40} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView bounces={false}>
        <View style={styles.home}>
          <Text style={styles.text1}>Destress your comute</Text>

          <View style={styles.view1}>
            <View style={styles.view8}>
              <Text style={styles.text2}>
                Read a book, Take a namp. Stare out the window.
              </Text>
              <TouchableOpacity
                disabled={!lat}
                onPress={() => {
                  navigation.navigate("RequestScreen", {
                    currentLat: lat,
                    currentLon: lon,
                  });
                }}
              >
                <View style={styles.button1}>
                  {lat ? (
                    <Text style={styles.button1Text}>Ride with Uber</Text>
                  ) : (
                    <ActivityIndicator></ActivityIndicator>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            <Image source={require("../assets/uberCar.png")}></Image>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <FlatList
            data={filterData}
            keyExtractor={(item) => item.id}
            numRows={4}
            // numRows={4}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.view2}>
                  <Image source={item.image} style={styles.image2}></Image>
                </View>
                <View>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </View>
            )}
          ></FlatList>
        </View>

        <View style={styles.view3}>
          <Text style={{ paddingHorizontal: 10 }}> Where to ?</Text>
          <View style={styles.view4}>
            <AntDesign name="clockcircle" size={24} color={colors.grey1} />
            <Text style={{ paddingHorizontal: 7 }}> Now</Text>
            <Entypo name="chevron-small-down" size={24} color="black" />
          </View>
        </View>

        <View>
          <View style={styles.view5}>
            <View style={styles.view7}>
              <Entypo name="location-pin" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: colors.black }}>
                Rruga Shefqet Musaraj
              </Text>
              <Text style={{ color: colors.grey3 }}>Big Market, 1005</Text>
            </View>
            <View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color={colors.grey3}
              />
            </View>
          </View>

          <View style={{ ...styles.view5, borderBottomWidth: 0 }}>
            <View style={styles.view7}>
              <Entypo name="location-pin" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: colors.black }}>
                Rruga Sali Butka
              </Text>
              <Text style={{ color: colors.grey3 }}>
                Chilli Snack Bar, 1005
              </Text>
            </View>
            <View style={{}}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={28}
                color={colors.grey3}
              />
            </View>
          </View>
        </View>

        {!errorMsg ? (
          <View>
            <Text style={styles.text4}>Around you</Text>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                showsUserLocation
                followsUserLocation
                initialRegion={{
                  latitude: 41.327572,
                  longitude: 19.819281,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                // showsTraffic
              >
                {carsAround.map((marker, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    image={require("../assets/carMarker.png")}
                  />
                ))}
              </MapView>
            </View>
          </View>
        ) : (
          <Text>{errorMsg}</Text>
        )}

        {/* <TouchableOpacity onPress={handleOpenMaps}>
          <Text>Press me</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    // paddingTop: parameters.statusBarHeight,
  },

  header: {
    backgroundColor: colors.blue,
    height: parameters.headerHeight,
    // paddingTop: parameters.statusBarHeight,
    // alignItems: "flex-start",
    justifyContent: "center",
  },

  icon1: {
    marginLeft: 15,
  },

  home: {
    backgroundColor: colors.blue,
    paddingLeft: 20,
    paddingBottom: 20,
  },

  text1: {
    color: colors.white,
    fontSize: 21,
    paddingBottom: 20,
    paddingTop: 20,
  },

  view1: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 5,
  },

  view8: {
    flex: 4,
  },

  text2: {
    color: colors.white,
    fontSize: 16,
    width: "70%",
  },

  button1: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  card: {
    alignItems: "center",
    margin: SCREEN_WIDTH / 22,
    justifyContent: "center",
  },

  view2: {
    marginBottom: 5,
  },

  image2: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },

  button1Text: {
    color: colors.white,
    fontSize: 17,
  },

  image1: {
    height: 100,
    width: 100,
  },

  title: {
    color: colors.black,
    fontSize: 16,
  },

  view3: {
    flexDirection: "row",
    marginTop: 5,
    height: 50,
    backgroundColor: colors.grey6,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },

  text3: {
    marginLeft: 15,
    fontSize: 20,
    color: colors.black,
  },

  view4: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 15,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },

  view5: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 25,
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderBottomColor: colors.grey4,
    borderBottomWidth: 1,
    // flex: 1,
  },

  view6: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },

  view7: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  map: {
    height: 150,
    marginVertical: 0,
    width: SCREEN_WIDTH * 0.92,
  },
  text4: {
    fontSize: 20,
    color: colors.black,
    marginLeft: 20,
    marginBottom: 20,
  },

  carsAround: {
    width: 28,
    height: 14,
  },

  location: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  view9: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "white",
  },
});

export default HomeScreen;
