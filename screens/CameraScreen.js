import React, { useState, useEffect } from 'react';
import { View, Image, Alert, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const CameraScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);

    // ✅ Ask for permissions once when the app starts
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

            if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
                Alert.alert("Permission Required", "We need access to your camera and media library.");
            } else {
                setHasPermission(true);
            }
        })();
    }, []);

    // ✅ Open camera when this screen loads
    useEffect(() => {
        if (hasPermission) {
            openCamera();
        }
    }, [hasPermission]);

    // ✅ Open camera directly when this screen is loaded
    const openCamera = async () => {
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Please grant camera and gallery permissions in settings.");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            saveImageToGallery(result.assets[0].uri);
        } else {
            navigation.goBack(); // ⬅️ Go back if the user cancels the camera
        }
    };

    const saveImageToGallery = async (uri) => {
        try {
            const asset = await MediaLibrary.createAssetAsync(uri);
            const albumName = "LeafLens"; // Custom folder name
            let album = await MediaLibrary.getAlbumAsync(albumName);

            if (!album) {
                album = await MediaLibrary.createAlbumAsync(albumName, asset, false);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }

            Alert.alert("Saved", "Image saved to " + albumName + " app folder.");
        } catch (error) {
            console.log("Error saving image: ", error);
        }
    };

    return (
        <View style={styles.container}>
            {image && (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Button
                        title="Analyse this image"
                        onPress={() => Alert.alert('Analysis feature coming soon!')}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: 300, height: 400, marginTop: 20 },
});

export default CameraScreen;