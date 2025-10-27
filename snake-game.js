import React from 'react';
import { View, Text } from 'react-native';

export default function GameSnake() {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'lime', fontSize: 24 }}>Ini game ular!</Text>
    </View>
  );
}
