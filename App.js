import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [searchValue, setSearchValue] = useState("")
  const handleSearchButtonClick = () => {
    console.log(searchValue)
  }
  return (
    <View style={styles.body}>
    <StatusBar/>
    <Text style={styles.header}>WeatherApp</Text>
      <View style={styles.searchView}>
        <FontAwesome name="search" size={24} color="white" />
        <TextInput style={styles.searchTextInput} 
        placeholder="Search..." 
        placeholderTextColor={"#949494"}
        onChangeText={text => setSearchValue(text)}
        />
  
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonClick}>
        <Text style={styles.searchButtonText}>GET WEATHER</Text>
      </TouchableOpacity>
      <View style={styles.weatherView}>
      <Text style={{color: "white"}}>Tähän vaikka päivän sää, nää voi pistää vaikka piiloon jossei ole haettuna mitää tai jotai</Text> 
      </View>
      <View style={styles.weatherView}>
        <Text style={{color: "white"}}>Tähän vaikka scrollattava juttu viikon säästä</Text>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#1f1f1f",
    height: "100%",
    width: "100%",
    alignItems: 'center'
  },
  header: {
    color: "#ffffff",
    fontSize: 42,
    marginTop: 32,
    fontWeight: 'bold'
  },
  searchView: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
    width: "60%",
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
  },
  searchTextInput: {
    color: "#ffffff",
    fontSize: 24,
    marginLeft: 10,
    flex: 1
  },
  searchButton: {
    backgroundColor: "#1f1f1f",
    marginTop: 20,
    height: 50,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#61DBFB",
    borderWidth: 2,
    borderRadius: 15
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold"
  },
  weatherView: {
    borderWidth: 1,
    height: 200,
    width:"80%",
    marginTop: 15,
    borderRadius: 15,
    borderColor: "#ffffff",
    padding: 20
  }
});
