import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input'; 
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const appName = 'React Native NEU 5520';
  return (
    <View style={styles.container}>
      <Header title={appName}>
        <Text>Child Component</Text>
      </Header>
      <Input />
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
