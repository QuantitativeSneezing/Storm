from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins

if os.environ.get("FLASK_ENV") == "production":
    # origins = [
    #   #TODO: add url of live site lol
    # ]
    origins= "*"
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("DM")
def handle_chat(data):
    emit("DM", data, broadcast=True)
@socketio.on("RM")
def handle_chat(data):
    emit("RM", data, broadcast=True)
