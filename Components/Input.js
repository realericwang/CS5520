import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

export default function Input({ autoFocus = false }) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleBlur = () => {
    setIsFocused(false);
    setIsSubmitted(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsSubmitted(false);
  };

  const renderFeedback = () => {
    if (text.length >= 3) {
      return <Text>Thank you</Text>;
    } else {
      return <Text>Please type more than 3 characters</Text>;
    }
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        placeholder="Enter text here"
        autoCorrect={true}
        onChangeText={(changedText) => {
          setText(changedText);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType="default"
        value={text}
        style={{ borderBottomColor: 'red', borderBottomWidth: 1 }}
      />
      {isFocused && text.length > 0 && (
        <Text>Character count: {text.length}</Text>
      )}
      {!isFocused && isSubmitted && renderFeedback()}
    </View>
  );
}

const styles = StyleSheet.create({});