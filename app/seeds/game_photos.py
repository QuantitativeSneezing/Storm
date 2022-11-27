from app.models import db, GamePhoto, environment, SCHEMA
def seed_game_photos():
    first = GamePhoto(game_id= 1,
        url= "https://cdn.akamai.steamstatic.com/steam/apps/22380/header.jpg?t=1665072891",
        is_main= True
        )
    second = GamePhoto(game_id=2,
        url= "https://cdn.akamai.steamstatic.com/steam/apps/529340/header.jpg?t=1667905309",
        is_main= True
        )
    third = GamePhoto(game_id=3,
        url= "https://cdn.akamai.steamstatic.com/steam/apps/1659040/header.jpg?t=1661511609",
        is_main= True
        )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_game_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM game_photos")





    db.session.commit()
