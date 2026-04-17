from fastapi import APIRouter, HTTPException
from database import get_connection
from models import BugReportCreate, BugReportResponse, StatusUpdate

router = APIRouter()

@router.get("/")
def get_bugs():
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT
                br.bug_report_id,
                u.username,
                g.game_name,
                br.title,
                br.description,
                br.severity,
                br.steps_to_reproduce,
                br.platform,
                br.status,
                br.created_at,
                COUNT(uv.upvote_id) AS upvote_count
            FROM bug_reports br
            JOIN users u ON br.user_id = u.user_id
            JOIN games g ON br.game_id = g.game_id
            LEFT JOIN upvotes uv ON br.bug_report_id = uv.bug_report_id
            GROUP BY br.bug_report_id, u.username, g.game_name
            ORDER BY upvote_count DESC, br.created_at DESC;
        """)
        rows = cursor.fetchall()
        bugs = []
        for row in rows:
            bugs.append({
                "bug_report_id": row[0],
                "username": row[1],
                "game_name": row[2],
                "title": row[3],
                "description": row[4],
                "severity": row[5],
                "steps_to_reproduce": row[6],
                "platform": row[7],
                "status": row[8],
                "created_at": row[9],
                "upvote_count": row[10]
            })
        return bugs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.post("/")
def create_bug(bug: BugReportCreate, user_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO bug_reports
                (user_id, game_id, title, description, severity, steps_to_reproduce, platform)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING bug_report_id, title, severity, status, created_at;
        """, (
            user_id,
            str(bug.game_id),
            bug.title,
            bug.description,
            bug.severity,
            bug.steps_to_reproduce,
            bug.platform
        ))
        row = cursor.fetchone()
        conn.commit()
        return {
            "bug_report_id": row[0],
            "title": row[1],
            "severity": row[2],
            "status": row[3],
            "created_at": row[4],
        }
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.patch("/{bug_report_id}/status")
def update_status(bug_report_id: str, status_update: StatusUpdate):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE bug_reports
            SET status = %s
            WHERE bug_report_id = %s
            RETURNING bug_report_id, title, status;
        """, (status_update.status, bug_report_id))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Bug report not found")
        conn.commit()
        return {
            "bug_report_id": row[0],
            "title": row[1],
            "status": row[2],
        }
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.post("/{bug_report_id}/upvote")
def upvote_bug(bug_report_id: str, user_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO upvotes (user_id, bug_report_id)
            VALUES (%s, %s)
            RETURNING upvote_id;
        """, (user_id, bug_report_id))
        conn.commit()
        return {"message": "Upvote recorded successfully"}
    except Exception as e:
        conn.rollback()
        error_message = str(e)
        if "duplicate key" in error_message:
            raise HTTPException(status_code=400, detail=error_message)
        raise HTTPException(status_code=500, detail="You have already upvoted this bug report")
    finally:
        cursor.close()
        conn.close()