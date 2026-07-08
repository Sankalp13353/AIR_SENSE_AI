def get_aqi_category(aqi: float):
    if aqi <= 50:
        return {
            "category": "Good",
            "color": "#00E400",
            "health_advisory": "Air quality is satisfactory."
        }

    elif aqi <= 100:
        return {
            "category": "Moderate",
            "color": "#FFFF00",
            "health_advisory": "Air quality is acceptable."
        }

    elif aqi <= 150:
        return {
            "category": "Unhealthy for Sensitive Groups",
            "color": "#FF7E00",
            "health_advisory": "Sensitive groups should reduce prolonged outdoor activity."
        }

    elif aqi <= 200:
        return {
            "category": "Unhealthy",
            "color": "#FF0000",
            "health_advisory": "Everyone may begin to experience health effects."
        }

    elif aqi <= 300:
        return {
            "category": "Very Unhealthy",
            "color": "#8F3F97",
            "health_advisory": "Health alert: everyone may experience more serious effects."
        }

    else:
        return {
            "category": "Hazardous",
            "color": "#7E0023",
            "health_advisory": "Avoid outdoor activities. Serious health effects possible."
        }