import { View, Text } from 'react-native'
import React from 'react'

export default function Header({ title })  {
  return (
    <View>
      <Text>Welcome to {title}</Text>
    </View>
  )
}
