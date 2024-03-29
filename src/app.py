from flask import Flask, jsonify, request, render_template, send_file
from IPython import embed
from collections import defaultdict
import json
from flask_cors import CORS
import numpy as np

app = Flask(__name__)

cors = CORS(app)

class Questions:
	def __init__(self):
		self.data = self.loadFile()
		print(self.data)
		self.flight_number = ''
		self.destination_city = ''
		self.departure = ''
		self.weather = ''
		self.actual = ''
		self.question = ''
		self.answers = []
		self.stats = self.resetStats()


	def loadFile(self):
		with open('data.json') as f:
			data = json.load(f)
		return data
	def resetStats(self):
		stats = {}
		for i in list(self.data["flight_number"].keys()):
			stats[self.data["flight_number"][i]["city"]] = {}
			for q in list(self.data["questions"].keys()):
				  stats[self.data["flight_number"][i]["city"]][q] = np.zeros(4)
		return stats

questions = Questions()

@app.route('/login')
def login():
	if len(request.args)>0:
		questions.flight_number = request.args.get('flight_number')
		questions.destination_city = questions.data['flight_number'][questions.flight_number]['city']
		questions.departure = questions.data['flight_number'][questions.flight_number]['departure']
		questions.weather = questions.data['flight_number'][questions.flight_number]['weather']
	return jsonify({'city': questions.destination_city, 'departure': questions.departure, 'weather': questions.weather})

def sendQuestion(counter):
	q = list(questions.data['questions'].keys())
	questions.actual = q[counter]
	questions.question = questions.data['questions'][questions.actual]['emojis']
	questions.answers = questions.data['questions'][questions.actual]['cities'][questions.destination_city]['answers']


@app.route('/question')
def getQuestion():
	if len(request.args)>0:
		q_number = int(request.args.get('qnumber'))
		sendQuestion(q_number)


	return jsonify({'question': questions.question, 'answers': questions.answers})

@app.route('/answer', methods=['GET', 'POST'])
def receiveAnswer():
	data = request.get_json()
	questions.stats[questions.destination_city][questions.actual][int(data['answer'])] += 1
	answer = questions.data['questions'][questions.actual]['cities'][questions.destination_city]['correct']
	return jsonify({'answer': answer})


@app.route('/stats')
def getStats():
	data = questions.stats[questions.destination_city]
	new_object = {}
	for i, d in enumerate(list(data.keys())):
		new_object[str(i)] = list(data[d])
	print(new_object)
	return jsonify(new_object)

@app.route('/reset')
def reset():
   questions.resetStats()
   return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


app.run(host='0.0.0.0', port=5000, debug=True)
