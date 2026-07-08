import os
from pathlib import Path
from dotenv import load_dotenv

# Base directory of the backend folder (3 levels up from app/core/config.py)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load environment variables from the .env file in the backend root
env_path = BASE_DIR / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    # Fallback to loading from current environment or default search paths
    load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
