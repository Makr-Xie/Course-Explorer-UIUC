# backend/app.py
from flask import Flask, jsonify, request, render_template, send_from_directory
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pandas as pd
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://CSGROUP222:BAsSG1pOcss7KmN0@cluster222.vduea3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster222"
client = MongoClient(uri, server_api=ServerApi('1'))

db = client['Course_Data']  # Access the database
allCourses = db['2020-2023'] # Access to all courses
geneds = db['geneds']   # Access to GenEds

## Can't load the index page... waiting to be solved.
@app.route('/')
def index():
  return render_template("index.html")


## all courses request
@app.route('/courses', methods=['GET'])
def get_courses():
    """Find courses using subject, course_number."""
    course_subject = request.args.get('subject', None)
    course_number = request.args.get('course', None)
    page = int(request.args.get('page', 1))  
    per_page = int(request.args.get('per_page', 10))

    # Building the MongoDB query
    query = {}
    if course_subject:
        query["Subject"] = course_subject.upper()
    if course_number:    
        try:
            query["Course"] = float(course_number)
        except ValueError:
            return jsonify({"error": "Course number must be a number."}), 400

    print(query)
    courses_cursor = allCourses.find(query).skip((page - 1) * per_page).limit(per_page)
    courses_list = list(courses_cursor)
    for course in courses_list:
        course['_id'] = str(course['_id'])
    return jsonify(courses_list)


## Geneds request
@app.route('/geneds', methods=['GET'])
def get_geneds():
    """Find GenEds using subject, course_number."""
    course_subject = request.args.get('subject', None)
    course_number = request.args.get('course', None)
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    # Building the MongoDB query
    query = {}
    if course_subject:
        query["Subject"] = course_subject.upper()
    if course_number:    
        try:
            query["Course"] = float(course_number)
        except ValueError:
            return jsonify({"error": "Course number must be a number."}), 400

    courses_cursor = geneds.find(query).skip((page - 1) * per_page).limit(per_page)
    courses_list = list(courses_cursor)

    for course in courses_list:
        course['_id'] = str(course['_id'])
    return jsonify(courses_list)

@app.route('/geneds_by_category', methods=['GET'])
def get_geneds_by_category():
    """Find GenEds based on categories."""
    acp = request.args.get('ACP', None)
    cs = request.args.get('CS', None)  # US, NW, WCC
    hum = request.args.get('HUM', None)  # LA, HP
    nat = request.args.get('NAT', None)  # PS, LS
    qr = request.args.get('QR', None)  # QR1, QR2
    sbs = request.args.get('SBS', None)  # SS, BSC
    page = max(int(request.args.get('page', 1)), 1)
    per_page = max(int(request.args.get('per_page', 10)), 1)

    query = {}
    if acp: query['ACP'] = acp.upper()
    if cs: query['CS'] = cs.upper()
    if hum: query['HUM'] = hum.upper()
    if nat: query['NAT'] = nat.upper()
    if qr: query['QR'] = qr.upper()
    if sbs: query['SBS'] = sbs.upper()

    courses_cursor = geneds.find(query).skip((page - 1) * per_page).limit(per_page)
    courses_list = list(courses_cursor)

    for course in courses_list:
        course['_id'] = str(course['_id'])
    return jsonify(courses_list)

if __name__ == '__main__':
    app.run(debug=True)