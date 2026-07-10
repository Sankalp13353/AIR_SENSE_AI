from pydantic import BaseModel


class ChatRequest(BaseModel):
    city: str
    aqi: float
    category: str
    health_advisory: str
    question: str


class ChatResponse(BaseModel):
    answer: str