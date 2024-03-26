# backend/app.py
from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

## all courses request
@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses_df = pd.read_csv('courses.csv')
    search_query = request.args.get('search', '')

    if search_query:
        filtered_courses_df = courses_df[courses_df['Name'].str.contains(search_query, case=False, na=False)]
    else:
        filtered_courses_df = courses_df

    courses = filtered_courses_df.to_dict(orient='records')
    return jsonify(courses)

## gened request
@app.route('/api/gened', methods=['GET'])
def get_gened_courses():
    search_query = request.args.get('search', '')
    
    # courses_df = pd.read_csv('gened.csv')
    courses_df = pd.read_csv('courses.csv')
    gened_courses = courses_df[courses_df['Type'] == 'GenEd'].to_dict(orient='records')
    
    if search_query:
        filtered_courses_df = gened_courses[gened_courses['Name'].str.contains(search_query, case=False, na=False)]
    else:
        filtered_courses_df = gened_courses
    
    courses = filtered_courses_df.to_dict(orient='records')
    return jsonify(gened_courses)


if __name__ == '__main__':
    app.run(debug=True)
