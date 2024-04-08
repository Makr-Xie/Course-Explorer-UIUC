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
## Right Now it will return the first 10 courses
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


## Geneds request
## Right Now it will return the first 10 courses
@app.route('/geneds', methods= ['GET'])
def get_geneds():
    gened_type = request.args.get('type', None) # Major type (e.g., ACP, CS)
    gened_subtype = request.args.get('subtype', None)

    if gened_type and gened_subtype:
        # Filter by specific subtype value within the major type
        query = {gened_type: gened_subtype}
    elif gened_type:
        # Filter by any non-empty value in the major type
        query = {gened_type: {"$ne": ""}}
    else:
        # No filtering if no major type is specified
        query = {}

    courses_cursor = geneds.find(query).limit(10)
    courses_list = list(courses_cursor)

    for course in courses_list:
        course['_id'] = str(course['_id'])
    return jsonify(courses_list)


if __name__ == '__main__':
    app.run(debug=True)



