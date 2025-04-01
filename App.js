import { StyleSheet, Text, View, Button, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { loadData, saveData } from "./src/datamodel/mydata";
export default function App() {
  const [name, setName] = useState("");

  const [namesList, setNamesList] = useState([]);

  useEffect(() => {
    const fun = async () => {
      const data = await loadData();
      setName(data?.name);
    };
    fun();
  }, []);
  const nameChangeHandler = (val) => setName(val);
  const submitHandler = async () => {
    const newNamesList = [...namesList, name];
    await saveData({ names: newNamesList });
    setNamesList(newNamesList);
    setName(""); // Clear input after submission
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={namesList}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text>My name is {name}</Text>
      <TextInput
        placeholder="Input Name"
        value={name}
        onChangeText={nameChangeHandler}
        onSubmitEditing={submitHandler}
        style={styles.textInput}
      />
      <Button title="submit" onPress={submitHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    width: 150,
    padding: 5,
  },
});
