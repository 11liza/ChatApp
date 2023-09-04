import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Settings/Profile';
import Camera from '../screens/Settings/CameraView';
import { AntDesign, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function SettingsBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{headerShown: false,
          tabBarIcon: ({color, size}) => {
            return (
              <AntDesign name="profile" size={size} color={color} />
            );
        },}} />
      <Tab.Screen 
        name="Camera" 
        component={Camera} 
        options={{headerShown: false,
        tabBarIcon: ({color, size}) => {
          return (
            <Feather name="camera" size={size} color={color} />
          );
      },}}/>
    </Tab.Navigator>
  )
}