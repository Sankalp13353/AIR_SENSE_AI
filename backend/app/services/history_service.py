from sqlalchemy.orm import Session

from app.models.prediction import PredictionHistory


def get_prediction_history(db: Session):
    return (
        db.query(PredictionHistory)
        .order_by(PredictionHistory.prediction_time.desc())
        .all()
    )