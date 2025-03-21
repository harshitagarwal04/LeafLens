import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Camera" onPress={() => navigation.navigate('Camera')} />
      <View style={styles.spacing} />
      <Button title="Gallery" onPress={() => navigation.navigate('Gallery')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  spacing: {
    height: 20,
  },
});

export default HomeScreen;