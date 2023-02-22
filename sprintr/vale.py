import requests

class RemoteControl:
    def __init__(self, robot_url:str):
        self.robot_url = robot_url
        print("self robot url", self.robot_url)
        self.manual_ctl = '/api/v2/robot/capabilities/ManualControlCapability'
        self.vale_version = "/api/v2/valetudo/version"

    def enter(self):
        r = requests.put(self.robot_url + self.manual_ctl, json={'action': 'enable'})
        print("enter", r)

    def exit(self):
        r = requests.put(self.robot_url + self.manual_ctl, json={'action': 'disable'})
        print("exit", r)

    def move(self, direction: str):
        r = requests.put(self.robot_url + self.manual_ctl, json={'action': 'move', 'movementCommand': direction})
        print(direction, r)

    def stop(self):
        r = requests.put(self.robot_url + "/api/v2/robot/capabilities/RawCommandCapability", json={'method': 'set_direction', 'args': [5]})
        print("stop", r)


    def getValetudoVersion(self):
        r = requests.get(self.robot_url + self.vale_version)
        print("Valetudo Version: " + r)

    def getMap(self):
        r = requests.get(self.robot_url + "/api/v2/robot/state/map")

    def connected(self):
        r = requests.put(self.robot_url + "/api/v2/robot/capabilities/SpeakerTestCapability", json={'action': 'play_test_sound'})
        print("connected", r)

    def home(self):
        r = requests.put(self.robot_url + "/api/v2/robot/capabilities/BasicControlCapability", json={'action': 'home'})
        print("home", r)
    
    def stop(self):
        r = requests.put(self.robot_url + "/api/v2/robot/capabilities/BasicControlCapability", json={'action': 'stop'})
        print("stop", r)

    def getMapData(self):
        print("Getting Map Data")
        r = requests.get(self.robot_url + "/api/v2/robot/state/map/")
        return r.json()
    
    def getCapabilities(self):
        print("Getting Capabilities")
        r = requests.get(self.robot_url + "/api/v2/robot/capabilities")
        print("Getting Capabilities: = ", r.json())
        return r.json()