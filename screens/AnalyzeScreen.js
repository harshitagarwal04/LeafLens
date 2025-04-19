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

          <View style={style.analysisContainer}>
            <Text style={style.resultText}>About this Disease:</Text>
            <Text style={style.text}>
            {result?.description || 'No description available.'}
            </Text>
          </View>

          <View style={style.analysisContainer}>
            <Text style={style.resultText}>More Details:</Text>
            <Text style={style.text}>
              {result?.more_details || 'No further details available.'}
            </Text>
          </View>

          <View style={style.analysisContainer}>
            <Text style={style.resultText}>Treatment:</Text>
            <Text style={style.text}>
              {result?.treatment || 'No treatment information available.'}
            </Text>
          </View>

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
              message: `Prediction: ${result.prediction}\nConfidence: ${result.confidence.toFixed(2)}%\nShared from LeafLens 🌿`,
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