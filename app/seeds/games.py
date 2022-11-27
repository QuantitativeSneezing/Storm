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
    fourth = Game(title= "Darkest Dungeon",
        description= "Darkest Dungeon is a challenging gothic roguelike turn-based RPG about the psychological stresses of adventuring. Recruit, train, and lead a team of flawed heroes against unimaginable horrors, stress, disease, and the ever-encroaching dark. Can you keep your heroes together when all hope is lost?",
        price= 24.99
        )
    fifth= Game(title= "Slay the Spire",
        description= "We fused card games and roguelikes together to make the best single player deckbuilder we could. Craft a unique deck, encounter bizarre creatures, discover relics of immense power, and Slay the Spire!",
        price=24.99
        )
    sixth= Game(title= "Stardew Valley",
        description= "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
        price= 14.99)
    seventh= Game(title= "Vampire:the Masquerade -Bloodlines",
        description= "Vampire®: The Masquerade-Bloodlines™ delivers a new type of RPG experience-one that blends all the core elements of a traditional RPG with the graphical richness, immediacy and brutal combat of a first-person action game. The game plunges players into the dark and gritty vampire underworld of modern-day L.A. as a creature of the night.",
        price= 19.99)
    eigth= Game(title= "Yakuza: Like a Dragon",
        description= "Become Ichiban Kasuga, a low-ranking yakuza grunt left on the brink of death by the man he trusted most. Take up your legendary bat and get ready to crack some underworld skulls in dynamic RPG combat set against the backdrop of modern-day Japan",
        price= 59.99)
    ninth= Game(title="SUNLESS SEA",
        description= "LOSE YOUR MIND. EAT YOUR CREW. DIE. Take the helm of your steamship and set sail for the unknown! Sunless Sea is a game of discovery, loneliness and frequent death, set in the award-winning Victorian Gothic universe of Fallen London.",
        price= 18.99)
    tenth= Game(title= "Apex Legends-Champion edition",
        description= "Apex Legends is the award-winning, free-to-play Hero Shooter from Respawn Entertainment. Master an ever-growing roster of legendary characters with powerful abilities, and experience strategic squad play and innovative gameplay in the next evolution of Hero Shooter and Battle Royale.",
        price= 39.99)
    eleventh= Game(title= "West of Loathing",
        description= "West of Loathing — a slapstick comedy stick-figure wild west adventure role-playing game.",
        price=  10.99)
    twelfth= Game(title= "FTL: Faster Than Light",
        description= '''This "spaceship simulation roguelike-like" allows you to take your ship and crew on an adventure through a randomly generated galaxy filled with glory and bitter defeat.''',
        price=9.99)
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
def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM games")
        db.session.execute("DELETE FROM game_reviews")
        db.session.execute("DELETE FROM user_cart_items")
        db.session.execute("DELETE FROM user_library_games")




    db.session.commit()
