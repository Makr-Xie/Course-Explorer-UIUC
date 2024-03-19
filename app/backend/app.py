# backend/app.py
from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/courses', methods=['GET'])
def get_courses():
    courses_df = pd.read_csv('courses.csv')
    courses = courses_df.to_dict(orient='records')
    return jsonify(courses)

if __name__ == '__main__':
    app.run(debug=True)
