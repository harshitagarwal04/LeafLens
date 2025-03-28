import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, Modal, BackHandler } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from '../ScreenStyles/GalleryScreenStyle';
import { colors } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const GalleryScreen = ({ navigation }) => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Reload gallery when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadCapturedImages();
      loadUploadedImages();
      setSelectedImage(null);
    }, [])
  );

  // Request permissions and load captured images from the app folder
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Required',
          text2: 'We need access to your gallery to show images.',
        });
        return;
      }
      loadCapturedImages();
      loadUploadedImages();
    })();
  }, []);

  // Handle back button to close the image preview modal
  useEffect(() => {
    const backAction = () => {
      if (selectedImage) {
        setSelectedImage(null);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      if (backHandler) backHandler.remove();
    };
  }, [selectedImage]);

  // Load images from the custom folder "LeafLens"
  const loadCapturedImages = async () => {
    try {
      const albumName = 'LeafLens';
      const album = await MediaLibrary.getAlbumAsync(albumName);
      if (album) {
        const media = await MediaLibrary.getAssetsAsync({
          album,
          mediaType: 'photo',
          first: 6,
          sortBy: ['creationTime'],
        });

        // Separate the first 5 images and use the 6th as the "+" icon
        const images = media.assets.slice(0, 5);
        const plusIcon = { id: 'plus', uri: null };
        images.push(plusIcon);
        setCapturedImages(images);
      } else {
        Toast.show({
          type: 'info',
          text1: 'No Images',
          text2: 'No images found in LeafLens folder.',
        });
      }
    } catch (error) {
      console.error('Error loading images:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load captured images.',
      });
    }
  };

  // Load uploaded images from storage
  const loadUploadedImages = async () => {
    try {
      const storedImages = await AsyncStorage.getItem('uploadedImages');
      if (storedImages) {
        setUploadedImages(JSON.parse(storedImages));
      }
    } catch (error) {
      console.error('Error loading uploaded images:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load uploaded images.',
      });
    }
  };

  // Open the device gallery to upload an image
  const openFullGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const newImage = { uri: result.assets[0].uri, id: Date.now().toString() };
        setUploadedImages((prev) => {
          const updatedImages = [...prev, newImage];
          if (updatedImages.length > 6) {
            updatedImages.shift();
          }
          AsyncStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
          Toast.show({
            type: 'success',
            text1: 'Image Uploaded',
            text2: 'Your image has been successfully uploaded.',
          });
          return updatedImages;
        });
      }
    } catch (error) {
      console.error('Error opening gallery:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to open the gallery.',
      });
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Captured Images Section */}
      <Text style={styles.header}>Captured Images</Text>
      {capturedImages.length === 0 ? (
        <Text style={styles.noImages}>No captured images found in LeafLens.</Text>
      ) : (
        <FlatList
          data={capturedImages}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                item.id === 'plus' ? navigation.navigate('Camera') : setSelectedImage(item.uri)
              }
            >
              {item.id === 'plus' ? (
                <View style={styles.plusIcon}>
                  {capturedImages.length > 0 && (
                    <Image
                      source={{ uri: capturedImages[0]?.uri }}
                      style={styles.blurredBackground}
                      blurRadius={10}
                    />
                  )}
                  <Ionicons name="add" size={40} color={colors.primary} style={styles.plusIconText} />
                </View>
              ) : (
                <Image source={{ uri: item.uri }} style={styles.image} />
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {/* Uploaded Images Section */}
      <Text style={styles.header}>Uploaded Images</Text>
      {uploadedImages.length === 0 ? (
        <Text style={styles.noImages}>No image uploaded yet.</Text>
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

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={openFullGallery}>
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>

      {/* Image Preview Modal */}
      <Modal
        visible={Boolean(selectedImage)}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedImage(null)}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Image Preview */}
          <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />

          {/* Analyze Button */}
          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={() => {
              setSelectedImage(null);
              navigation.navigate('AnalyzeScreen', { imageUri: selectedImage });
            }}
          >
            <Text style={styles.analyzeText}>Analyze</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default GalleryScreen;
