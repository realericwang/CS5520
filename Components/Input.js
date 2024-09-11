import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function Input() {
  const [text, setText] = useState('');
  
  return (
    <View>
      <TextInput
        placeholder="Enter text here"
        autoCorrect={true}
        onChangeText={(changedText) => {
          setText(changedText);
        }}
        keyboardType="default"
        value={text}
        style={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});