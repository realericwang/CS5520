import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  Alert,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";

export default function Input({
  autoFocus = false,
  inputHandler,
  onDismiss,
  visible,
}) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (visible) {
      setText("");
      setIsConfirmEnabled(false);
      setIsFocused(false);
      setIsSubmitted(false);
    }
  }, [visible]);

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
      return (
        <Text style={styles.feedbackText}>
          Please type more than 3 characters
        </Text>
      );
    }
  };

  const handleConfirm = () => {
    inputHandler(text);
    setText("");
    setIsConfirmEnabled(false);
    onDismiss();
  };

  const handleCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          setText("");
          setIsConfirmEnabled(false);
          onDismiss();
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <TextInput
            ref={inputRef}
            placeholder="Enter text here"
            autoCorrect={true}
            onChangeText={(changedText) => {
              setText(changedText);
              setIsConfirmEnabled(changedText.length >= 3);
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType="default"
            value={text}
            style={styles.input}
          />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            style={styles.image}
            alt="Network image"
          />
          <Image
            source={require("../assets/2617812.png")}
            style={styles.image}
            alt="Local image"
          />
          {isFocused && text.length > 0 && (
            <Text style={styles.characterCount}>
              Character count: {text.length}
            </Text>
          )}
          {!isFocused && isSubmitted && renderFeedback()}
          <View style={styles.buttonContainer}>
            <Button
              title="Confirm"
              onPress={handleConfirm}
              disabled={!isConfirmEnabled}
            />
            <View style={styles.buttonSpacer} />
            <Button title="Cancel" onPress={handleCancel} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    width: "80%",
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
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    marginTop: 20,
  },
  buttonSpacer: {
    width: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
