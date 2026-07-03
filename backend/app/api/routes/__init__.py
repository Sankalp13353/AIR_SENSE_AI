from fastapi import APIRouter

from app.api.routes.prediction import router as prediction_router
from app.api.routes.health import router as health_router
from app.api.routes.advisory import router as advisory_router

router = APIRouter()

router.include_router(prediction_router)
router.include_router(health_router)
router.include_router(advisory_router)
