from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class BugReportCreate(BaseModel):
    game_id: UUID
    title: str
    description: str
    severity: str
    steps_to_reproduce: str
    platform: str

class BugReportResponse(BaseModel):
    bug_report_id: UUID
    username: str
    game_name: str
    title: str
    description: str
    severity: str
    steps_to_reproduce: str
    platform: str
    status: str
    created_at: datetime
    upvote_count: int

class StatusUpdate(BaseModel):
    status: str

class GameCreate(BaseModel):
    game_name: str