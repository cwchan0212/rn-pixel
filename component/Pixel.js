import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";

import databaseSingleton from "../config/Database";

const Pixel = ({ digitalString }) => {
  const pixelArray = digitalString.split("");
  const [id, setId] = useState(undefined)

  const [cellArray, setCellArray] = useState(pixelArray);
  const [character, setCharacter] = useState("");
  const [lastCodeData, setLastCodeData] = useState([]);

  const column = 5;
  const row = 7;
  const size = column * row;

  const changePixel = (index) => {
    const newCellArray = [...cellArray]; // Create a copy of the cellArray
    newCellArray[index] = newCellArray[index] === "1" ? "0" : "1"; // Toggle the value at the specified index
    setCellArray(newCellArray); // Update cellArray with the new values
  };

  const insertCode = async () => {
    console.log(column, row, size, character, cellArray.join(""));
    try {
      const query = "INSERT INTO pixel (column, row, size, character, size) VALUES (?, ?, ?, ?, ?);";
      const values = [column, row, size, character, cellArray.join("")];
      console.log("values: " + `${column}`);
      const newId = await databaseSingleton.onExecQueryCommand(query, values);
      console.log("The new " + `${character}` + " code is added successfully. [" + `${newId}` + "]");
      ToastAndroid.show("The new " + `${character}` + " code is added successfully. [" + `${newId}` + "]", ToastAndroid.CENTER);
      selectLastCode()
    } catch (error) {
      console.log("Fail to add the new code.", error);
    }
  };

  const selectLastCode = async () => {
    console.log(column, row, size, character, cellArray.join(""));
    try {
      const query = "SELECT * FROM pixel ORDER BY id DESC LIMIT 1";
      const values = [];
      // const query = "UPDATE pixel SET character = ?, code = ? WHERE id = ? "
      // const values = ["s", "00000000000111110000011100000111110", 45];


      console.log("values: " + `${column}`);
      const data = await databaseSingleton.onExecQueryCommand(query, values);
      setLastCodeData(data[0])
      // console.log("The last code id " + `${lastCodeData.id}` + " is " + `${lastCodeData.character}` + ".");
      // ToastAndroid.show("The last code id " + `${lastCodeData.id}` + " is " + `${lastCodeData.character}` + ".", ToastAndroid.CENTER);
    } catch (error) {
      console.log("Fail to select the last code.", error);
    }
  };

  useEffect(() => {
    selectLastCode()
  }, [])
  
  const dotImageSource = (char) => {
    char === "1" ? require("../assets/images/dot-orange.png") : require("../assets/images/dot-black.png");
  };

  return (
    <>
      <View style={{ flexDirection: 'row', width: 250}}>
        <Text style={{ color: '#fff', fontSize: 20, marginBottom: 10}}>{lastCodeData.id} - {lastCodeData.character}</Text>
      </View>

    <View style={styles.pixelContainer}>

      {cellArray.map((char, index) => (
        <View style={[styles.cell, { backgroundColor: char === "1" ? "darkorange" : "#000" }]} key={index}>
          <TouchableOpacity onPress={() => changePixel(index)}>
            <Image style={styles.dot} source={dotImageSource} />

            {/* <Text style={[styles.text, { color: char === "1" ? "darkorange" : "#000" }]}>X</Text> */}
          </TouchableOpacity>
        </View>
      ))}

      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <View style={[styles.view, { alignItems: "center" }]}>
          <TextInput style={styles.text} onChangeText={(text) => setCharacter(text)}>
            A
          </TextInput>
        </View>

        <View style={styles.view}>
          <Text style={styles.text}>{cellArray.join("")}</Text>
        </View>

        <TouchableOpacity onPress={() => insertCode()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  pixelContainer: {
    flexDirection: "row", // Arrange cells in rows
    flexWrap: "wrap", // Wrap to next row when necessary
    width: 250,
    justifyContent: "center",
  },
  cell: {
    width: 50, // Each cell takes 20% of the container width
    height: 50,
    borderRadius: 50,
    aspectRatio: 1, // Ensures each cell is a square
    borderWidth: 0,
    borderColor: "lightgrey", // Add a border for visibility
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 50,
    height: 50,
  },

  view: {
    backgroundColor: "#fff",
    marginTop: 20,
    width: 250,
    padding: 10,
    // margin: 10,
    borderRadius: 10,
  },

  text: {
    fontSize: 25,
    flexWrap: "wrap",
  },

  button: {
    width: 250,
    marginTop: 15,
    padding: 5,
    backgroundColor: "darkblue",
    alignItems: "center",
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 25,
    color: "#fff",
  },
});
export default Pixel;
