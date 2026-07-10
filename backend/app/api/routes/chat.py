from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.groq_service import get_ai_response

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    answer = get_ai_response(
        city=request.city,
        aqi=request.aqi,
        category=request.category,
        health_advisory=request.health_advisory,
        question=request.question
    )

    return ChatResponse(
        answer=answer
    )