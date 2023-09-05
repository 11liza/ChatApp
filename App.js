import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './screens/contexts/AuthProvider';
import StackNavigator from './navigation/StackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* StatusBar with light content */}
      <StatusBar style="light" />

      <View style={styles.container}>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:'#fffaf0',
  },
});