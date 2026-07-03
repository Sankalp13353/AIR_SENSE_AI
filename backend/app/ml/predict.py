import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

MODEL = joblib.load(BASE_DIR / "aqi_random_forest_model.pkl")
FEATURES = joblib.load(BASE_DIR / "model_features.pkl")
LABEL_ENCODERS = joblib.load(BASE_DIR / "label_encoders.pkl")


def predict_aqi(data: dict):
    df = pd.DataFrame([data])

    # Encode categorical columns
    for column, encoder in LABEL_ENCODERS.items():
      if column in df.columns:
        df[column] = encoder.transform(df[column])

    # Keep features in the exact order used during training
    df = df[FEATURES]

    prediction = MODEL.predict(df)[0]

    return round(float(prediction), 2)