import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { uploadImageForPrediction } from '../utils/uploadImage';

const AnalyzeScreen = () => {
  const { imageUri } = useRoute().params;
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
    <View style={{ padding: 16 }}>
      <Image source={{ uri: imageUri }} style={{ width: '100%', height: 300 }} />
      <Text style={{ fontSize: 18, marginTop: 16 }}>
        {result?.error ? result.error : `Predicted class: ${result.class_name} (Class ID: ${result.predicted_class})`}
      </Text>
    </View>
  );
};

export default AnalyzeScreen;