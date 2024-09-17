import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input'; 
import { useState } from 'react';

export default function App() {
  const [receivedData, setReceivedData] = useState('');
  const appName = 'React Native NEU 5520';

  const handleInputData = (inputText) => {
    setReceivedData(inputText);
    console.log('Input text:', inputText);
  };

  return (
    <View style={styles.container}>
      <Header title={appName}>
        <Text>Child Component</Text>
      </Header>
      <Input autoFocus={true} inputHandler={handleInputData} />
      <Text>{receivedData}</Text>
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
