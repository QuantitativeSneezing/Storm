from app.models import db, Friendship, environment, SCHEMA, User
from .users import demo, marnie, bobbie

def seed_friendships():
    first = Friendship(
    nicknameOne= "1DEMO",
    nicknameTwo= "2marniepie",
    friendship_friendship_friends= [demo,marnie]
        )

    second = Friendship(
    nicknameOne= "1DEMO",
    nicknameTwo= "3Bobbieboo",
    friendship_friendship_friends= [demo,bobbie]

        )
    third = Friendship(
    nicknameOne= "3Bobbieboo",
    nicknameTwo= "2marniepie",
    friendship_friendship_friends= [bobbie,marnie]

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
def undo_friendships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friendships RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friendships")
        db.session.execute("DELETE FROM friendship_friends")

    db.session.commit()
