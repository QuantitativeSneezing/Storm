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
    fourth= GamePhoto(game_id=4,
        url= "https://cdn.akamai.steamstatic.com/steam/apps/262060/header.jpg?t=1655946236",
        is_main= True)
    fifth= GamePhoto(game_id=5,
        url= 'https://cdn.akamai.steamstatic.com/steam/apps/646570/header.jpg?t=1666988685',
        is_main=True)
    sixth= GamePhoto(game_id=6,
        url= "https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg?t=1666917466",
        is_main= True)
    seventh= GamePhoto(game_id=7,
        url="https://cdn.akamai.steamstatic.com/steam/apps/2600/header.jpg?t=1604376441",
        is_main= True)
    eigth= GamePhoto(game_id=8,
        url= "https://cdn.akamai.steamstatic.com/steam/apps/1235140/header.jpg?t=1661250400",
        is_main= True)
    ninth= GamePhoto(game_id=9,
        url="https://cdn.akamai.steamstatic.com/steam/apps/304650/header.jpg?t=1667990285",
        is_main= True)
    tenth= GamePhoto(game_id=10,
        url="https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg?t=1667588841",
        is_main= True)
    eleventh= GamePhoto(game_id=11,
        url="https://cdn.akamai.steamstatic.com/steam/apps/597220/header.jpg?t=1596843390",
        is_main= True)
    twelfth= GamePhoto(game_id=12,
        url= "https://cdn.akamai.steamstatic.com/steam/apps/212680/header.jpg?t=1667027825",
        is_main= True)
    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(sixth)
    db.session.add(seventh)
    db.session.add(eigth)
    db.session.add(ninth)
    db.session.add(tenth)
    db.session.add(eleventh)
    db.session.add(twelfth)
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
