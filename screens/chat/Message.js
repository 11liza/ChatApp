import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function Message({message, userID, setEnableDeleteMessage,setItemId}) {

    const showDeletion = (id) =>{
        setEnableDeleteMessage(true);
        setItemId(id);
    }
   
  return (
    <View style={styles.container}>
        {message.user
        && (message.user._id == userID
            ? <TouchableOpacity style={styles.myContent} onPress={()=>showDeletion(message._id)}>
                <Text>{message.content}</Text>
                <Text>{message.date}</Text>
              </TouchableOpacity>
            : <View style={styles.otherMessage}>
                <Text style={styles.content}>{message.content}</Text>
                <Text style={styles.date}>{message.date}</Text>
              </View>
        )}
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexWrap: 'nowrap',
        backgroundColor: '#fff5ee',
        flexDirection: 'column',
        padding: 5,
        width: '5',  },
    myContent: {
        alignItems: 'flex-end',
    backgroundColor: '#40e0d0',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end', 
    },
    otherMessage: {
        alignItems: 'flex-start',
        backgroundColor: '#afeeee',
        padding: 5,
        borderRadius: 4,

    },
    content: {
        color: 'black',
    },
    date: {
        color: '#708090'
    },
    
})