import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal,
    Dimensions,
    Button,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; // ✅ Import for back arrow icon

const { width, height } = Dimensions.get('window');

const GalleryScreen = () => {
    const [images, setImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [hasPermission, setHasPermission] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // ✅ Ask for permissions when the screen loads
    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'We need access to your gallery to show images.');
            } else {
                setHasPermission(true);
                loadGalleryImages(); // Load images if permission is granted
            }
        })();
    }, []);

    // 🔥 Load images from the custom folder "CameraGalleryApp"
    const loadGalleryImages = async () => {
        try {
            const albumName = 'LeafLens'; // Custom folder name
            const album = await MediaLibrary.getAlbumAsync(albumName);

            if (album) {
                const media = await MediaLibrary.getAssetsAsync({
                    album: album,
                    mediaType: 'photo',
                    first: 50, // Get the first 50 images
                    sortBy: ['creationTime'],
                });
                setImages(media.assets);
            } else {
                Alert.alert('No Images', 'No images found in CameraGalleryApp.');
            }
        } catch (error) {
            console.log('Error loading images: ', error);
        }
    };

    // ✅ Open full gallery to upload an image
    const openFullGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setUploadedImages([...uploadedImages, { uri: result.assets[0].uri, id: Date.now().toString() }]);
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* 🔥 Captured Moments Section (Top) */}
            <Text style={styles.header}>Captured Pictures</Text>

            {images.length === 0 ? (
                <Text style={styles.noImages}>No images found in CameraGalleryApp.</Text>
            ) : (
                <FlatList
                    data={images}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedImage(item.uri)}>
                            <Image source={{ uri: item.uri }} style={styles.image} />
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* 🔥 Uploaded Images Section (Middle) */}
            <Text style={styles.header}>Uploads</Text>
            {uploadedImages.length === 0 ? (
                <Text style={styles.noImages}>No uploaded images yet.</Text>
            ) : (
                <FlatList
                    data={uploadedImages}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedImage(item.uri)}>
                            <Image source={{ uri: item.uri }} style={styles.image} />
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* 🔥 Upload Button (Bottom) */}
            <TouchableOpacity style={styles.uploadButton} onPress={openFullGallery}>
                <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>

            {/* 🔥 Image Preview Modal */}
            <Modal visible={!!selectedImage} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    {/* 🔙 Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setSelectedImage(null)}
                    >
                        <Ionicons name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>

                    {/* 🖼️ Image Preview (No Zoom) */}
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.fullImage}
                        resizeMode="contain"
                    />

                    {/* ✅ Analyze Button */}
                    <TouchableOpacity
                        style={styles.analyzeButton}
                        onPress={() => alert('Analyze functionality coming soon!')}
                    >
                        <Text style={styles.analyzeText}>Analyze</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
    header: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    noImages: { textAlign: 'center', marginTop: 10, fontSize: 14, color: 'grey' },
    image: { width: 100, height: 100, margin: 5, borderRadius: 10 },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    uploadText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: { width: '90%', height: '80%' },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    analyzeButton: {
        position: 'absolute',
        bottom: '13%', // A little lower than middle
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 10,
        width: 150,
        alignItems: 'center',
    },
    analyzeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default GalleryScreen;
