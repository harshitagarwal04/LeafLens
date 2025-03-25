import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated,
  Linking,
} from 'react-native';
import { globalStyles, colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import styles from './HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  // Handle swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe right -> Open Camera
          navigation.navigate('Camera');
        } else if (gestureState.dx < -50) {
          // Swipe left -> Open Gallery
          navigation.navigate('Gallery');
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View
      style={[globalStyles.container, { marginTop: -20 }]} // Moves everything UP
      {...panResponder.panHandlers} // Attach pan handlers
    >
      {/* Logo and Welcome Message */}
      <Text style={styles.title}>Welcome to LeafLens</Text>
      <Text style={styles.subtitle}>Your Smart Plant Health Detector!</Text>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Ionicons name="camera" size={24} color={colors.secondary} />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Gallery')}
        >
          <Ionicons name="images" size={24} color={colors.secondary} />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Dummy Link */}
      <TouchableOpacity
        onPress={() => Linking.openURL('https://leaflenss.streamlit.app/')}
      >
        <Text style={styles.linkText}>Website Link</Text>
      </TouchableOpacity>

      {/* Version Text */}
      <Text style={styles.versionText}>Version 2.0 - © 2025 LeafLens</Text>
    </View>
  );
};

export default HomeScreen;
