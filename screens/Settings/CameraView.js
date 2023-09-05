import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import ImagePreview from './ImagePreview';

export default function CameraView({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaPermission, setHasMediaPermission] = useState(null);

  const getPermission = async () => {
    const CameraPermissions = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(CameraPermissions.status === 'granted');

    const MediaPermissions = await MediaLibrary.requestPermissionsAsync();
    setHasMediaPermission(MediaPermissions.status === 'granted');
  };

  useEffect(() => {
    getPermission();
  }, []);

  const cameraRef = useRef(null);
  const [type, setType] = useState(CameraType.front);
  const [flash, setFlash] = useState(FlashMode.on);
  const [picture, setPicture] = useState(null);

  const toggleCameraType = () => {
    const current = type === CameraType.back ? CameraType.front : CameraType.back;
    setType(current);
  };

  const toggleFlashMode = () => {
    const current = flash === FlashMode.on ? FlashMode.off : FlashMode.on;
    setFlash(current);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setPicture(picture);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === null || hasMediaPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Waiting for permission...</Text>
      </View>
    );
  }

  if (hasCameraPermission === false || hasMediaPermission === false) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Denied permissions....</Text>
      </View>
    );
  }

  if (picture) {
    return (
      <ImagePreview setPicture={setPicture} picture={picture} navigation={navigation} />
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Camera style={styles.cameraContainer} type={type} ref={cameraRef} flashMode={flash}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => toggleCameraType()}>
              <FontAwesome name="refresh" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => toggleFlashMode()}
            >
              <Entypo
                name="flash"
                size={24}
                color={flash === FlashMode.on ? 'white' : 'yellow'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.captureButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={() => takePicture()}>
              <Entypo name="camera" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight: 20,
  },
  iconButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  captureButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
});