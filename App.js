import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

axios({
  method: 'get',
  url: 'api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=18df0e05d5965b130dbc58e2c9ef47f7',
}).then((response) => {
    console.log(response.data);
  });
  // testing free weather api
  // 401 unauthorized

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
