import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar'; // Re-enable StatusBar
import { StyleSheet, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './screens/contexts/AuthProvider';
// import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* Uncomment the StatusBar component if you want to use it */}
      {/* <StatusBar style="auto" /> */}

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
    backgroundColor: '#fff',
  },
});