import React, { createContext, useState, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";

export const OriginContexts = createContext();

export const DestinationContexts = createContext();

export const OriginContextProvider = (props) => {
  // const initialState = {
  //   latitude: null,
  //   longitude: null,
  //   address: "",
  //   name: "",
  // };

  const OriginReducer = (state, action) => {
    switch (action.type) {
      case "ADD_ORIGIN":
        return {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          address: action.payload.address,
          name: action.payload.name,
        };
      default:
        return state;
    }
  };

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

export const DestinationContextsProvider = (props) => {
  const DestinationReducer = (state, action) => {
    switch (action.type) {
      case "ADD_DESTINATION":
        return {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          address: action.payload.address,
          name: action.payload.name,
        };
      default:
        return state;
    }
  };

  const [destination, dispatchDestination] = useReducer(DestinationReducer, {
    latitude: null,
    longitude: null,
    address: "",
    name: "",
  });

  return (
    <DestinationContexts.Provider value={{ destination, dispatchDestination }}>
      {props.children}
    </DestinationContexts.Provider>
  );
};
