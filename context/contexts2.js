import React, { createContext, useState, useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";

const PracticeContext = createContext();

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

export { PracticeContext, PracticeProvider };
