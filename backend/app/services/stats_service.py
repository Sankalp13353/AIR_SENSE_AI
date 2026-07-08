from sqlalchemy import func

from app.models.prediction import PredictionHistory


def get_prediction_stats(db):

    total = db.query(PredictionHistory).count()

    average = (
        db.query(
            func.avg(PredictionHistory.predicted_aqi)
        )
        .scalar()
    )

    highest = (
        db.query(
            func.max(PredictionHistory.predicted_aqi)
        )
        .scalar()
    )

    lowest = (
        db.query(
            func.min(PredictionHistory.predicted_aqi)
        )
        .scalar()
    )

    return {
        "total_predictions": total,
        "average_aqi": round(average or 0, 2),
        "highest_aqi": highest,
        "lowest_aqi": lowest
    }