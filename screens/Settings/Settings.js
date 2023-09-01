import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Define the Settings component
export default function Settings() {
  return (
    // Render a simple text element with styling
    <Text style={styles.title}>General</Text>
  );
}

// Define styles for the Settings component
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
});