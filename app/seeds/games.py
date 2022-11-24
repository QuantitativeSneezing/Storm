from app.models import db, Game, environment, SCHEMA
def seed_games():
    first = Game(title= "Fallout: New Vegas", description= "a post-nuclear role playing game",
        price= 19.99
        )
    second = Game(title= "Victoria 3", description= "Grand strategy economic simulator, brought to you by Paradox Interactive",
        price= 49.99
        )
    third = Game(title= "Hitman 3", description= "Enter a world of assassination",
        price= 59.99
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
def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM games")
        db.session.execute("DELETE FROM game_reviews")
        db.session.execute("DELETE FROM user_cart_items")
        db.session.execute("DELETE FROM user_library_games")




    db.session.commit()
