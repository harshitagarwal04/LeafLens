from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
from transformers import AutoModelForImageClassification, AutoImageProcessor
import json
import os

app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your React app's URL here
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model from Hugging Face
model_name = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
processor = AutoImageProcessor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)
model.eval()

# Manual class ID to label mapping
id2label = {
    0: "Apple scab",
    1: "Apple Blackn rot",
    2: "Apple Cedar apple rust",
    3: "Apple healthy",
    4: "Blueberry healthy",
    5: "Cherry Powdery mildew",
    6: "Cherry healthy",
    7: "Corn Cercospora leaf spot Gray leaf spot",
    8: "Corn Common rust ",
    9: "Corn Northern Leaf Blight",
    10: "Corn healthy",
    11: "Grape Black rot",
    12: "Grape Esca (Black Measles)",
    13: "Grape Leaf blight (Isariopsis Leaf Spot)",
    14: "Grape healthy",
    15: "Orange Haunglongbing (Citrus greening)",
    16: "Peach Bacterial spot",
    17: "Peach healthy",
    18: "Pepper bell Bacterial spot",
    19: "Pepper bell healthy",
    20: "Potato Early blight",
    21: "Potato Late blight",
    22: "Potato healthy",
    23: "Raspberry healthy",
    24: "Soybean healthy",
    25: "Squash Powdery mildew",
    26: "Strawberry Leaf scorch",
    27: "Strawberry healthy",
    28: "Tomato Bacterial spot",
    29: "Tomato Early blight",
    30: "Tomato Late blight",
    31: "Tomato Leaf Mold",
    32: "Tomato Septoria leaf spot",
    33: "Tomato Spider mites",
    34: "Tomato Target Spot",
    35: "Tomato Yellow Leaf Curl Virus",
    36: "Tomato mosaic virus",
    37: "Tomato healthy"
}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
        predicted = int(outputs.logits.argmax(-1).item())
        
        print("Predicted class index:", predicted)
        print("Available labels:", model.config.id2label)

    class_name = id2label.get(predicted, "Unknown")
    return {
        "predicted_class": predicted,
        "class_name": class_name
    }