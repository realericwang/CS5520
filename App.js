import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input'; 
import { useState } from 'react';

export default function App() {
  const [receivedData, setReceivedData] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const appName = 'React Native NEU 5520';

  const handleInputData = (inputText) => {
    setReceivedData(inputText);
    setIsModalVisible(false);
    console.log('Input text:', inputText);
  };

  return (
    <View style={styles.container}>
      <Header title={appName}>
        <Text style={styles.childText}>Child Component</Text>
      </Header>
      <View style={styles.buttonContainer}>
        <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
      </View>
      <Input autoFocus={true} inputHandler={handleInputData} visible={isModalVisible} />
      <Text style={styles.receivedDataText}>{receivedData}</Text>
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
    padding: 20,
  },
  childText: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    width: '30%',
    marginVertical: 20,
  },
  receivedDataText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    color: 'red',
  },
});
