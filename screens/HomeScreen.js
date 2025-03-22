import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles, colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import styles from './HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      {/* Logo and Welcome Message */}
      {/* <Image
        source={require('./assets/images/icon.png')}
        style={styles.logo}
      /> */}
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

      {/* Version Text */}
      <Text style={styles.versionText}>Version 1.0 - © 2025 LeafLens</Text>
    </View>
  );
};

export default HomeScreen;