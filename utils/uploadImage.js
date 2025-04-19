import axios from 'axios';

export const uploadImageForPrediction = async (imageUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'leaf.jpg',
  });

  try {
    const response = await axios.post('http://192.168.1.8:7860/predict/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Full API Response:', JSON.stringify(response.data, null, 2));
    return {
      prediction: response.data.prediction,
      confidence: response.data.confidence,
      description: response.data.description,
      treatment: response.data.treatment,
      more_details: response.data.more_details,
    };
  } catch (error) {
    console.error('Prediction API Error:', error);
    throw error;
  }

};