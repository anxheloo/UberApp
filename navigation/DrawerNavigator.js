import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../global/styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import RequestScreen from "../screens/RequestScreen";
import { Entypo } from "@expo/vector-icons";
import StackNavigators from "./StackNavigators";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeStack"
        component={StackNavigators}
        options={{
          title: "Home",
          drawerIcon: ({ focussed, size }) => (
            <Entypo
              name="home"
              size={size}
              color={focussed ? "#7cc" : colors.grey2}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default DrawerNavigator;
