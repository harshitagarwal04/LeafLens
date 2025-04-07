import React, { useRef, useEffect } from 'react';
import { SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, PanResponder, Animated, Linking, TouchableOpacity, View } from 'react-native';
import { globalStyles, colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import styles from '../ScreenStyles/HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const animatedHint = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedHint, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedHint, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10,
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          navigation.navigate('Camera');
        } else if (gestureState.dx < -50) {
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
    <SafeAreaView style={[globalStyles.container, { marginTop: -20 }]} {...panResponder.panHandlers}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>Welcome to LeafLens</Text>
          <Text style={styles.subtitle}>Your Smart Plant Health Detector!</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={styles.button}>
              <Ionicons name="camera" size={30} color={colors.secondary} />
              <Text style={styles.buttonText}>Camera</Text>
              <Animated.Text
                style={{
                  color: colors.secondary,
                  fontSize: 10,
                  marginTop: 4,
                  opacity: animatedHint,
                  transform: [{ translateX: animatedHint.interpolate({ inputRange: [0, 1], outputRange: [0, 5] }) }],
                }}
              >
                Swipe right →
              </Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.button}>
              <Ionicons name="images" size={28} color={colors.secondary} />
              <Text style={styles.buttonText}>Gallery</Text>
              <Animated.Text
                style={{
                  color: colors.secondary,
                  fontSize: 10,
                  marginTop: 4,
                  opacity: animatedHint,
                  transform: [{ translateX: animatedHint.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }],
                }}
              >
                ← Swipe left
              </Animated.Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => Linking.openURL('https://leaflenss.streamlit.app/')}>
            <Text style={styles.linkText}>Website Link</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 2.0 - © 2025 LeafLens</Text>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default HomeScreen;
