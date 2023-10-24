import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import StackNavigators from "./StackNavigators";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator></DrawerNavigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default RootNavigator;
