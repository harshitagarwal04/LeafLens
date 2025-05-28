import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableWithoutFeedback, Keyboard, PanResponder, Animated, Linking, TouchableOpacity, View, ImageBackground } from 'react-native';
import { globalStyles, colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import styles from '../ScreenStyles/HomeScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { guideSession } from '../utils/guideFlag';
import GuideScreen from './GuideScreen'; // Import your modal GuideScreen

const HomeScreen = ({ navigation }) => {
  const pan = React.useRef(new Animated.ValueXY()).current;
  const animatedHint = React.useRef(new Animated.Value(0)).current;
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const checkGuidePreference = async () => {
      if (!guideSession.checked) {
        const dontShow = await AsyncStorage.getItem('dontShowGuide');
        if (!dontShow) {
          guideSession.checked = true;
          setShowGuide(true); // Show as modal
        } else {
          guideSession.checked = true;
        }
      }
    };
    checkGuidePreference();
  }, [navigation]);

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

  const panResponder = React.useRef(
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
    <ImageBackground
      source={require('../assets/images/background_image.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(24,28,36,0.7)' }}>
        <SafeAreaView style={[globalStyles.container, styles.container]} {...panResponder.panHandlers}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Welcome to LeafLens</Text>
              <Text style={styles.subtitle}>Your Smart Plant Health Detector!</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={styles.button}>
                  <Ionicons name="camera" size={30} color={colors.text} />
                  <Text style={styles.buttonText}>Camera</Text>
                  <Animated.Text
                    style={[
                      styles.swipeHint,
                      {
                        opacity: animatedHint,
                        transform: [{ translateX: animatedHint.interpolate({ inputRange: [0, 1], outputRange: [0, 5] }) }],
                      },
                    ]}
                  >
                    Swipe right →
                  </Animated.Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.button}>
                  <Ionicons name="images" size={28} color={colors.text} />
                  <Text style={styles.buttonText}>Gallery</Text>
                  <Animated.Text
                    style={[
                      styles.swipeHint,
                      {
                        opacity: animatedHint,
                        transform: [{ translateX: animatedHint.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }],
                      },
                    ]}
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
        <GuideScreen visible={showGuide} onClose={() => setShowGuide(false)} />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
