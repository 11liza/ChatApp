import React, { useContext, useEffect, useState } from 'react'
import { Image, TextInput, View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../contexts/AuthProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Profile({navigation}) {
  const URL = 'https://chat-api-with-auth.up.railway.app/users'
  const { accessToken, handleLogout } = useContext(AuthContext);
  const [avatarImage, setAvatarImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [updateUser, setUpdateUser] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + accessToken.accessToken,
        }
      })
      const result = await response.json();
      if (result.status == '200') {
        if (result.data.firstname) {
          setFirstName(result.data.firstname)
        }
        if (result.data.lastname) {
          setLastName(result.data.lastname);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [updateUser])

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken.accessToken,
        },
        body: JSON.stringify({
          "firstname": firstName,
          "lastname": lastName
        })
      })
      const result = await response.json();
      if (result.status == '200') {
        setUpdateUser(!updateUser);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async() =>{
    try{
      const response = await fetch(URL, {
        method:'DELETE',
        headers: {
          "Authorization": "Bearer " + accessToken.accessToken,
        }
      })

      const result = await response.json();
      if(result.status == '200'){
        handleLogout();
        navigation.navigate("Login");
      }

    }catch(error){
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <MaterialCommunityIcons 
        style={styles.profileIcon} 
        name="face-man-profile" 
        size={130} 
        color="black" 
      />
      <View style={styles.childBox}>
        <TextInput
          style={styles.inputField}
          placeholder='Firstname'
          value={firstName}
          onChangeText={(text) => setFirstName(text)} 
        />
        <TextInput
          style={styles.inputField}
          placeholder='Lastname'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={styles.childBox}>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => handleUpdateUser()}
        >
          <Text>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchBtn}
          onPress={()=>handleDeleteUser()}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={()=> {
            handleLogout();
           navigation.navigate("Login");
          }}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Profile includes Firstname, Lastname input fields
        Buttons: Update, delete, logout */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 45,
    marginLeft: '10%',
    marginRight: '10%',
  },
  title: {
    fontSize: 35,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 0,
    marginBottom: 0,
  },
  inputField: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#a9a9a9',
  },
  touchBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#a9a9a9',
  },
  profileIcon: {
    alignSelf: 'center'
  },
  childBox: {
    rowGap: 20,
  }

})