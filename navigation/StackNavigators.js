import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import RequestScreen from "../screens/RequestScreen";

const Stack = createNativeStackNavigator();

const StackNavigators = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RequestScreen" component={RequestScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigators;
