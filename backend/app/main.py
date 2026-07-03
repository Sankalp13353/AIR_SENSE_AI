from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(
    title="AirSense AI API",
    description="AQI Prediction and Citizen Advisory System",
    version="1.0.0",
)

app.include_router(router)


@app.get("/")
def root():
    return {"message": "AirSense AI Backend is Running 🚀"}


@app.get("/health")
def health():
    return {"status": "healthy"}