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
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 5,
    },
    myContent: {
        alignItems: 'flex-end',
        backgroundColor: '#1E90FF',
        padding: 5,
        borderRadius: 4,
    },
    otherMessage: {
        alignItems: 'flex-start',
        backgroundColor: '#A9A9A9',
        padding: 5,
        borderRadius: 4,

    },
    content: {
        color: 'black',
    },
    date: {
        color: '#696969'
    },
    
})