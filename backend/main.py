from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import bugs, games

app = FastAPI(title="BugHunt API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bugs.router, prefix="/bugs", tags=["bugs"])
app.include_router(games.router, prefix="/games", tags=["games"])

@app.get("/")
def root():
    return {"message": "BugHunt API is running"}