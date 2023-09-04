import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import ImagePreview from '../screens/Settings/ImagePreview';


export default function CameraView({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);

  const getPermission = async () => {
    const CameraPermissions = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(CameraPermissions.status === 'granted');

    const MediaPermissions = await MediaLibrary.requestPermissionsAsync();
    setHasMediaPermission(MediaPermissions.status === 'granted');

  }

  useEffect(() => {
    getPermission();
  }, []);

  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.front);
  const [flash, setFlash] = useState(FlashMode.on);


  const toggleCameraType = () => {
    const current = type == CameraType.back ? CameraType.front : CameraType.back;
    setType(current);
  }

  const toggleFlashMode = () => {
    const current = flash == FlashMode.on ? FlashMode.off : FlashMode.on;
    setFlash(current);
  }


  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setPicture(picture);

      } catch (error) {
        console.log(error);
      }
    }

  }

  const [picture, setPicture] = useState(null);


  if (hasCameraPermission === null || hasMediaPermission === null) {
    return (
      <View>
        <Text>Waiting for permission...</Text>
      </View>
    )
  }

  if (hasCameraPermission === false || hasMediaPermission === false) {
    return (
      <View>
        <Text>Denied permissions....</Text>
      </View>
    )
  }

  if (picture) {
    return (
      <ImagePreview
        setPicture={setPicture} 
        picture={picture} 
        navigation={navigation}
      />
    )
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Camera 
          style={styles.cameraContainer} 
          type={type} 
          ref={cameraRef}
          flashMode={flash}
        >
          <View style={styles.ButtonsOnTop}>
            <TouchableOpacity
              style={styles.generalBtn}
              onPress={() => toggleCameraType()}>
              <FontAwesome 
                name="refresh" 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.generalBtn}
              onPress={() => toggleFlashMode()}>
              <Entypo 
                name='flash'
                size={24} 
                color={flash === FlashMode.on ? 'white' : 'yellow'} 
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonsUnderBottom}>
            <TouchableOpacity
              style={styles.cameraBtn}
              onPress={() => takePicture()}>
              <Entypo 
                name='camera' 
                size={30} 
                color='white' 
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  cameraContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  ButtonsOnTop: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  ButtonsUnderBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  generalBtn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 50,
    height: 50,
    marginRight: 5,
  },
  cameraBtn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  
})