from app.models import db, Message, environment, SCHEMA, User
from .users import demo, marnie, bobbie

def seed_messages():
    first = Message(
    content= "HELLO FRIENDO"
    nicknameTwo= "2marniepie",
    message_message_friends= [demo,marnie]
        )

    second = Message(
    nicknameOne= "1DEMO",
    nicknameTwo= "3Bobbieboo",
    message_message_friends= [demo,bobbie]

        )
    third = Message(
    nicknameOne= "3Bobbieboo",
    nicknameTwo= "2marniepie",
    message_message_friends= [bobbie,marnie]

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
        db.session.execute("DELETE FROM message_friends")

    db.session.commit()
