import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Header({ title })  {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome to {title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'red',
  },
});