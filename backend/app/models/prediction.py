from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.db.base import Base


class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)

    city = Column(String, nullable=False)
    state = Column(String, nullable=False)

    predicted_aqi = Column(Float, nullable=False)

    prediction_time = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )