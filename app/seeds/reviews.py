from app.models import db, GameReview, environment, SCHEMA
first = GameReview(
    title= "marnie",
    content= "Favorite game of all time",
    rating= True,
    game_id= 1,
    reviewer_id= 2,
   )
second = GameReview(
    title= "marnie",
    content= "Not bad, lots of potential",
    rating= True,
    game_id= 2,
    reviewer_id= 2,
    )
third = GameReview(
    title= "marnie",
    content= "Great game, love the stealth system",
    rating= True,
    game_id= 3,
    reviewer_id= 2,
    )
fourth= GameReview(
    title= "marnie",
    content= "cool game, very hard though",
    rating= True,
    game_id= 4,
    reviewer_id= 2,
    )

def seed_game_reviews():

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the game_reviews table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_game_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.game_reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM game_reviews")

    db.session.commit()
