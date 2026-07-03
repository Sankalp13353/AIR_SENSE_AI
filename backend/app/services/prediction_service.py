from app.ml.predict import predict_aqi

def predict(data: dict) -> float:
    return predict_aqi(data)
