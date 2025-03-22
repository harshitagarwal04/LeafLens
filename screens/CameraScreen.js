import React, { useState, useEffect } from 'react';
import { View, Image, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

// Utility function to request permissions
const requestPermissions = async () => {
    try {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const mediaPermission = await MediaLibrary.requestPermissionsAsync();

        if (cameraPermission.status !== 'granted') {
            Alert.alert("Camera Permission Denied", "Camera permission is required.");
            return false;
        }

        if (mediaPermission.status !== 'granted') {
            Alert.alert("Media Library Permission Denied", "Media library permission is required to save images.");
            return false;
        }
        return true;
    } catch (error) {
        console.error("Permission error:", error);
        Alert.alert("Permission Error", "An unexpected error occurred while requesting permissions.");
        return false;
    }
};

// Utility function to save image to the gallery or as a hidden file
const saveImageToGallery = async (uri) => {
    try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const albumName = "LeafLens"; // Custom folder name
        let album = await MediaLibrary.getAlbumAsync(albumName);

        if (!album) {
            const permission = await MediaLibrary.requestPermissionsAsync();
            if (permission.granted) {
                album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
                Alert.alert("Saved", `Image saved in Gallery > ${albumName}.`);
            } else {
                console.warn("Permission denied for creating LeafLens album. Saving as a hidden file.");

                try {
                    // Save as a hidden file using expo-file-system
                    const hiddenDir = `${FileSystem.documentDirectory}LeafLens/.hidden`;
                    const dirInfo = await FileSystem.getInfoAsync(hiddenDir);

                    // Create hidden directory if it doesn't exist
                    if (!dirInfo.exists) {
                        await FileSystem.makeDirectoryAsync(hiddenDir, { intermediates: true });
                    }

                    const fileName = uri.split('/').pop();
                    const newPath = `${hiddenDir}/${fileName}`;
                    await FileSystem.moveAsync({ from: uri, to: newPath });
                    Alert.alert("Saved as Hidden File", "Image saved in a hidden folder.");
                } catch (fileError) {
                    console.error("Error saving as hidden file:", fileError);
                    Alert.alert("Save Error", `Failed to save image as a hidden file: ${fileError.message}`);
                }
            }
        } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            Alert.alert("Saved", `Image saved in Gallery > ${albumName}.`);
        }
    } catch (error) {
        // console.error("Error saving image:", error);
        Alert.alert("Warning!", `Image Saved in Gallery, next time press allow to save the image in LeafLens album for easy access.`);
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
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => openCamera(setImage, navigation)}
                        >
                            <Text>Take Image Again</Text>
                        </TouchableOpacity>
                        <View style={{ width: 10 }} /> {/* Spacer between buttons */}
                        <TouchableOpacity
                            onPress={() => Alert.alert('Analysis feature coming soon!')}
                        >
                            <Text>Analyse this image</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: 300, height: 400, marginTop: 20 },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
});

export default CameraScreen;