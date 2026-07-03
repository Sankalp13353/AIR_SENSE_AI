from typing import Literal
from pydantic import BaseModel, field_validator


class AQIPredictionRequest(BaseModel):
    city: Literal['agartala', 'ahmedabad', 'aizawl', 'bengaluru', 'bhopal', 'bhubaneswar', 'chandigarh', 'chennai', 'dehradun', 'delhi']
    state: Literal['delhi', 'gujarat', 'karnataka', 'madhya pradesh', 'mizoram', 'odisha', 'punjab', 'tamil nadu', 'tripura', 'uttarakhand']
    latitude: float
    longitude: float
    month: int
    day_name: Literal['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    is_weekend: bool
    season: Literal['monsoon', 'post_monsoon', 'summer', 'winter']
    time_of_day: Literal['afternoon', 'early_morning', 'evening', 'morning', 'night', 'night_late']
    humidity_percent: float
    dew_point_c: float
    wind_gusts_kmh: float
    precipitation_mm: float
    is_raining: bool
    heavy_rain: bool
    pressure_msl_hpa: float
    cloud_cover_percent: float
    pm2_5_ugm3: float
    pm10_ugm3: float
    co_ugm3: float
    no2_ugm3: float
    so2_ugm3: float
    o3_ugm3: float
    dust_ugm3: float
    aod: float
    festival_period: bool
    crop_burning_season: bool
    hour: int
    day: int
    year: int
    aqi_lag_1: float
    aqi_lag_3: float
    aqi_lag_6: float
    aqi_lag_12: float
    aqi_lag_24: float
    aqi_roll_mean_24: float
    aqi_roll_max_24: float
    aqi_roll_min_24: float
    aqi_roll_std_24: float

    @field_validator('city', 'state', 'day_name', 'season', 'time_of_day', mode='before')
    @classmethod
    def to_lowercase(cls, v: str) -> str:
        if isinstance(v, str):
            return v.lower()
        return v