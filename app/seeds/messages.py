from app.models import db, Message, environment, SCHEMA, User
from .users import demo, marnie, bobbie
from datetime import datetime
def seed_messages():
    first = Message(
    content= "HELLO FRIENDO",
    sender_id= 1,
    friendship_id= 1,
    created_at=datetime.now(),
    )

    second = Message(
    content= "wazzup",
    sender_id= 2,
    friendship_id= 1,
    created_at=datetime.now(),
        )
    third = Message(
        content= "NICE TO SEE YA",
        sender_id=1,
        friendship_id= 2,
        created_at=datetime.now(),
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
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
