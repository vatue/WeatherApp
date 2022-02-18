import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const getWeather = async (city) => {
    try {
      // Get weather data from api
      const response = await axios.get(`http://192.168.1.109:3001/weather/${searchValue}`);
      setCurrentWeather(response.data[0]); // index 0 = current weather
      // Forecast = indexes 2->
      const resData = response.data;
      resData.splice(0, 2);
      resData.splice(7,2)
      setForecast(resData);
    } catch (err) {
      // Set these to null so app doesnt render anything if city not found or some other error
      setCurrentWeather(null);
      setForecast(null);
      Alert.alert("City not found!");
      console.log(err);
    }
    
  }
  const handleSearchButtonClick = () => {
    getWeather(searchValue);
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
      
      {currentWeather != null ? 
      
      <View style={styles.weatherContainer}>
        <Text style={{color: "white", fontSize: 24}}>Current weather in {searchValue}</Text>
        <View style={styles.weatherData}>
        <View>
          <Image
          style={styles.weatherIcon}
          source={{
            uri: `https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`,
          }}
          />
          <Text style={{color: "white", fontSize: 32}}>{currentWeather.temp} °C</Text>
        </View>
        <View>
          <Text style={styles.descText}>{currentWeather.date}</Text>
          <Text style={styles.descText}>{currentWeather.description}</Text>
        </View></View>
      </View>: null}


      {forecast != null ? 
      <View style={styles.weatherContainer}>
        <Text style={{color: "white", fontSize: 24}}>7 Days forecast</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {forecast.map((item, index) => (
          <View key={index} style={{marginVertical: 25, marginHorizontal: 25}}>
            <Text style={{color:"white"}}>{item.date}</Text>
            <View style={{flexDirection: "row", alignItems:"center"}}>
            <Image
            style={styles.weatherIconSmall}
            source={{
              uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
            }}
            />
            <Text style={{color:"white", fontSize: 28}}>{item.dayTemp} °C</Text>
            </View>
            <Text style={{color: "white"}}>{item.description}</Text>
          </View>
        ))}
        </ScrollView>
        
        
      </View> : null}
  </View>
  );
}

const styles = StyleSheet.create({
  descText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20
  },  
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherIconSmall: {
    width: 50,
    height: 50,
  },
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
  weatherContainer: {
    alignItems: "center",
    borderWidth: 1,
    width:"80%",
    marginTop: 15,
    borderRadius: 15,
    borderColor: "#ffffff",
    padding: 10
  },
  weatherData: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20
  },
});
