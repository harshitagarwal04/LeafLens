import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import GalleryScreen from './screens/GalleryScreen';
import AnalyzeScreen from './screens/AnalyzeScreen';
import GuideScreen from './screens/GuideScreen';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins: require('@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
    Roboto: require('@expo-google-fonts/roboto/Roboto_400Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <NavigationContainer theme={DefaultTheme}>
          <Stack.Navigator 
            initialRouteName="LeafLens" 
            screenOptions={{ 
              headerShown: false, 
              gestureEnabled: true, 
              gestureDirection: 'horizontal' 
            }}>
            <Stack.Screen name="LeafLens" component={HomeScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Gallery" component={GalleryScreen} />
            <Stack.Screen name="Analyze" component={AnalyzeScreen} />
            <Stack.Screen name="Guide" component={GuideScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;