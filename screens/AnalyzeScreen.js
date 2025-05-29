import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity, Share, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { uploadImageForPrediction } from '../utils/uploadImage';
import style from '../ScreenStyles/AnalyzeScreenStyle';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';
import AnimatedDropdown from '../utils/AnimatedDropdown';

const AnalyzeScreen = () => {
  const { imageUri } = useRoute().params;
  const navigation = useNavigation();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dropdown states
  const [aboutOpen, setAboutOpen] = useState(false);
  const [causesOpen, setCausesOpen] = useState(false);
  const [treatmentOpen, setTreatmentOpen] = useState(false);

  useEffect(() => {
    const analyze = async () => {
      try {
        const prediction = await uploadImageForPrediction(imageUri);
        setResult(prediction);
      } catch (err) {
        setResult({ error: 'Prediction failed' });
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [imageUri]);

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/images/background_image.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(24,28,36,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/background_image.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(24,28,36,0.7)' }}>
        <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}>
          <View style={style.card}>
            <Image source={{ uri: imageUri }} style={style.imagePreview} />

            {result?.error ? (
              <Text style={style.errorText}>{result.error}</Text>
            ) : (
              <>
                <Text style={style.headerText}>
                  <Ionicons name="leaf" size={26} color={colors.green} />{' '}
                  {result.prediction}
                </Text>
                <Text style={style.confidenceText}>
                  <Ionicons name="checkmark-circle" size={18} color={colors.green} />{' '}
                  Confidence: {result.confidence != null ? result.confidence + '%' : 'N/A'}
                </Text>

                <View style={style.divider} />

                {/* About Dropdown */}
                <TouchableOpacity
                  style={style.analysisContainer}
                  onPress={() => setAboutOpen((prev) => !prev)}
                  activeOpacity={0.8}
                >
                  <View style={style.dropdownHeader}>
                    <Text style={style.dropdownHeaderText}>
                      <Ionicons name="information-circle" size={18} color={colors.green} /> About this Disease
                    </Text>
                    <Ionicons
                      style={style.dropdownIcon}
                      name={aboutOpen ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={colors.green}
                    />
                  </View>
                  <AnimatedDropdown visible={aboutOpen}>
                    <Text style={style.dropdownContent}>
                      {result?.description || 'No description available.'}
                    </Text>
                  </AnimatedDropdown>
                </TouchableOpacity>

                {/* Causes Dropdown */}
                <TouchableOpacity
                  style={style.analysisContainer}
                  onPress={() => setCausesOpen((prev) => !prev)}
                  activeOpacity={0.8}
                >
                  <View style={style.dropdownHeader}>
                    <Text style={style.dropdownHeaderText}>
                      <Ionicons name="alert-circle" size={18} color={colors.green} /> Causes
                    </Text>
                    <Ionicons
                      style={style.dropdownIcon}
                      name={causesOpen ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={colors.green}
                    />
                  </View>
                  <AnimatedDropdown visible={causesOpen}>
                    <Text style={style.dropdownContent}>
                      {result?.causes || 'No further details available.'}
                    </Text>
                  </AnimatedDropdown>
                </TouchableOpacity>

                {/* Treatment Dropdown */}
                <TouchableOpacity
                  style={style.analysisContainer}
                  onPress={() => setTreatmentOpen((prev) => !prev)}
                  activeOpacity={0.8}
                >
                  <View style={style.dropdownHeader}>
                    <Text style={style.dropdownHeaderText}>
                      <Ionicons name="medkit" size={18} color={colors.green} /> Treatment
                    </Text>
                    <Ionicons
                      style={style.dropdownIcon}
                      name={treatmentOpen ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={colors.green}
                    />
                  </View>
                  <AnimatedDropdown visible={treatmentOpen}>
                    <Text style={style.dropdownContent}>
                      {result?.treatment || 'No treatment information available.'}
                    </Text>
                  </AnimatedDropdown>
                </TouchableOpacity>

                <View style={style.buttonRow}>
                  <TouchableOpacity
                    style={style.actionButton}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons name="refresh" size={18} color={colors.heading} />
                    <Text style={style.buttonText}>Retry</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={style.actionButton}
                    onPress={async () => {
                      try {
                        await Share.share({
                          message: `Prediction: ${result.prediction}\nConfidence: ${result.confidence?.toFixed(2) ?? 'N/A'}%\nShared from LeafLens 🌿`,
                          url: imageUri,
                        });
                      } catch (error) {
                        console.error('Error sharing:', error);
                      }
                    }}
                  >
                    <Ionicons name="share-social" size={18} color={colors.heading} />
                    <Text style={style.buttonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default AnalyzeScreen;