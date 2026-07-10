from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.schemas.prediction import (
    AQIPredictionRequest,
    PredictionHistoryResponse,
)
from app.services.history_service import get_prediction_history
from app.services.prediction_service import make_prediction
from app.services.stats_service import get_prediction_stats
from app.models.prediction import PredictionHistory

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"]
)


@router.post("/")
def predict_route(
    request: AQIPredictionRequest,
    db: Session = Depends(get_db)
):
    return make_prediction(
        request.model_dump(),
        db
    )


@router.get(
    "/history",
    response_model=List[PredictionHistoryResponse]
)
def prediction_history(
    db: Session = Depends(get_db)
):
    return get_prediction_history(db)


@router.get("/stats")
def prediction_stats(
    db: Session = Depends(get_db)
):
    return get_prediction_stats(db)


@router.delete("/{prediction_id}")
def delete_prediction(
    prediction_id: int,
    db: Session = Depends(get_db)
):
    prediction = db.query(PredictionHistory).filter(
        PredictionHistory.id == prediction_id
    ).first()
    
    if not prediction:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found"
        )
    
    db.delete(prediction)
    db.commit()
    
    return {
        "message": "Prediction deleted successfully",
        "id": prediction_id
    }