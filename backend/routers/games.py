from fastapi import APIRouter, HTTPException
from database import get_connection
from models import GameCreate

router = APIRouter()

@router.get("/")
def get_games():
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT game_id, game_name, created_at FROM games ORDER BY game_name;")
        rows = cursor.fetchall()
        games = []
        for row in rows:
            games.append({
                "game_id": row[0],
                "game_name": row[1],
                "created_at": row[2]
            })
        return games
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.post("/")
def create_game(game: GameCreate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO games (game_name) VALUES (%s) RETURNING game_id, game_name, created_at;",
            (game.game_name,)
        )
        rows = cursor.fetchone()
        conn.commit()
        return {
            "game_id": rows[0],
            "game_name": rows[1],
            "created_at": rows[2]
        }
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()