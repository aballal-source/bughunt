from fastapi import APIRouter, HTTPException
from database import get_connection

router = APIRouter()

@router.get("/")
def get_analytics():
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            SELECT
                g.game_name,
                COUNT(br.bug_report_id) AS total_bugs,
                COUNT(CASE WHEN br.status = 'open' THEN 1 END) AS open_bugs,
                COUNT(CASE WHEN br.status = 'confirmed' THEN 1 END) AS confirmed_bugs,
                COUNT(CASE WHEN br.status = 'patched' THEN 1 END) AS patched_bugs
            FROM games g
            LEFT JOIN bug_reports br ON g.game_id = br.game_id
            GROUP BY g.game_name
            ORDER BY total_bugs DESC;
        """)
        rows = cursor.fetchall()
        games_data = []
        for row in rows:
            games_data.append({
                "game_name": row[0],
                "total_bugs": row[1],
                "open_bugs": row[2],
                "confirmed_bugs": row[3],
                "patched_bugs": row[4]
            })

        cursor.execute("""
            SELECT
                br.severity,
                COUNT(*) AS count
            FROM bug_reports br
            GROUP BY br.severity
            ORDER BY count DESC;
        """)
        rows = cursor.fetchall()
        severity_data = []
        for row in rows:
            severity_data.append({
                "severity": row[0],
                "count": row[1]
            })

        cursor.execute("""
            SELECT
                br.platform,
                COUNT(*) AS count
            FROM bug_reports br
            GROUP BY br.platform
            ORDER BY count DESC;
        """)
        rows = cursor.fetchall()
        platform_data = []
        for row in rows:
            platform_data.append({
                "platform": row[0],
                "count": row[1]
            })

        cursor.execute("""
            SELECT COUNT(*)
            FROM bug_reports
            WHERE created_at >= NOW() - INTERVAL '7 days';
        """)
        weekly_count = cursor.fetchone()[0]

        return {
            "games": games_data,
            "severity_breakdown": severity_data,
            "platform_breakdown": platform_data,
            "bugs_last_7_days": weekly_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()