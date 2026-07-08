from app.ml.predict import predict_aqi
from app.models.prediction import PredictionHistory
from app.services.aqi_service import get_aqi_category


def make_prediction(data: dict, db):
    # Predict AQI using the ML model
    prediction = predict_aqi(data)

    # Save prediction to the database
    history = PredictionHistory(
        city=data["city"],
        state=data["state"],
        predicted_aqi=prediction
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    # Get AQI category, color, and health advisory
    category_info = get_aqi_category(prediction)

    # Return complete response
    return {
        "predicted_aqi": prediction,
        **category_info
    }