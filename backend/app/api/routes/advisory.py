from fastapi import APIRouter

router = APIRouter()

@router.post("/advisory")
def get_advisory():
    return {"message": "Advisory stub"}
