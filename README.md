# 🌍 AirSense AI

> **AI-Powered Air Quality Monitoring & Citizen Advisory Platform**

AirSense AI is a full-stack AI application that predicts Air Quality Index (AQI), visualizes air pollution data on an interactive map, stores prediction history, and provides personalized health recommendations through an AI-powered chatbot using Groq Llama 3.

---

# 🚀 Features

## 📈 AQI Prediction
- Predict Air Quality Index using a trained Machine Learning model.
- Displays AQI value with category and health advisory.

---

## 🗺️ Interactive AQI Dashboard
- Interactive Leaflet Map
- City-wise AQI visualization
- Live prediction display

---

## 🤖 AI Citizen Advisory Bot
Powered by **Groq Llama 3**

The chatbot can answer questions like:

- Should I wear a mask?
- Can I go for a morning walk?
- Is it safe for children?
- Outdoor activity recommendations
- Health precautions

---

## 📊 Dashboard Analytics

- Total Predictions
- Average AQI
- Highest AQI
- Lowest AQI

---

## 🕒 Prediction History

Stores every prediction inside PostgreSQL.

Displays

- City
- State
- Predicted AQI
- Prediction Time

---

# 🏗️ Tech Stack

## Frontend

- React.js
- Axios
- React Leaflet
- CSS3

---

## Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL

---

## Machine Learning

- Scikit-Learn
- Random Forest Regressor
- Pandas
- NumPy
- Joblib

---

## AI

- Groq API
- Llama 3.3 70B Versatile

---

# 📂 Project Structure

```
AirSense-AI
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── app
│   │
│   ├── api
│   ├── db
│   ├── ml
│   ├── models
│   ├── routes
│   ├── schemas
│   ├── services
│   └── main.py
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/AirSense-AI.git

cd AirSense-AI
```

---

# 🔥 Backend Setup

Go to backend

```bash
cd backend
```

Create Virtual Environment

### Mac/Linux

```bash
python3 -m venv venv
```

Activate

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```env
DATABASE_URL=postgresql+psycopg://username:password@localhost:5432/airsense_ai

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

### Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

Open another terminal

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🧠 Machine Learning Model

The application uses a trained **Random Forest Regressor**.

Input Features include

- PM2.5
- PM10
- NO₂
- SO₂
- CO
- O₃
- Humidity
- Temperature
- Wind Speed
- Pressure
- Rain
- Cloud Cover
- Seasonal Features
- Time Features
- Historical AQI Features

The model predicts

- AQI Value

Then maps it into

- Good
- Moderate
- Unhealthy for Sensitive Groups
- Unhealthy
- Very Unhealthy
- Hazardous

---

# 🤖 AI Chatbot

The chatbot uses **Groq Llama 3.3 70B Versatile**.

It answers questions related to

- Air Pollution
- AQI
- Health
- Masks
- Outdoor Activities
- Children Safety
- Elderly Care
- Exercise Recommendations

---

# 🗄 Database

PostgreSQL

Stores

- City
- State
- Predicted AQI
- Prediction Timestamp

---

# 📸 Screenshots

Add screenshots here after deployment.

Example

```
Dashboard

Prediction

Map

Chatbot

History
```

---

# 📌 Future Improvements

- Live AQI APIs
- Weather Integration
- Multi-City Comparison
- User Authentication
- PDF Report Generation
- AQI Forecasting
- Mobile App

---

# 👨‍💻 Author

**Sankalp**

Computer Science & Artificial Intelligence Student

---

# 📄 License

This project is developed for educational and academic purposes.
