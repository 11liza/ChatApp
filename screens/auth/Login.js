import React, { useContext,useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';


export default function Login({navigation}) {
    const {handleLogin, loginMessage} = useContext(AuthContext);
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    
    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <TextInput 
                style={styles.inputField} 
                placeholder='Username' 
                value={username} onChangeText={(text)=>setUserName(text)} />
                <TextInput 
                style={styles.inputField} 
                placeholder='Password'
                value={password}
                onChangeText={(text)=>setPassword(text)} />

                {loginMessage !='' 
                &&(loginMessage == 'You have successfully registered. Please login'
                ? <Text style={{color: 'blue'}}>{loginMessage}</Text>
                : <Text style={{color: 'green'}}>{loginMessage}</Text>)}
            </View>
            <View style={styles.itemContainer}>
                <TouchableOpacity 
                    style={styles.touchBtn} 
                    onPress={()=>handleLogin(username,password, setUserName, setPassword)} 
                >
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.touchBtn} 
                    onPress={()=>{
                        setUserName('');
                        setPassword('');
                        navigation.navigate("Register")}}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        rowGap: 45,
        marginLeft: '10%',
        marginRight: '10%',
    },
    inputField: {
        padding: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'gray',
    },
    touchBtn: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'gray',
    },
    itemContainer: {
        rowGap: 20,
    }

})