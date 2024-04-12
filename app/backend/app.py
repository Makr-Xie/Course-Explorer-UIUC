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
allCourses = db['2020-2023']  # Access to all courses
geneds = db['geneds']   # Access to GenEds

# Can't load the index page... waiting to be solved.


@app.route('/')
def index():
    return render_template("index.html")


# all courses request
# Right Now it will return the first 10 courses
@app.route('/courses', methods=['GET'])
def get_courses():
    course_subject = request.args.get('course_subject', None)

    if course_subject:
        # Use a case-insensitive search to find courses matching the course name
        query = {"Subject": {"$regex": course_subject, "$options": "i"}}
    else:
        # No course name provided, no specific query
        query = {}

    courses_cursor = allCourses.find(query).limit(10)
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
@app.route('/geneds', methods=['POST'])
def get_geneds():
    data = request.get_json()  # Get JSON payload from POST request
    if not data:  # If the payload is empty, return all records
        query = {}
    else:
        query_conditions = []
        for gened_type, gened_subtype in data.items():
            if gened_subtype == "all":
                query_conditions.append({gened_type: {"$ne": ""}})
            else:
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


if __name__ == '__main__':
    app.run(debug=True)
