import React, { useContext } from "react";
import * as MediaLibrary from "expo-media-library";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthProvider";
import * as FileSystem from "expo-file-system";

const API_ROOT_URL = "https://chat-api-with-auth.up.railway.app/";

export default function ImagePreview({ setPicture, picture, navigation }) {
  const { accessToken, setProfileImage } = useContext(AuthContext);

  const handleSaveImage = async () => {
    try {
      // Create an asset from the captured image
      const asset = await MediaLibrary.createAssetAsync(picture.uri);

      // Check if the 'Expo' album exists, if not, create it
      let album = await MediaLibrary.getAlbumAsync("Expo");
      if (album === null) {
        album = await MediaLibrary.createAlbumAsync("Expo", asset);
      }

      // Save the image to the 'Expo' album
      await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false);

      // Save image to API
      const uploadResult = await FileSystem.uploadAsync(
        `${API_ROOT_URL}users/`,
        picture.uri,
        {
          httpMethod: "PATCH",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "ProfileImage",
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
        }
      );

      // Handle successful image upload
      console.log(`API URL: ${API_ROOT_URL}users/${accessToken.userID}`);
      console.log("Upload Result:", uploadResult);

      // Update the profile image locally
      setProfileImage(picture.uri);

      // Navigate back to the 'Profile' screen
      navigation.navigate("Profile");

      // Clear the current picture state
      setPicture(null);
    } catch (error) {
      console.log("Error saving image:", error);

      // Handle errors here, e.g., show an error message to the user
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: picture.uri }} style={styles.image} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setPicture(null)}
        >
          <Entypo name="camera" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleSaveImage()}
        >
          <Entypo name="check" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 15,
  },
  iconButton: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 50,
    height: 50,
    marginRight: 5,
  },
});
