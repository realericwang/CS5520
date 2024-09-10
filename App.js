import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const appName = 'React Native NEU 5520';
  return (
    <View style={styles.container}>
      <Header title={appName} >
        <Text>Child Component</Text>
       </Header> 
       <TextInput
  placeholder="Enter text here"
  autoCorrect={true}
  onChangeText={setText}
  keyboardType="default"
  value={text}
  style={{borderBottomColor: 'red', borderBottomWidth: 1}}
/>
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
