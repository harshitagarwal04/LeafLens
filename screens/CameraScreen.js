import React, { useState, useEffect } from 'react';
import { View, Image, Alert, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Toast from 'react-native-toast-message';
import styles from '../ScreenStyles/CameraScreenStyle';

// Utility function to request permissions
const requestPermissions = async () => {
    try {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaPermission = await MediaLibrary.requestPermissionsAsync();

        if (cameraPermission.status !== 'granted') {
            Alert.alert("Permission Denied", "Camera and media library permissions are required.");
            return false;
        }

        if (mediaPermission.status !== 'granted') {
            Alert.alert("Permission Denied", "Camera and media library permissions are required.");
            return false;
        }
        return true;
    } catch (error) {
        console.error("Permission error:", error);
        Alert.alert("Permission Error", "An unexpected error occurred while requesting permissions.");
        return false;
    }
};

// Utility function to save image to the gallery
const saveImageToGallery = async (uri) => {
    try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const albumName = "LeafLens"; // Custom folder name
        let album = await MediaLibrary.getAlbumAsync(albumName);

        if (!album) {
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (permission.granted) {
                album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
                Toast.show({
                    type: 'success',
                    text1: 'Saved',
                    text2: 'Image saved in Gallery > LeafLens.',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Permission Denied',
                    text2: 'Image will be used for this session only and will not be saved.',
                });
            }
        } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            Toast.show({
                type: 'success',
                text1: 'Saved',
                text2: 'Image saved in Gallery > LeafLens.',
            });
        }
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Warning!',
            text2: 'Image will be used for this session only and will not be saved.',
        });
    }
};

// Utility function to open the camera
const openCamera = async (setImage, navigation) => {
    try {
        const permissionGranted = await requestPermissions();
        if (!permissionGranted) return;

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            await saveImageToGallery(uri);
        } else {
            navigation.goBack(); // Go back if the user cancels the camera
        }
    } catch (error) {
        console.error("Camera error:", error);
        Alert.alert("Camera Error", "An unexpected error occurred while opening the camera.");
    }
};

const CameraScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        openCamera(setImage, navigation); // Open camera when the screen loads
    }, []);

    return (
        <View style={styles.container}>
            {image && (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => openCamera(setImage, navigation)}>
                            <Text style={styles.buttonText}>Take Again</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} /> 
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AnalyzeScreen', { imageUri: image })}>
                            <Text style={styles.buttonText}>Analyse</Text>
                        </TouchableOpacity> 
                    </View>
                </>
            )}
        </View>
    );
};

export default CameraScreen;