import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import MapComponent from "../components/MapComponent";
import { parameters, colors } from "../global/styles";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { color } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { PracticeContext } from "../context/contexts2";
import { OriginContexts } from "../context/contexts";
import { DestinationContexts } from "../context/contexts";
import { useIsFocused } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { rideData } from "../global/data";
import { useRoute } from "@react-navigation/native";
import { Linking } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const RequestScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [bottomSheetIndex, setBottomSheetIndex] = useState(1);
  const { currentLat, currentLon } = route.params;
  const { origin, dispatchOrigin } = useContext(OriginContexts);
  const { destination, dispatchDestination } = useContext(DestinationContexts);
  const [userOrigin, setUserOrigin] = useState({
    latitude: origin.latitude,
    longitude: origin.longitude,
  });
  const [userDestination, setUserDestination] = useState({
    latitude: destination.latitude,
    longitude: destination.longitude,
  });
  useEffect(() => {
    setUserOrigin({
      latitude: origin.latitude,
      longitude: origin.longitude,
    });

    setUserDestination({
      latitude: destination.latitude,
      longitude: destination.longitude,
    });
  }, [origin, destination]);
  useEffect(() => {
    if (route.params?.state2 !== undefined) {
      setBottomSheetIndex(route.params.state2);
    }
  }, [route.params]);
  // const { lat, setLat, lon, setLon, address, setAddress, name, setName } =
  //   useContext(PracticeContext);
  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["5%", "70%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.view10}>
        <View style={styles.view11}>
          <AntDesign name="clockcircleo" size={24} color="white" />
        </View>
        <View>
          <Text style={styles.text9}>{item.street}</Text>
          <Text style={{ fontSize: 12, color: colors.grey3 }}>{item.area}</Text>
        </View>
      </View>
    ),
    []
  );

  const getDirections = () => {
    const origin = `${userOrigin?.latitude},${userOrigin?.longitude}`;
    const destination = `${userDestination?.latitude},${userDestination?.longitude}`;
    const mode = "driving"; // You can change the mode if needed

    const url = `https://www.google.com/maps/dir/?api=1&travelmode=${mode}&dir_action=navigate&origin=${origin}&destination=${destination}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
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
            marginBottom: 10,
          }}
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

        <View style={styles.view4}>
          <View>
            <Image source={require("../assets/transit.png")}></Image>
          </View>

          <View
            style={{
              gap: 10,
              // marginRight: 15,
            }}
          >
            <TouchableOpacity
              style={{
                width: SCREEN_WIDTH * 0.6,
                height: 45,
                backgroundColor: colors.grey6,
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("Destination", {
                  currentLat,
                  currentLon,
                })
              }
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                }}
              >
                From where ?
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: SCREEN_WIDTH * 0.6,
                  height: 45,
                  backgroundColor: colors.grey6,
                  justifyContent: "center",
                }}
                onPress={() => {
                  // navigation.navigate("Destination")
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                  }}
                >
                  ...
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Entypo name="plus" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {isFocused && (
        <MapComponent
          latitude={origin.latitude}
          longitude={origin.longitude}
          currentLat={currentLat}
          currentLon={currentLon}
          userOrigin={userOrigin}
          userDestination={userDestination}
        ></MapComponent>
      )}

      {userDestination && (
        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            position: "absolute",
            top: 250,
            right: 100,
            zIndex: 99,
            backgroundColor: "red",
          }}
          onPress={getDirections}
        >
          <Text>Press me</Text>
        </TouchableOpacity>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={
          // routeStateFromDestination !== null ? routeStateFromDestination : state
          // 1
          bottomSheetIndex
        }
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetFlatList
          keyboardShouldPersistTaps="always"
          data={rideData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            backgroundColor: "white",
            paddingVertical: 15,
          }}
          ListHeaderComponent={
            <View style={styles.view10}>
              <View style={styles.view11}>
                <Entypo name="star-outlined" size={24} color="white" />
              </View>
              <View>
                <Text style={styles.text9}>Saved Places</Text>
              </View>
            </View>
          }
          ListFooterComponent={
            <View>
              <View style={styles.view10}>
                <View style={styles.view11}>
                  <FontAwesome name="map-marker" size={24} color="white" />
                </View>
                <View>
                  <Text style={styles.text9}>Set location on map</Text>
                </View>
              </View>

              <View style={styles.view10}>
                <View style={styles.view11}>
                  <Feather name="skip-forward" size={24} color="white" />
                </View>
                <View>
                  <Text style={styles.text9}>Enter destination later</Text>
                </View>
              </View>
            </View>
          }
        ></BottomSheetFlatList>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: parameters.statusBarHeight,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
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
    zIndex: 8,
  },

  view2: {
    // height: SCREEN_HEIGHT * 0.21,
    paddingBottom: 10,
    alignItems: "center",
    zIndex: 5,
    backgroundColor: colors.white,
  },

  view3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
    backgroundColor: colors.white,
    //height:30,
    // zIndex: 10,
  },

  view4: {
    flexDirection: "row",
    alignItems: "center",
  },
  view5: {
    backgroundColor: colors.grey7,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
  },
  view6: {
    backgroundColor: colors.grey6,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    paddingLeft: 0,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.grey1,
  },

  image1: { height: 70, width: 30, marginRight: 10, marginTop: 10 },
  view7: {
    flexDirection: "row",
    alignItems: "center",
  },
  view8: {
    marginLeft: 10,
  },
  view10: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: colors.grey5,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 5,
    // backgroundColor: "red",
  },
  view11: {
    backgroundColor: colors.grey,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    // marginTop: 15,
  },

  contentContainer: {
    backgroundColor: "white",
  },

  view12: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey4,
  },

  text2: {
    fontSize: 18,
    color: colors.grey1,
  },
  text3: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
    marginRight: 5,
  },

  text4: { color: colors.grey2, marginTop: 4 },

  view13: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  button1: {
    height: 40,
    width: 100,
    backgroundColor: colors.grey6,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  button2: {
    height: 50,
    backgroundColor: colors.grey10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },

  button1Text: {
    fontSize: 17,
    marginTop: -2,
    color: colors.black,
  },

  button2Text: {
    color: colors.white,
    fontSize: 23,
    marginTop: -2,
  },

  view14: {
    alignItems: "center",
    flex: 5,
    flexDirection: "row",
  },
  view15: {
    backgroundColor: colors.grey6,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  view16: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  text5: {
    fontSize: 12,
    color: colors.black,
    marginLeft: 3,
    fontWeight: "bold",
    paddingBottom: 1,
  },

  view17: {},

  view18: {},

  view19: { flex: 1.7, alignItems: "flex-end" },

  icon: { paddingBottom: 2 },

  image2: { height: 60, width: 60 },

  view20: { marginRight: 10 },

  text6: {
    fontSize: 15,
    color: colors.black,
    fontWeight: "bold",
  },

  view21: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 15,
  },

  view22: {
    alignItems: "center",
    marginBottom: -20,
  },

  sectionHeaderContainer: {
    backgroundColor: "white",
    marginTop: 30,
    paddingLeft: 15,
  },

  text7: {
    fontSize: 28,
    color: colors.black,
    marginRight: 5,
  },

  text8: {
    fontSize: 15,
    color: colors.grey2,
    textDecorationLine: "line-through",
  },

  button3: {
    height: 60,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH - 110,
    marginBottom: 10,
  },

  view23: {
    flexDirection: "row",
    backgroundColor: colors.cardbackground,
    // elevation:10,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    height: 80,
  },

  button2Image: {
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.grey6,
    marginBottom: 10,
  },
  text9: { fontSize: 15, color: colors.grey1 },

  map: {
    marginVertical: 0,
    width: SCREEN_WIDTH,
    zIndex: -1,
  },

  centeredView: {
    zIndex: 14,
  },
  modalView: {
    marginHorizontal: 20,
    marginVertical: 60,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 16,
  },

  view24: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    paddingHorizontal: 20,
  },

  view25: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  flatlist: {
    marginTop: 20,
  },

  text10: { color: colors.grey2, paddingLeft: 10 },
});

export default RequestScreen;
