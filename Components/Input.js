import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

export default function Input({ autoFocus = false, inputHandler, visible }) {
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
      return <Text style={styles.feedbackText}>Thank you</Text>;
    } else {
      return <Text style={styles.feedbackText}>Please type more than 3 characters</Text>;
    }
  };

  const handleConfirm = () => {
    inputHandler(text);
    setText('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
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
          style={styles.input}
        />
        {isFocused && text.length > 0 && (
          <Text style={styles.characterCount}>Character count: {text.length}</Text>
        )}
        {!isFocused && isSubmitted && renderFeedback()}
        <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
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
  input: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    width: '80%',
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 20,
  },
  characterCount: {
    fontSize: 14,
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '30%',
    marginTop: 20,
  },
});