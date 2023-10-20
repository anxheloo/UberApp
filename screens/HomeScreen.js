import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { colors, parameters, title } from "../global/styles";
// import { Icon } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { filterData } from "../global/data";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon1}>
          <TouchableOpacity
            onPress={() => {
              console.log("MENU PRESSED");
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
              <View style={styles.button1}>
                <Text style={styles.button1Text}>Ride with Uber</Text>
              </View>
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
            numColumns={4}
            // numRows={4}
            // horizontal={true}
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

        {/* Here we left, after icons */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },

  header: {
    backgroundColor: colors.blue,
    height: parameters.headerHeight,
    // paddingTop: parameters.statusBarHeight,
    // alignItems: "flex-start",
    justifyContent: "center",
  },

  icon1: {
    marginLeft: 10,
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
    flex: 1,
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
    merginLeft: 20,
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