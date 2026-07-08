import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

MODEL = joblib.load(BASE_DIR / "aqi_random_forest_model.pkl")
FEATURES = joblib.load(BASE_DIR / "model_features.pkl")
LABEL_ENCODERS = joblib.load(BASE_DIR / "label_encoders.pkl")


def predict_aqi(data: dict):
    # Map unknown cities/states to known equivalents for ML model encoding
    model_data = data.copy()
    city_lower = str(model_data.get("city", "")).lower()
    state_lower = str(model_data.get("state", "")).lower()

    known_cities = {'agartala', 'ahmedabad', 'aizawl', 'bengaluru', 'bhopal', 'bhubaneswar', 'chandigarh', 'chennai', 'dehradun', 'delhi'}
    known_states = {'delhi', 'gujarat', 'karnataka', 'madhya pradesh', 'mizoram', 'odisha', 'punjab', 'tamil nadu', 'tripura', 'uttarakhand'}

    if city_lower not in known_cities or state_lower not in known_states:
        fallback_map = {
            "goa": ("bengaluru", "karnataka"),
            "hyderabad": ("bhopal", "madhya pradesh"),
            "jaipur": ("ahmedabad", "gujarat"),
            "kolkata": ("delhi", "delhi"),
            "lucknow": ("delhi", "delhi"),
            "mumbai": ("bhopal", "madhya pradesh"),
            "pune": ("bengaluru", "karnataka"),
            "shimla": ("dehradun", "uttarakhand"),
            "visakhapatnam": ("chennai", "tamil nadu"),
            "vishakapatnam": ("chennai", "tamil nadu"),
        }
        mapped_city, mapped_state = fallback_map.get(city_lower, ("delhi", "delhi"))
        model_data["city"] = mapped_city
        model_data["state"] = mapped_state

    df = pd.DataFrame([model_data])

    # Encode categorical columns
    for column, encoder in LABEL_ENCODERS.items():
      if column in df.columns:
        if isinstance(df[column].iloc[0], str):
          df[column] = df[column].astype(str).str.lower()
        df[column] = encoder.transform(df[column])


    # Keep features in the exact order used during training
    df = df[FEATURES]

    prediction = MODEL.predict(df)[0]

    return round(float(prediction), 2)