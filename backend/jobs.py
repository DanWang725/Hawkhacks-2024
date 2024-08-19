from cache import get_all_quiz_view_count, clear_quiz_view_count_table
from crud import add_quiz_views
from database import SessionLocal

async def commit_view_cache():
    viewCounts = await get_all_quiz_view_count()
    
    db = SessionLocal()
    try:
        await add_quiz_views(db, viewCounts)
    finally:
        db.close()
    
    await clear_quiz_view_count_table()
    
    