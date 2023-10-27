import React, { createContext, useState, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";

const PracticeContext = createContext();

const DestinationContext = createContext();

const PracticeProvider = (props) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  return (
    <PracticeContext.Provider
      value={{ lat, setLat, lon, setLon, address, setAddress, name, setName }}
    >
      {props.children}
    </PracticeContext.Provider>
  );
};

const DestinationProvider = (props) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  return (
    <DestinationContext.Provider
      value={{ lat, setLat, lon, setLon, address, setAddress, name, setName }}
    >
      {props.children}
    </DestinationContext.Provider>
  );
};

export {
  PracticeContext,
  PracticeProvider,
  DestinationContext,
  DestinationProvider,
};
