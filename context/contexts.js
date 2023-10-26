import React, { createContext, useState, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";

export const OriginContexts = createContext();

export const OriginContextProvider = (props) => {
  // const initialState = {
  //   latitude: null,
  //   longitude: null,
  //   address: "",
  //   name: "",
  // };

  function OriginReducer(state, action) {
    switch (action.type) {
      case "ADD_ORIGIN":
        return {
          lat: action.payload.latitude,
          lon: action.payload.longitude,
          address: action.payload.address,
          name: action.payload.name,
        };

      default:
        return state;
    }
  }

  const [origin, dispatchOrigin] = useReducer(OriginReducer, {
    latitude: null,
    longitude: null,
    address: "",
    name: "",
  });

  return (
    <OriginContexts.Provider value={{ origin, dispatchOrigin }}>
      {props.children}
    </OriginContexts.Provider>
  );
};
