# backend/app.py
from flask import Flask, jsonify, request, render_template, send_from_directory
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pandas as pd
from flask_cors import CORS
import os
import re


app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://CSGROUP222:BAsSG1pOcss7KmN0@cluster222.vduea3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster222"
client = MongoClient(uri, server_api=ServerApi('1'))

db = client['Course_Data']  # Access the database
allCourses = db['2020-2023']  # Access to all courses
geneds = db['geneds']   # Access to GenEds

# Can't load the index page... waiting to be solved.


@app.route('/')
def index():
    return render_template("index.html")

## all courses request
@app.route('/courses', methods=['GET'])
def get_courses():
    """Find courses using subject, course_number."""
    course_input = request.args.get('course', '')
    page = int(request.args.get('page', 1))  
    per_page = int(request.args.get('per_page', 10))
    print(course_input)
    
    match = re.match(r"([a-zA-Z]+)(\d+)", course_input)
    if match:
        course_subject = match.group(1)
        try:
            course_number = float(match.group(2))
        except ValueError:
            return jsonify({"error": "Course number must be a number."}), 400
    else:
        return jsonify({"error": "Invalid course format. Use format like 'CS101'."}), 400

    # Building the MongoDB query
    query = {}
    if course_subject:
        query["Subject"] = course_subject.upper()
    if course_number:
        query["Course"] = course_number
    
    courses_cursor = allCourses.find(query).skip((page - 1) * per_page).limit(per_page)
    courses_list = list(courses_cursor)
    for course in courses_list:
        course['_id'] = str(course['_id'])
    return jsonify(courses_list)

@app.route('/course/<subject>/<course_number>', methods=['GET'])
def get_course(subject, course_number):
    course_data = allCourses.find_one({"Subject": subject.upper(), "Course": int(course_number)})
    if course_data:
        # Convert MongoDB _id to string
        course_data['_id'] = str(course_data['_id'])
        return jsonify(course_data)
    else:
        return jsonify({"error": "Course not found"}), 404


# Geneds request
# Right Now it will return the first 10 courses
@app.route('/geneds', methods= ['POST'])
def get_geneds():
    gened_queries = request.get_json().get('data', []) # Array of geneds: {type: string, subtype: string}
    
    query_conditions = []
    
    for gened in gened_queries:
        gened_type = gened.get('type', None)
        gened_subtype = gened.get('subtype', None)
        
        if gened_type:
            if gened_subtype == "all":
                # Filter by any non-empty value in the major type
                query_conditions.append({gened_type: {"$ne": ""}})
            elif gened_subtype:
                # Filter by specific subtype value within the major type
                query_conditions.append({gened_type: gened_subtype})
    
    if query_conditions:
        query = {"$and": query_conditions}
    else:
        query = {}

    courses_cursor = geneds.find(query).limit(10)
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


@app.route('/subjects/<subjectName>', methods=['GET'])
def get_subject_records(subjectName):
    # Query the database for records where the Subject field matches subjectName
    query_result = allCourses.find({"Subject": subjectName})
    # Convert query result to a list of dictionaries
    records = list(query_result)
    # Convert each MongoDB _id object to string for JSON serialization
    for record in records:
        record['_id'] = str(record['_id'])
    return jsonify(records)

@app.route('/professors', methods=['GET'])
def get_professors():
    professors_cursor = db['updated_professors'].find()
    professors_list = list(professors_cursor)
    for professor in professors_list:
        professor['_id'] = str(professor['_id'])
    return jsonify(professors_list)


if __name__ == '__main__':
    app.run(debug=True)
