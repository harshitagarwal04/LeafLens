import axios from 'axios';

export const uploadImageForPrediction = async (imageUri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'leaf.jpg',
  });

  try {
    const response = await axios.post('http://192.168.29.10:7860/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Full API Response:', JSON.stringify(response.data, null, 2));
    return {
      predicted_class: response.data.predicted_class,
      class_name: response.data.class_name,
    };
  } catch (error) {
    console.error('Prediction API Error:', error);
    throw error;
  }

};