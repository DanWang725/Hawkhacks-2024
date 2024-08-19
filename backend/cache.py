import aiosqlite
import asyncio

async def setup_cache() -> None:
    async with aiosqlite.connect('cache.db') as db:
        await db.execute('''
        CREATE TABLE IF NOT EXISTS quizViewCount (
            testId INTEGER PRIMARY KEY NOT NULL,
            viewCount INTEGER DEFAULT 0 NOT NULL
        );
        ''')
        await db.commit()


async def add_quiz_view(testId: int) -> None:
    async with aiosqlite.connect('cache.db') as db:
        async with db.execute('''
        INSERT INTO quizViewCount (testId, viewCount)
        VALUES (?, 1)
        ON CONFLICT(testId) DO UPDATE SET
            viewCount = viewCount + 1;
        ''', (testId,)):
            await db.commit()


async def get_all_quiz_view_count() -> list[tuple[int, int]]:
    async with aiosqlite.connect('cache.db') as db:
        async with db.execute('''
        SELECT *
        FROM quizViewCount
        WHERE viewCount > 0;
        ''') as cursor:
            rows = await cursor.fetchall()
            return rows


async def clear_quiz_view_count_table():
    async with aiosqlite.connect('cache.db') as db:
        await db.execute('DELETE FROM quizViewCount;')
        await db.commit()


if __name__ == '__main__':
    async def main():
        await setup_cache()
        # inserts 4 views for test 1, 3 views for 2, and 3 views for 3
        await asyncio.gather(
            add_quiz_view(1),
            add_quiz_view(1),
            add_quiz_view(2),
            add_quiz_view(3),
            add_quiz_view(1),
            add_quiz_view(2),
            add_quiz_view(3),
            add_quiz_view(1),
            add_quiz_view(2),
            add_quiz_view(3),
        )
        viewCounts = await get_all_quiz_view_count()
        for testId, viewCount in viewCounts:
            print(f"Test {testId} has {viewCount} views")

    asyncio.run(main())

