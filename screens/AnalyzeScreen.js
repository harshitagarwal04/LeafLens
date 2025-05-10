import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { uploadImageForPrediction } from '../utils/uploadImage';
import style from '../ScreenStyles/AnalyzeScreenStyle';

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

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Image source={{ uri: imageUri }} style={style.imagePreview} />

      {result?.error ? (
        <Text style={style.errorText}>{result.error}</Text>
      ) : (
        <>
          <Text style={style.headerText}>{result.prediction}</Text>
          <Text style={style.confidenceText}>
            Confidence:{' '}
            {result.confidence != null
              ? result.confidence + '%'
              : 'N/A'}
          </Text>

          <View style={style.divider} />

          {/* About Dropdown */}
          <TouchableOpacity
            style={style.analysisContainer}
            onPress={() => setAboutOpen((prev) => !prev)}
          >
            <Text style={style.resultText}>
              About this Disease {aboutOpen ? '▲' : '▼'}
            </Text>
            {aboutOpen && (
              <Text style={style.text}>
                {result?.description || 'No description available.'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Causes Dropdown */}
          <TouchableOpacity
            style={style.analysisContainer}
            onPress={() => setCausesOpen((prev) => !prev)}
          >
            <Text style={style.resultText}>
              Causes {causesOpen ? '▲' : '▼'}
            </Text>
            {causesOpen && (
              <Text style={style.text}>
                {result?.causes || 'No further details available.'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Treatment Dropdown */}
          <TouchableOpacity
            style={style.analysisContainer}
            onPress={() => setTreatmentOpen((prev) => !prev)}
          >
            <Text style={style.resultText}>
              Treatment {treatmentOpen ? '▲' : '▼'}
            </Text>
            {treatmentOpen && (
              <Text style={style.text}>
                {result?.treatment || 'No treatment information available.'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={style.backButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={style.buttonText}>Retry</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.backButton}
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
            <Text style={style.buttonText}>Share Result</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default AnalyzeScreen;