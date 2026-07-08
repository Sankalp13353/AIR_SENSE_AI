from sqlalchemy import text

from app.db.database import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))

        print(result.fetchone())

        print("\n✅ PostgreSQL Connected Successfully!")

except Exception as e:
    print(e)