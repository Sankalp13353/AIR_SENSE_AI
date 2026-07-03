from fastapi import APIRouter, HTTPException

from app.schemas.prediction import AQIPredictionRequest
from app.services.prediction_service import predict

router = APIRouter(prefix="/prediction", tags=["Prediction"])

@router.post("/")
def predict_route(request: AQIPredictionRequest):
    try:
        prediction = predict(request.model_dump())
        return {
            "predicted_aqi": prediction
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")