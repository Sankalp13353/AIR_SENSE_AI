from app.db.database import engine
from app.db.base import Base

# Import models so SQLAlchemy knows about them
from app.models.prediction import PredictionHistory

Base.metadata.create_all(bind=engine)

print("✅ Database tables created successfully!")
