import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def get_ai_response(
    city: str,
    aqi: float,
    category: str,
    health_advisory: str,
    question: str,
):
    prompt = f"""
You are AirSense AI, an intelligent environmental health assistant.

Current AQI Prediction

City: {city}

AQI: {aqi:.2f}

Category: {category}

Health Advisory:
{health_advisory}

Instructions:

- Answer only questions related to:
    • Air Pollution
    • AQI
    • Health
    • Outdoor Activities
    • Masks
    • Pollution Safety
    • Children
    • Elderly
    • Exercise

- Keep answers under 120 words.

- Be professional.

- Give practical advice.

- If the user asks something unrelated to air quality,
politely tell them that you only answer air-quality related questions.

User Question:

{question}
"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are AirSense AI.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.4,
        max_tokens=250,
    )

    return completion.choices[0].message.content