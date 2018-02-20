from flask import Flask, jsonify, render_template, request, json
import time
import sqlite3
app = Flask(__name__)
db = 'hedgehog.sqlite3' 

#routes for displaying pages

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/showHomePage')
def showHomePage():
    return render_template('homepage.html')

@app.route('/showTasks')
def showTasks():
    return render_template('tasks.html')

@app.route('/showStats')
def showStats():
    return render_template('stats.html')

@app.route('/showAddTask')
def showAddTask():
    return render_template('addtask.html')

@app.route('/showToDoToday')
def showToDoToday():
    return render_template('todotoday.html')

showToDoToday    
#routes for button actions

@app.route('/getTasks',methods=['POST','GET'])
def getTasks():    
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT Title, Urgency, Importance FROM Tasks WHERE Status like 'Not Started'")
    all_rows = c.fetchall()
    return jsonify(all_rows)

@app.route('/getInProgress',methods=['POST','GET'])
def getInProgress():    
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT Title, Urgency, Importance FROM Tasks WHERE Status like 'In Progress'")
    all_rows = c.fetchall()
    return jsonify(all_rows)

@app.route('/getHardDeadlines',methods=['POST','GET'])
def getHardDeadlines():    
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT Title FROM Tasks WHERE Deadline_Type like 'HARD'")
    all_rows = c.fetchall()
    return jsonify(all_rows)

@app.route('/getToDoToday',methods=['POST','GET'])
def getToDoToday():    
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT Title, Urgency, Importance FROM Tasks WHERE Status like 'To Do Today'")
    all_rows = c.fetchall()
    return jsonify(all_rows)

@app.route('/getDone',methods=['POST','GET'])
def getDone():    
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT Title FROM Tasks WHERE Status like 'Done'")
    all_rows = c.fetchall()
    return jsonify(all_rows)

@app.route('/addTask',methods=['POST','GET'])
def addTask():
    _title = request.form['inputTitle'] 
    _description = request.form['inputDescription']   
    _type = request.form['inputType']
    _epic = request.form['inputEpic']
    _complexity = request.form['inputComplexity']
    _time = request.form['inputTime']
    _urgency = request.form['inputUrgency']
    _importance = request.form['inputImportance']
    _deadline = request.form['inputDeadline']
    _deadlineType = request.form['deadlineType']
    _status = "Not Started"
    
    #send details from the form to the db
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("INSERT INTO Tasks (Title, Description, Type, Epic, Complexity, Time, Urgency, Importance, Deadline, Deadline_Type, Status) VALUES (?,?,?,?,?,?,?,?,?,?,?);", (_title, _description, _type, _epic, _complexity, _time, _urgency, _importance, _deadline, _deadlineType, _status))
    conn.commit()
    conn.close()
    return json.dumps({'message':'New Task added successfully !'})

@app.route('/startTask',methods=['POST','GET'])
def startTask():
        jsonData = request.get_json()
        taskTitle = jsonData['title']

        conn = sqlite3.connect(db)
        c = conn.cursor()
        c.execute("UPDATE Tasks SET Status = 'In Progress' where Title = ?",(taskTitle,))
        conn.commit()
        conn.close()
        return json.dumps({'message':'status updated!'})

@app.route('/addToToday',methods=['POST','GET'])
def addToToday():
        jsonData = request.get_json()
        taskTitle = jsonData['title']

        conn = sqlite3.connect(db)
        c = conn.cursor()
        c.execute("UPDATE Tasks SET Status = 'To Do Today' where Title = ?",(taskTitle,))
        conn.commit()
        conn.close()
        return json.dumps({'message':'status updated!'})



@app.route('/stopTask',methods=['POST','GET'])
def stopTask():
        jsonData = request.get_json()
        taskTitle = jsonData['title']

        conn = sqlite3.connect(db)
        c = conn.cursor()
        c.execute("UPDATE Tasks SET Status = 'Not Started' where Title = ?",(taskTitle,))
        conn.commit()
        conn.close()
        return json.dumps({'message':'status updated!'})

@app.route('/finishTask',methods=['POST','GET'])
def finishTask():
        jsonData = request.get_json()
        taskTitle = jsonData['title']

        conn = sqlite3.connect(db)
        c = conn.cursor()
        c.execute("UPDATE Tasks SET Status = 'Done' where Title = ?",(taskTitle,))
        conn.commit()
        conn.close()
        return json.dumps({'message':'status updated!'})

@app.route('/reopenTask',methods=['POST','GET'])
def reopenTask():
        jsonData = request.get_json()
        taskTitle = jsonData['title']

        conn = sqlite3.connect(db)
        c = conn.cursor()
        c.execute("UPDATE Tasks SET Status = 'In Progress' where Title = ?",(taskTitle,))
        conn.commit()
        conn.close()
        return json.dumps({'message':'status updated!'})

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




