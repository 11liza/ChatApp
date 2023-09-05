import React, { useContext, useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../contexts/AuthProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const API_URL = 'https://chat-api-with-auth.up.railway.app/users';

export default function Profile({ navigation }) {
  const { accessToken, handleLogout } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });
      const result = await response.json();
      if (result.status === '200') {
        setFirstName(result.data.firstname || '');
        setLastName(result.data.lastname || '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
        }),
      });
      const result = await response.json();
      if (result.status === '200') {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });
      const result = await response.json();
      if (result.status === '200') {
        handleLogout();
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <MaterialCommunityIcons
        style={styles.profileIcon}
        name="face-man-profile"
        size={130}
        color="black"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
  style={styles.updateButton}
  onPress={() => handleUpdateUser()}
>
  <Text>Update</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.deleteButton}
  onPress={() => handleDeleteUser()}
>
  <Text>Delete</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.logoutButton}
  onPress={() => {
    handleLogout();
    navigation.navigate('Login');
  }}
>
  <Text>Logout</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    marginBottom: 0,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputField: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#696969',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  
  },

  updateButton: {
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#696969',
      marginBottom: 20,
      backgroundColor: '#00bfff',
      
    },
  
    deleteButton: {
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#696969',
      marginBottom: 20,
      backgroundColor: 'red', 
    },
  
    logoutButton: {
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: '#696969',
      marginBottom: 20,
      backgroundColor: 'yellow', 
    },

  profileIcon: {
    alignSelf: 'center',
  },
});