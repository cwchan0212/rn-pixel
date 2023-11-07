import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import databaseSingleton from "./config/Database";

import Pixel from "./component/Pixel";
import React, { useState, useEffect } from "react";

export default function App() {

  const [codeData, setCodeData] = useState([]);
  const [lastCode, setLastCode] = useState("01110100011000111111100011000110001");
  const column = 5;
  const row = 7;

  const db = databaseSingleton.getDatabaseInstance();
  const alpha = "01110100011000111111100011000110001";


  const selectLastCode = async () => {
    // console.log(column, row, size, character, cellArray.join(""))
    try {
      const query = "SELECT * FROM pixel WHERE id = (SELECT MAX(id) FROM pixel);";
      const values = [];
      const data = await databaseSingleton.onExecQueryCommand(query, values);
      console.log("data")
      setCodeData(data)
      setLastCode(codeData.code)
      console.log("The new " + `${codeData.character}` + " code is added successfully. [" +  `${codeData.id}` + "]");
      ToastAndroid.show("The new " + `${codeData.character}` + " code is added successfully. [" +  `${codeData.id}` + "]", ToastAndroid.CENTER);
    } catch (error) {
      console.log("Fail to add the new code.", error);
    }
  }



  // const _setupDb = async () => {
  //   try {
  //     const query = "DROP TABLE IF EXISTS pixel;";
  //     const values = [];
  //     const cmdResult = await databaseSingleton.onExecQueryCommand(query, values);
  //     console.log("drop: success ->", cmdResult);
  //   } catch (error) {
  //     console.log("drop: ", error);
  //   }

  //   try {
  //     const query1 = `
  //       CREATE TABLE IF NOT EXISTS pixel (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         row INTEGER,
  //         column INTEGER,
  //         size INTEGER,
  //         character TEXT,
  //         code TEXT
  //       );      
  //     `;
  //     const values1 = [];
  //     const cmdResult1 = await databaseSingleton.onExecQueryCommand(query1, values1);
  //     console.log("Table created successfully.", cmdResult1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // _setupDb();
    // selectLastCode();
    const matrix = matrixArray(alpha, 7, 5)
    console.log(matrix)

  }, [])
  
  const matrixArray = (array, r, c) => {
    const matrix = []
    for (let i=0 ; i<r; i++) {
      const rowArray = [];
      for (let j=0; j<c; j++) {
        const index = i * c + j
        rowArray.push(array[index])
      }
      matrix.push(rowArray)
    }
    return matrix;
  }

  

  return (
    <View style={styles.container}>
      {/* <Pixel digitalString={alpha} /> */}
      {}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },

  view: {
    marginTop: 20,
    backgroundColor: "#fff",
    width: 80,
    height: 200,
  },

  text: {
    fontSize: 25,
    flexWrap: "wrap",
  },
});
