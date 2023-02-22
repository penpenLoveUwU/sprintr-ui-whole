from flask import jsonify, render_template, request, redirect, url_for, flash, abort, Blueprint
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import requests
from . import vale
import os
import json
from werkzeug.utils import secure_filename


#configure database
db = SQLAlchemy()
bp = Blueprint("sprintr", __name__)

cwd = os.getcwd();
print("Current working directory: ", cwd)

# robot_url = os.environ.get('VALE_URL')


# compile list of 3d models in 3dmodels directory and store in models
models = []
for rooot, dir, files, in os.walk(cwd):
    for file in files:
        if file.endswith(".stl"):
            models.append(file[:-4])
            print("file in models: ", file)

# rc = vale.RemoteControl("http://192.168.1.9")

# global rc 

# render template for connect page
@bp.route("/connect", methods=["POST", "GET"])
def connect():
    return render_template("connect.html")

#connect to printer
@bp.route("/connect_printer", methods=["POST", "GET"])
def connect_printer():
    #get printer ip from form and connect
    printer_ip = request.form['printer']

    if printer_ip: 
        printer_url = "http://" + printer_ip + "/rr_connect"
        return jsonify({'result' : 'success',
                        'printer_url' : printer_url})
    return jsonify({'result' : 'failure'})

#connect to robot
@bp.route("/connect_robot", methods=["POST", "GET"])
def connect_robot():
    #get robot ip from form and connect
    robot_ip = request.form['robot']
    global rc 
    rc = vale.RemoteControl(robot_ip)
    print("rc", rc)
    rc.connected()
    # rc.getMapData()
    rc.getCapabilities()
    if robot_ip: 
        robot_url = robot_ip + ":80"
        return jsonify({'result' : 'success',
                        'robot_url' : robot_url})
    return jsonify({'result' : 'failure'})


@bp.route("/valetudo", methods=["POST", "GET"])
# gCodeCommands = []

@bp.route("/plan", methods=["POST", "GET"])
def home(): 
    return render_template(
        "valetudoTest.html", models=models
    )

@bp.route("/view/<string:model>", methods=["POST", "GET"])
def view(model):
    print("Viewing model: ", model)
    if os.path.exists(cwd + "/sprintr/static/3dmodels/" + model + ".stl"):
        print("Model found, attempting to render")
        return render_template("view.html", model=model)
        # return render_template("temp.html", model=model)
    print("Model not found")

# delete model from 3dmodels directory when button pressed on plan page
@bp.route("/delete/<string:model>", methods=["POST", "GET"])
def delete(model):
    print("Deleting model: ", model)
    # if os.path.exists(cwd + "/sprintr/static/3dmodels/" + model):
    #     os.remove(cwd + "/sprintr/static/3dmodels/" + model)
    if model in models:
        models.remove(model)
        return redirect(url_for("sprintr.home"))
    print("Model not found")


@bp.route("/send_gcode", methods=["POST", "GET"])
def gcode():
    gcode = request.form['command']
    print("gcode= ", gcode)
    return gcode
    # response = requests.post('http://duet3d_printer_ip/rr_gcode', data=gcode)
    # print(response)
    # return jsonify({'result' : 'success' })
    # return ÷("valetudoTest.html", gCodeCommands = gCodeCommands)

@bp.route("/home_robot", methods=["POST", "GET"])
def home_robot():
    print("home robot")
    rc.home()
    return jsonify({'result' : 'success' })

#get rc and stop robot
@bp.route("/stop_robot", methods=["POST", "GET"])
def stop_robot():
    print("stop robot")
    rc.stop()
    return jsonify({'result' : 'success' })


# test page to see if I can import and render map
@bp.route("/map", methods=["POST", "GET"])
def map():
    print("map")
    return render_template("map.html")