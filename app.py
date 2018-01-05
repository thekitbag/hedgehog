from flask import Flask, jsonify, render_template, request, json
import time
import sqlite3
app = Flask(__name__)
db = 'hedgehog.sqlite' 

#routes for displaying pages

@app.route("/")
def main():
    return render_template('index.html')

#routes for button actions

#route for shutting down the sserver

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown', methods=['POST'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'

#route to start the app

if __name__ == "__main__":
  app.run()



