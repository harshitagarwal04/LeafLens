import { View, Text, Button, Modal, ScrollView } from 'react-native';
import GuideScreenStyle from '../ScreenStyles/GuideScreenStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GuideScreen = ({ visible, onClose }) => {
  const handleStart = async () => {
    onClose();
  };

  const handleDontShowAgain = async () => {
    await AsyncStorage.setItem('dontShowGuide', 'true');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={GuideScreenStyle.overlay}>
        <View style={GuideScreenStyle.modalCard}>
          <ScrollView
            contentContainerStyle={GuideScreenStyle.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={GuideScreenStyle.title}>Welcome to LeafLens 🍃</Text>
            <Text style={GuideScreenStyle.text}>📷 Capture a clear plant leaf photo.</Text>
            <Text style={GuideScreenStyle.text}>🧠 AI checks for disease signs.</Text>
            <Text style={GuideScreenStyle.text}>📄 Get prediction & treatment info.</Text>
            <Text style={GuideScreenStyle.text}>🗂 Upload existing images.</Text>
            <Text style={GuideScreenStyle.text}>🌱 Track plant health in your gallery.</Text>
            <Text style={GuideScreenStyle.text}>🔍 Get plant care tips.</Text>
            <Text style={GuideScreenStyle.text}>📊 View scan statistics.</Text>
            <Text style={GuideScreenStyle.text}>🤳 Share health reports.</Text>
            <Text style={GuideScreenStyle.sectionTitle}>
              What LeafLens <Text style={GuideScreenStyle.cant}>can't</Text> do:
            </Text>
            <Text style={GuideScreenStyle.text}>🙅‍♂️ Diagnose your friend's mind</Text>
            <Text style={GuideScreenStyle.text}>🐶 Read your pet's mood</Text>
            <Text style={GuideScreenStyle.text}>🍕 Judge your pizza's health</Text>
            <Text style={GuideScreenStyle.text}>🛸 Detect alien plants (yet!)</Text>
          </ScrollView>
          <View style={GuideScreenStyle.buttonRow}>
            <View style={GuideScreenStyle.button}>
              <Button title="Get Started" onPress={handleStart} color='#00ABF0' />
            </View>
            <View style={GuideScreenStyle.button}>
              <Button title="Skip Next Time" onPress={handleDontShowAgain} color="#e67e22" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GuideScreen;