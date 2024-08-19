from datetime import datetime
from celery import Celery
from flask import Blueprint, current_app, render_template, request, redirect, url_for, flash
import openai
from pyresparser import ResumeParser
import numpy as np
from numpy.core.numeric import NaN
import pandas as pd
import seaborn as sns
import matplotlib
import matplotlib.pyplot as plt
import json
import re
import time
import cv2
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from flask import Flask , render_template , request , url_for , jsonify , Response, make_response
from werkzeug.utils import redirect, secure_filename
from flask_mail import Mail , Message
from flask_mysqldb import MySQL
from pyresparser import ResumeParser
from fer import Video
from fer import FER
from .video_analysis import analyze_tone, extract_text 
from decouple import config
from flask_cors import CORS
from datetime import datetime
import pymysql
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
import pandas as pd
import json
import asyncio
from api.hr_recruiter.services.JobInfoExtraction import JobInfoExtraction
from api.hr_recruiter.services.cvinfoExtraction import cvinfoExtraction
from api.hr_recruiter.services.Rules import Rules
from api.hr_recruiter.source.schemas.matched_resume import ResumeMatchedModel
from api.hr_recruiter.source.schemas.jobextracted import JobExtractedModel
import ast
import os
import sys
import fitz
import secrets
import jwt
from datetime import datetime, timedelta
from pymysqlpool import ConnectionPool
# from .facial_recognition import perform_facial_recognition
from .Task import task
import pickle
from joblib import load
from openai import OpenAI
from transformers import pipeline
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch
import pathlib
import textwrap
import google.generativeai as genai
# Access the environment variables stored in .env file

# celery = Celery(app.name, broker='redis://localhost:6379')

MYSQL_USER = config('mysql_user')
MYSQL_PASSWORD = config('mysql_password')

# To send mail (By interviewee)
MAIL_USERNAME = config('mail_username')
MAIL_PWD = config('mail_pwd')

# For logging into the interview portal
COMPANY_MAIL = config('company_mail')
COMPANY_PSWD = config('company_pswd')
SECRET_KEY = "python_jwt"
 
# This is api key for the OPen AI API that is used for question generation 
# API_KEY = ''
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Password for your MySQL server
    'db': 'telentfussion',  # Your database name
}

# Create a connection to the MySQL database
pool = ConnectionPool(size=5, name='mypool', **db_config)
print("MySQL connection established successfully")



recruiter = Blueprint('recruiter', __name__, url_prefix='/recruiter')

 
# @recruiter.before_app_first_request
# def configure_celery():
#     celery.conf.update(recruiter.config)
    
    
# Function to get a connection from the pool
def get_connection():
    return pool.get_connection()


def close_pool(error):
    pool.close_all()
    
    
    
# ////////////////////////// Routes //////////////////////////////
# Initial sliding page
@recruiter.route('/')
def home():
    return "Hello World!"



# Initial sliding page
@recruiter.route('/submitcv', methods=['POST'])
def submitcv():
    try:
        if 'resume' in request.files:
            resume_file = request.files['resume']
            print("Reume Name is : ", resume_file.filename)
            directory_path = './Uploaded_Resumes/'
            if os.access(directory_path, os.W_OK):
               print(f"The directory '{directory_path}' has write permissions.")
            else:
               print(f"The directory '{directory_path}' does not have write permissions.")

            save_image_path = './Uploaded_Resumes/'+resume_file.filename
            resume_file.save(save_image_path)
            print("Savve image pathe is :", save_image_path)
            doc = fitz.open(save_image_path)
            text = ""
            for page_num in range(doc.page_count):
                page = doc.load_page(page_num)
                text += page.get_text()

            tx = " ".join(text.split('\n'))
            cleaned_tx = re.sub(r'[^A-Za-z0-9\s]', '', tx).lower()
            print(cleaned_tx)
            resume = pd.DataFrame({'parsedData': [cleaned_tx]})
            resume[['parsedData']]
            
            # For Specific Degree fetching
            # degrees_patterns_path = 'Resources/data/specifydegree.jsonl'

            degrees_patterns_path = 'api/hr_recruiter/Resources/data/degrees.jsonl'
            majors_patterns_path = 'api/hr_recruiter/Resources/data/majors.jsonl'
            skills_patterns_path = 'api/hr_recruiter/Resources/data/skills.jsonl'

            resume = resume[['parsedData']]
            resume_extraction = cvinfoExtraction(skills_patterns_path, majors_patterns_path,             degrees_patterns_path, resume)
            resume = resume_extraction.extract_entities(resume)
            for i, row in resume.iterrows():
                minimum_degree_level = resume['Minimum degree level'][i]
                acceptable_majors = resume['Acceptable majors'][i]
                skills = resume['Skills'][i]

                job_extracted = JobExtractedModel(minimum_degree_level=minimum_degree_level             if minimum_degree_level else '',acceptable_majors=acceptable_majors if             acceptable_majors else [], skills=skills if skills else [])
                # Print or process the extracted data
                print("Degree Level: ", minimum_degree_level)
                print("Acceptable Majors: " ,acceptable_majors)
                print("Skills: ",skills)
                print(resume_extraction)
            resume_data = ResumeParser(save_image_path).get_extracted_data()
            print("Resume name", resume_data['name'])
            print("Resume Email", resume_data['email'])
   
            resume.head()
           
            if get_connection():
                with get_connection() as connection:
                   cursor = connection.cursor()
                   cursor.execute("INSERT INTO `extract_cv` VALUES (NULL,%s,%s,%s,%s,%s)",(resume_data['name'],resume_data['email'], str(skills), str(minimum_degree_level), str(acceptable_majors)))
                   connection.commit()

                return jsonify({'message': 'Your application are posted successfully'}), 201
            else:
                return jsonify({'error': 'Failed to establish a database connection'}), 500
        else:
            return jsonify({'error': 'Failed to Fetch Resume'}), 500
    except Exception as e:
        print(f"Error occurred: {str(e)}")


def transform_dataframe_to_json(dataframe):

    # transforms the dataframe into json
    result = dataframe.to_json(orient="records")
    parsed = json.loads(result)
    json_data = json.dumps(parsed, indent=4)

    return json_data



@recruiter.route("/extraction", methods=['GET'])
def extraction():
    try:
        with get_connection().cursor() as cursor:
           sql = "SELECT * FROM jobs"
           cursor.execute(sql)
           jd = cursor.fetchall()
           print(jd)
    except Exception as e:
        print("Error fetching user data:", str(e))
    
    jobs = pd.DataFrame(jd, columns=['ID', 'Job Title', 'Job description', 'Salary', 'Job Location', 'pub_at'])

    jobs = jobs.drop(columns=['ID', 'Salary', 'Job Location', 'pub_at'])
    print(jobs)
    
    degrees_patterns_path = 'api/hr_recruiter/Resources/data/degrees.jsonl'
    majors_patterns_path = 'api/hr_recruiter/Resources/data/majors.jsonl'
    skills_patterns_path = 'api/hr_recruiter/Resources/data/skills.jsonl'

    jobs = jobs[['Job Title', 'Job description']]
    
    job_extraction = JobInfoExtraction(skills_patterns_path, majors_patterns_path, degrees_patterns_path, jobs)
    jobs = job_extraction.extract_entities(jobs)
    for i, row in jobs.iterrows():
        
        job_title = row['Job Title']
        minimum_degree_level = jobs['Minimum degree level'][i]
        acceptable_majors = jobs['Acceptable majors'][i]
        skills = jobs['Skills'][i]

        job_extracted = JobExtractedModel(job_title=job_title,minimum_degree_level=minimum_degree_level     if minimum_degree_level else '',acceptable_majors=acceptable_majors if acceptable_majors else [], skills=skills if skills else [])
        # Print or process the extracted data
        print("Job Title: ", job_title)
        print("Job Description: ",row['Job description'])
        print("Minimum Degree Level: ", minimum_degree_level)
        print("Acceptable Majors: " ,acceptable_majors)
        print("Skills: ",skills)
        print(job_extracted)
        job_description = row['Job description']
        acceptable_majors_str = ', '.join(map(str, acceptable_majors))
        skills_str = ', '.join(map(str, skills))

        if get_connection():
            cursor =  get_connection().cursor()

            # Raw SQL query to insert a new job record
            cursor.execute("INSERT INTO extractjobs VALUES (NULL, %s, %s, %s, %s, %s)", (job_title, job_description, minimum_degree_level, acceptable_majors_str, skills_str))
            get_connection().commit()

            jobs_json = transform_dataframe_to_json(jobs)
            return jobs_json
        else:
            return jsonify({'error': 'Failed to establish a database connection'}), 500
        
    jobs_json = transform_dataframe_to_json(jobs)
    return jobs_json



def transform_dataframe_to_json(dataframe):

    # transforms the dataframe into json
    result = dataframe.to_json(orient="records")
    parsed = json.loads(result)
    json_data = json.dumps(parsed, indent=4)

    return json_data


def get_extracted_resumes():
    jd = [] 
    try:
        with get_connection().cursor() as cursor:
            sql = "SELECT * FROM extract_cv"
            cursor.execute(sql)
            jd = cursor.fetchall()
            print(jd)
    except Exception as e:
        print("Error fetching user data:", str(e))
           
    # Clean the Null cells from the data 
    # Assuming 'resumes_cleaned' is your DataFrame
    resumes_cleaned = pd.DataFrame(jd, columns=['ID', 'name', 'email', 'skills', 'degree_level', 'majors'])
    resumes = resumes_cleaned.dropna(subset=['skills', 'majors', 'degree_level'], how='all')

    # Creating python String literal ast 
    resumes = resumes[resumes['majors'].astype(str) != '[]']
    resumes['degree_level'] = resumes['degree_level'].apply(lambda x: [str(x)])
    resumes['degree_level'] = resumes['degree_level'].apply(str)
    
    
    for i in range(len(resumes['skills'])):
        try:
            ast.literal_eval(resumes['skills'].iloc[i])
        except (ValueError, SyntaxError):
            if resumes['skills'].iloc[i][-1] == "'":
                resumes['skills'].iloc[i] += "]"
            else:
                resumes['skills'].iloc[i] += "']"

    print(resumes)
    
    return resumes


def get_extracted_jobs():
    jd = [] 
    try:
        with get_connection().cursor() as cursor:
            sql = "SELECT * FROM extractjobs"
            cursor.execute(sql)
            jd = cursor.fetchall()
            print(jd)
    except Exception as e:
        print("Error fetching user data:", str(e))
        
    jobs = pd.DataFrame(jd, columns=['ID', 'Job Title', 'Job description', 'Minimum degree level', 'acceptable majors', 'Skills'])
  
    # Enclosed in braces
    jobs['acceptable majors'] = jobs['acceptable majors'].apply(lambda x: [str(x)])
    jobs['Skills'] = jobs['Skills'].apply(lambda x: [str(x)])

    # Now, convert the entire column into string literals
    jobs['acceptable majors'] = jobs['acceptable majors'].apply(str)
    jobs['Skills'] = jobs['Skills'].apply(str)
    # Display the updated DataFrame
    jobs.head()
    return jobs

   

def modifying_type_resume(resumes):
    for i in range(len(resumes["degree_level"])):
        resumes["degree_level"].iloc[i] = ast.literal_eval(resumes["degree_level"].iloc[i])
    for i in range(len(resumes["skills"])):
        resumes["skills"].iloc[i] = ast.literal_eval(resumes["skills"].iloc[i])
    return resumes


def modifying_type_job(jobs):
    for i in range(len(jobs["Skills"])):
        jobs["Skills"][i] = ast.literal_eval(jobs["Skills"][i])
    return jobs


def insert_matched_resume(id_resume, job_index, degree_matching, major_matching, skills_semantic_matching, matching_score):
    try:
        with get_connection() as connection:
            cursor = connection.cursor()
            # Check if records exist for the given id_resume and job_index
            check_sql = "SELECT COUNT(*) FROM `matchedresume` WHERE id_resume = %s AND job_index = %s"
            cursor.execute(check_sql, (id_resume, job_index))
            result = cursor.fetchone()
            record_count = result[0]

            if record_count > 0:
                # Delete existing records for the given id_resume and job_index
                delete_sql = "DELETE FROM `matchedresume` WHERE id_resume = %s AND job_index = %s"
                cursor.execute(delete_sql, (id_resume, job_index))

            # Insert the new record
            insert_sql = "INSERT INTO `matchedresume` VALUES (NULL, %s, %s, %s, %s, %s, %s)"
           
            cursor.execute(insert_sql, (id_resume, job_index, degree_matching, major_matching, skills_semantic_matching, matching_score))
            connection.commit()
            
    except Exception as e:
        # Handle the exception (log, raise, or return an error response)
        print(f"Error inserting matched resume: {str(e)}")

    


@recruiter.route("/matching", methods=['GET'])
def matching():
    with open('api/hr_recruiter/Resources/data/labels.json') as fp:
        labels = json.load(fp)
    # Extract and cleaning data 
    resumes = get_extracted_resumes()
    jobs = get_extracted_jobs()
    print("resumes are: ", resumes)
    resumes = modifying_type_resume(resumes)
    jobs = modifying_type_job(jobs)
    rules = Rules(labels, resumes, jobs)
    job_indexes = [0]
    resumes_matched_jobs = pd.DataFrame()
    for job_index in job_indexes:
        resumes_matched = rules.matching_score(resumes, jobs, job_index)
        resumes_matched_jobs = resumes_matched_jobs.append(resumes_matched)

        # adding matched resumes to database
        for i, row in resumes_matched.iterrows():
            id_resume = int(resumes_matched['ID'][i])
            degree_matching = float(resumes_matched['Degree job ' + str(job_index) + ' matching'][i])
            major_matching = float(resumes_matched['Major job ' + str(job_index) + ' matching'][i])
            skills_semantic_matching = float(resumes_matched['Skills job ' + str(job_index) + ' semantic matching'][i])
            matching_score = float(resumes_matched['matching score job ' + str(job_index)][i])
            # Saving to database  
            matched_resume = insert_matched_resume(id_resume=int(id_resume) if id_resume else '',job_index=int(job_index) if job_index else 0,degree_matching=degree_matching if degree_matching else 0,major_matching=major_matching if major_matching else 0,
skills_semantic_matching=skills_semantic_matching if skills_semantic_matching else 0,matching_score=matching_score if matching_score else 0)
        print("matched resume saved successfully")
            
    resumes_matched_json = transform_dataframe_to_json(resumes_matched_jobs)
   
    return resumes_matched_json

@recruiter.route("/top_resumes", methods=['GET'])
def top_resumes():
    try:
        with get_connection() as connection:
            cursor = connection.cursor()
            # Check if records exist in shortlist_candidates
            check_records_sql = "SELECT COUNT(*) FROM `shortlist_candidates`"
            cursor.execute(check_records_sql)
            records_count = cursor.fetchone()[0]

            if records_count > 0:
                # Records exist, delete all records
                delete_all_sql = "DELETE FROM `shortlist_candidates`"
                cursor.execute(delete_all_sql)

            # Fetch top resumes
            query = """
                SELECT
                    ecv.ID,
                    ecv.name,
                    ecv.email,
                    ecv.skills,
                    ecv.degree,
                    ecv.majors,
                    ej.job_title AS matched_job_title,
                    ej.ID AS job_id  -- Fetch the job ID as well
                FROM
                    extract_cv ecv
                JOIN
                    matchedresume mr ON ecv.ID = mr.id_resume
                JOIN
                    extractjobs ej ON mr.job_index = ej.ID
                ORDER BY
                    mr.matching_score DESC
                LIMIT 3;
            """
            cursor.execute(query)
            result = cursor.fetchall()

            # Insert new records into shortlist_candidates
            if result:
                insert_sql = """
                INSERT INTO `shortlist_candidates` (name, email, skills, degree, majors, job_title, job_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                for row in result:
                    cursor.execute(insert_sql, (str(row[1]), str(row[2]), str(row[3]), str(row[4]), str(row[5]), str(row[6]), row[7]))

            connection.commit()

            top_resumes_matched = pd.DataFrame(result, columns=['ID', 'Name', 'Email', 'Skills', 'Degree_level', 'Majors', 'Job_title', 'Job_id'])
            top_resumes_json = transform_dataframe_to_json(top_resumes_matched)

            # Return the JSON response
            return jsonable_encoder(top_resumes_json)

    except Exception as e:
        # Handle the exception (log, raise, or return an error response)
        print(f"Error fetching top resumes: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500




@recruiter.route("/extractcv", methods=['GET'])
def extractcv():
    jd = [] 
    try:
        with get_connection().cursor() as cursor:
            sql = "SELECT * FROM extract_cv"
            cursor.execute(sql)
            result = cursor.fetchall()
            
    
        resumes = pd.DataFrame(result , columns=['ID', 'name', 'email', 'skills', 'degree_level', 'majors'])
        resumes_json = transform_dataframe_to_json( resumes )
        resume_list = jsonable_encoder(resumes_json)
        return  resume_list 
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@recruiter.route("/extractJob", methods=['GET'])
def getJob():
    jd = [] 
    try:
        with get_connection().cursor() as cursor:
            sql = "SELECT * FROM jobs"
            cursor.execute(sql)
            result = cursor.fetchall()
            
        resumes = pd.DataFrame(result , columns=['job_id', 'job_title', 'job_description', 'job_salary', 'job-location', 'timestamp'])
        resumes_json = transform_dataframe_to_json( resumes )
        resume_list = jsonable_encoder(resumes_json)
        return  resume_list 
    except Exception as e:
        return jsonify({'error': str(e)}), 500

        
    
        

# //////////////////////////////// Job Post /////////////////////
@recruiter.route('/post_job', methods=['POST'])
def post_job():
    try:
        # Get data from the request
        job_data = request.json
        print("Data is fetched:", job_data)

        # Extract data from the request
        job_title = job_data.get('jobTitle')
        description = job_data.get('description')
        salary = job_data.get('salary')
        location = job_data.get('venue')
        formatted_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        

        # Ensure a valid database connection
        if get_connection():
            with get_connection() as connection:
                cursor = connection.cursor()
                
                cursor.execute("DELETE FROM jobs")
                
                cursor.execute("INSERT INTO jobs VALUES (NULL, %s, %s, %s, %s, %s)", (job_title, description, salary, location, formatted_date))
                connection.commit()
                
                # Return success response
                return jsonify({'message': 'Job posted successfully'}), 201
        else:
            return jsonify({'error': 'Failed to establish a database connection'}), 500

    except Exception as e:
        # Handle exceptions and return an error response
        return jsonify({'error': str(e)}), 500
    
    
# ------------------------------- AI INterview Section starts ----------------
# -----------------------------------------------------------------------------
    
# Get Shotlisted candidates 
@recruiter.route('/shortlisted_candidates' , methods=['GET'])
def get_shortlisted_cadidates():
    jd = [] 
    try:
        with get_connection().cursor() as cursor:
            sql = "SELECT * FROM shortlist_candidates"
            cursor.execute(sql)
            result = cursor.fetchall()
            
        shortlist_candidates = pd.DataFrame(result , columns=['ID', 'name', 'email', 'skills', 'degree','majors','job_title', 'job_id'])
        print("shortlist candidates are: ", shortlist_candidates )
        shortlist_json = transform_dataframe_to_json( shortlist_candidates )
        shortlist_list = jsonable_encoder(shortlist_json)
        return  shortlist_list 
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        
        
    
# Get Company Details 
@recruiter.route('/get_company' , methods=['GET'])
def get_company():
    jd = [] 
    try:
        with get_connection().cursor() as cursor:
            sql = "SELECT * FROM company"
            cursor.execute(sql)
            result = cursor.fetchall()
            
        company_profile = pd.DataFrame(result , columns=['ID', 'name', 'email' , 'password'])
        company_json = transform_dataframe_to_json( company_profile )
        company_list = jsonable_encoder(company_json)
        return  company_list 
    except Exception as e:
        return jsonify({'error': str(e)}), 500


        
        
# Comapany signup 
@recruiter.route('/signup' , methods=['POST' , 'GET'])
def interviewee():
    
    if request.method == 'POST' and 'name' in request.json and 'email' in request.json and 'password' in request.json:
        data = request.json 
        username = data.get('name')
        usermail = data.get('email')
        userpassword = data.get('password')
        
        try: 
            with get_connection() as connection:
                cursor = connection.cursor()

                cursor.execute("SELECT * FROM company WHERE company_name = %s AND company_email = %s", (username, usermail))
                account = cursor.fetchone()

                if account:
                    err = "Account Already Exists"
                    return jsonify({'status': 'error', 'message': err })
                elif not re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', usermail):
                    err = "Invalid Email Address !!"
                    return jsonify({'status': 'error', 'message': err })
                elif not re.fullmatch(r'[A-Za-z0-9\s]+', username):
                    err = "Username must contain only characters and numbers !!"
                    return jsonify({'status': 'error', 'message': err })
                elif not username or not userpassword or not usermail:
                    err = "Please fill out all the fields"
                    return jsonify({'status': 'error', 'message': err })
                else:
                    cursor.execute("INSERT INTO company VALUES (NULL,%s,%s, %s)" , (username, usermail, userpassword,))
                    connection.commit()
                    return jsonify({'status': 'ok', 'message':'You have successfully registered !!' })
        
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'status': 'error', 'message':'Database Connection Failed' })
            
    else:
        return jsonify({'status': 'error', 'message': 'Invalid request'})



# Company Sigin 
@recruiter.route('/company_signin', methods=['POST'])
def company_signin():
    if request.method == 'POST':
        data = request.json 
        email = data.get('email')
        password = data.get('password')

        try: 
            with get_connection().cursor() as cursor:
                cursor.execute("SELECT * FROM company WHERE company_email = %s AND company_password = %s", (email, password))
                company = cursor.fetchone()
                
            print("Company is:", company)
            expiration_time = datetime.utcnow() + timedelta(hours=1)

            if company:
                json_data = {
                    "user_type": "recruiter",
                    "Company_name": company[1],
                    "Company_email": email, 
                    "message": "JWT is awesome. You should try it!",
                    "date": str(datetime.now()),
                    "exp": expiration_time
                }
                
                token = jwt.encode(payload=json_data, key=SECRET_KEY, algorithm="HS256")

                # Include the token in the response JSON
                response_data = {'status': 'ok', 'token': token}
                response = jsonify(response_data)

                return response
            else:
                response = jsonify({'status': 'error', 'message': 'Incorrect Credentials'})
                return response
        except Exception as e:
            print(f"Error: {e}")
            response = jsonify({'status': 'error', 'message': 'Internal Server Error'})
            return response
    else:
        response = jsonify({'status': 'error', 'message': 'Invalid request method'})
        return response
    

# Interviewer signin 
@recruiter.route('/signin' , methods=['POST'])
def interviewer():
    if request.method == 'POST':
        data = request.json 
        email = data.get('email')
        password = data.get('password')
 
        try: 
            with get_connection().cursor() as cursor:
            
                cursor.execute("SELECT * FROM candidate_interview WHERE email = %s AND password = %s", (email, password))

                candidate = cursor.fetchone()
         
            print("candidate is: ", candidate)
            
            expiration_time = datetime.utcnow() + timedelta(hours=3)

            if candidate:
                json_data = {
                    "user_type": "interviewer",
                    "user_id": candidate[0],
                    "email": email,
                    "message": "Login successful",
                    "date": str(datetime.now()),
                    "exp": expiration_time
                }
                token = jwt.encode(payload=json_data, key=SECRET_KEY, algorithm="HS256")
                response = {'status': 'ok', 'token': token}
               
            else:
                response = {'status': 'error', 'message': 'Incorrect Credentials'}

            return jsonify(response)

        except Exception as e:
            print(f"Error: {e}")
      
    else:
        return jsonify({'status': 'error', 'message': 'Invalid request'})


USER_FILES_PATH = './static/user_files/'

# Check if the directory exists, if not, create it
os.makedirs(USER_FILES_PATH, exist_ok=True)
# personality trait prediction using Logistic Regression and parsing resume
@recruiter.route('/prediction' , methods = ['GET' , 'POST'])
def predict():
    if request.method == 'POST':
        try:
           user_id = request.form['user_id']
           user_folder_path = os.path.join(USER_FILES_PATH, str(user_id))
           
           os.makedirs(user_folder_path, exist_ok=True)
           
           print("user folder path is : ", user_folder_path)

           fname = request.form['firstName'].capitalize()
           lname = request.form['lastName'].capitalize()
           age = int(request.form['age'])
           gender = request.form['gender']
           email = request.form['email']
           file = request.files['resume']
           
           path = os.path.join(user_folder_path, file.filename)
           file.save(path)
    
        #    path = './static/user_files/{}'.format(file.filename)
        #    file.save(path)
           val1 = float(request.form['openness'])
           val2 = float(request.form['neuroticism'])
           val3 = float(request.form['conscientiousness'])
           val4 = float(request.form['agreeableness'])
           val5 = float(request.form['extraversion'])
        
           print("Details are : ",fname , lname ,age,gender,email, file ,path ,val1,val2 , val3 , val4 , val5 , user_id )
 
        
            # model prediction
           df = pd.read_csv(r'static\trainDataset.csv')
           le = LabelEncoder()
           df['Gender'] = le.fit_transform(df['Gender'])
           x_train = df.iloc[:, :-1].to_numpy()
           y_train = df.iloc[:, -1].to_numpy(dtype=str)
           lreg = LogisticRegression(multi_class='multinomial', solver='newton-cg', max_iter=1000)
           lreg.fit(x_train, y_train)

           if gender == 'male':
               gender = 1
           elif gender == 'female':
               gender = 0
           input_data = [gender, age, val1, val2, val3, val4, val5]

           pred = str(lreg.predict([input_data])[0]).capitalize()

           # get data from the resume
           data = ResumeParser(path).get_extracted_data()

           result = {
               'Name': fname + ' ' + lname,
               'Age': age,
               'Email': email,
               'Mobile Number': data.get('mobile_number', None),
               'Skills': str(data['skills']).replace("[", "").replace("]", "").replace("'", ""),
               'Degree': data['degree'][0] if data.get('degree') and isinstance(data['degree'], list) else None,
               'Designation': data['designation'][0] if data.get('designation') and isinstance(data['designation'], list) else None,
                'Total Experience': data.get('total_experience'),
                'Predicted Personality': pred
             }
           
           result_filename = f'{user_id}_result.json'
           result_filepath = os.path.join(user_folder_path, result_filename)
           with open(result_filepath, 'w') as result_file:
              json.dump(result, result_file)

           response_data = {
                'success': True,
                'message': 'Prediction successful',
                # You can include additional data if needed
                'data': {
                    'Name': fname + ' ' + lname,
                    'Age': age,
                    'Email': email,
                    'Mobile Number': data.get('mobile_number', None),
                    'Skills': str(data['skills']).replace("[", "").replace("]", "").replace("'", ""),
                    'Degree': data['degree'][0] if data.get('degree') and isinstance(data['degree'], list) else None,
                    'Designation': data['designation'][0] if data.get('designation') and isinstance(data['designation'], list) else None,
                    'Total Experience': data.get('total_experience'),
                    'Predicted Personality': pred
                }
            }   
           return jsonify(response_data)   
        
        except Exception as e:
            error_message = str(e)
            print(error_message)
            response_data = {'success': False, 'message': f'Error: {error_message}'}
            return jsonify(response_data)
        
    return jsonify({'success': False, 'message': 'Invalid method'})




# Record candidate's interview for face emotion and tone analysis
@recruiter.route('/analysis', methods = ['POST'])
def video_analysis_endpoint():
    user_id = request.form['user_id']
    user_folder_path = os.path.join(USER_FILES_PATH, str(user_id))
    
    os.makedirs(user_folder_path, exist_ok=True)
    print("user folder path is: ", user_folder_path)

    
    questions = json.loads(request.form['questions'])
    print(questions)
    video_paths = []
    for i, question in enumerate(questions, start=1):
        question_data = request.files.get(f'question{i}')
        if question_data:
            question_path = os.path.join(user_folder_path, f'question{i}.webm')
            question_data.save(question_path)
            video_paths.append(question_path)
            print(video_paths)
    
    result_filename = f'{user_id}_answers.json'
    result_filepath = os.path.join(user_folder_path, result_filename)
    questions_dict = {question: [] for question in questions}
    with open(result_filepath, 'w', encoding='utf-8') as f:
        json.dump(questions_dict, f)
    
    # Enqueue the video analysis task
    uuid = task.delay(user_id, user_folder_path, *video_paths, questions=questions)
   
    # print(uuid)
   
    response_data = {'success': True, 'message': "Saved successfully"}

    return jsonify(response_data)




# Interview completed response message
@recruiter.route('/recorded')
def response():
    return render_template('recorded.html')


# Display results to interviewee
@recruiter.route('/info')
def info():
    with open('./static/result.json' , 'r') as file:
        output = json.load(file)

    with open('./static/answers.json' , 'r') as file:
        answers = json.load(file)

    return render_template('result.html' , output = output , responses = answers)



def create_candidate_interview_table():

    cursor =  get_connection().cursor()

    cursor.execute("SHOW TABLES LIKE 'candidate_interview'")
    table_exists = cursor.fetchone()

    if not table_exists:
        # Create the table if it doesn't exist
        create_table_query = """
        CREATE TABLE candidate_interview (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
        )
        """
        cursor.execute(create_table_query)
        get_connection().commit()

    return get_connection()

def signup_candidate(name, email):
    # Generate a random password
    password = secrets.token_urlsafe(10)
    
    # Insert candidate details into the table
    print("before storing in database", name, email, password)
    if get_connection():
       cursor =  get_connection().cursor()
       cursor.execute("INSERT INTO `candidateinterview`(`id`, `name`, `email`, `password`) VALUES (NULL,%s,%s,%s)", (name, email, password))
       get_connection().commit()
       return email, password
    else:
       return "not saved"

    

@recruiter.route('/accept', methods=['POST'])
def accept():
    data = request.get_json()
    mail = current_app.extensions['mail']
    name = data['name']
    email = data['email']
    position = data['job_id']

    # Create the candidate_interview table and signup the candidate
    # connection = create_candidate_interview_table()
    # email, password = signup_candidate(name, email)
    password = secrets.token_urlsafe(10)
    
    
    print("before storing in database", name, email, password)
    
    if get_connection():
        try:
            with get_connection() as connection:
               cursor = connection.cursor()
               cursor.execute("INSERT INTO candidate_interview VALUES (NULL, %s, %s, %s)", (name, email, password))
               connection.commit()

        
            # Send job confirmation mail
            msg = Message('Job Confirmation Letter', sender=MAIL_USERNAME, recipients=[email])
            msg.body = f"Dear {name},\n\n" \
                       f"We hope this message finds you well. On behalf of the Talent Fusion team, I am pleased to inform you that you have been selected for the {position} position.\n\n" \
                       f"At Talent Fusion, we were impressed with your skills and experience, and we believe that you will be a valuable addition to our organization.\n\n" \
                       f"The next step in our hiring process is to invite you for a remote interview. Our outstanding hiring technology ensures a seamless and efficient interview process for candidates.\n\n" \
                       f"You can schedule your interview at any convenient time using the following details:\n" \
                       f"Interview Link: http://localhost:3000/Interview/login \n" \
                       f"Username: {email}\n" \
                       f"Password: {password}\n\n" \
                       f"We look forward to discussing your qualifications further and getting to know you better during the interview. If you have any questions or concerns, feel free to reach out.\n\n" \
                       f"Thank you for considering a career with Talent Fusion. We are excited about the possibility of having you on our team.\n\n" \
                       f"Best Regards,\n" \
                       f"[Your Full Name]\n" \
                       f"[Your Position]\n" \
                       f"Talent Fusion\n" \
                       f"Email: [Your Email]\n" \
                       f"Phone: [Your Phone Number]"

            mail.send(msg)

            return jsonify({'email': email, 'password': password, 'message': 'success'})
        
        except Exception as e:
            print("Error:", e)
            return jsonify({'message': 'error'})
        
    

    # Send job confirmation mail
    msg = Message('Job Confirmation Letter', sender=MAIL_USERNAME, recipients=[email])
    msg.body = f"Dear {name},\n\n" \
               f"We hope this message finds you well. On behalf of the Talent Fusion team, I am pleased to inform you that you have been selected for the {position} position.\n\n" \
               f"At Talent Fusion, we were impressed with your skills and experience, and we believe that you will be a valuable addition to our organization.\n\n" \
               f"The next step in our hiring process is to invite you for a remote interview. Our outstanding hiring technology ensures a seamless and efficient interview process for candidates.\n\n" \
               f"You can schedule your interview at any convenient time using the following details:\n" \
               f"Interview Link: http://localhost:3000/Interview/login \n" \
               f"Username: {email}\n" \
               f"Password: {password}\n\n" \
               f"We look forward to discussing your qualifications further and getting to know you better during the interview. If you have any questions or concerns, feel free to reach out.\n\n" \
               f"Thank you for considering a career with Talent Fusion. We are excited about the possibility of having you on our team.\n\n" \
               f"Best Regards,\n" \
               f"[Your Full Name]\n" \
               f"[Your Position]\n" \
               f"Talent Fusion\n" \
               f"Email: [Your Email]\n" \
               f"Phone: [Your Phone Number]"
               

    mail.send(msg)

    return jsonify({'email': email, 'password': password, 'message': 'success'})


# Send mail to rejected candidate
@recruiter.route('/reject' , methods=['POST'])
def reject():
    
    data = request.get_json()
   
    mail = current_app.extensions['mail']
    
    name = data['name']
    email = data['email']
    position = data['job_id']

    msg = Message(f'Your application to Smart Hire', sender = MAIL_USERNAME, recipients = [email])
    msg.body = f"Dear {name},\n\n" + f"Thank you for taking the time to consider Telent Fussion. We wanted to let you know that we have chosen to move forward with a different candidate for the {position} position.\n\n"+ f"Our team was impressed by your skills and accomplishments. We think you could be a good fit for other future openings and will reach out again if we find a good match.\n\n"+ f"We wish you all the best in your job search and future professional endeavors.\n\n"+ f"Regards,\n\n"+ f"Harsh Verma\nHuman Resources Director\nPhone: 555-555-1234\nEmail: feedbackmonitor123@gmail.com"
    mail.send(msg)

    return "success"




@recruiter.route('/getUserData', methods=['GET'])
def get_user_data():
    userID = request.args.get('id')
    print("user is: ", userID)
    basePath = os.path.join(os.getcwd(), f'static/user_files/{userID}')
    user_folder_path = os.path.join(USER_FILES_PATH, str(userID))
    print("user folder path is: ", user_folder_path)

    try:
        result_filename = f'{userID}_answers.json'
        answerFilePath = os.path.join(user_folder_path, result_filename)
        with open(answerFilePath, 'r') as answerFile:
            answerJsonData = json.load(answerFile)

        # Read other information
        resultFilePath = os.path.join(basePath, f'{userID}_result.json')
        with open(resultFilePath, 'r') as resultFile:
            resultJsonData = json.load(resultFile)

        # Construct image URLs
        toneAnalysisImageURL = f'/user_files/{userID}/{userID}_tone_analysis.jpg'
        ferOutputImageURL = f'/user_files/{userID}/fer_output.png'
        
        # Add video file name to each question in the answers data
        for index, (question, answer) in enumerate(answerJsonData.items(), start=1):
            video_file_name = f'question{index}.webm'
            answerJsonData[question].append(video_file_name)

        # Send all the data in the response
        response_data = {
            'questionsAndAnswers': answerJsonData,
            'userInfo': resultJsonData,
            'toneAnalysisImage': toneAnalysisImageURL,
            'ferOutputImage': ferOutputImageURL
        }
        return jsonify(response_data), 200
    except Exception as e:
        print('Error reading files:', e)
        return jsonify({'error': 'Internal server error'}), 500


@recruiter.route("/check_evaluation_data", methods=["POST"])
def check_evaluation_data():
    data = request.get_json()
    candidate_id = data.get("candidate_id")
    print("candidate id :",candidate_id)
    if candidate_id is None:
        return jsonify({"error": "Candidate ID is missing"}), 400

    # Check if the folder for the candidate exists
    candidate_folder_path = os.path.join("static/user_files/", f"{candidate_id}")
    print("candidate folder pathe is: ",candidate_folder_path)
    if not os.path.exists(candidate_folder_path):
        return jsonify({"error": "Candidate folder does not exist"}), 404

    return jsonify({"evaluation_data_ready": candidate_folder_path})


# ---------------------Attriton API ------------------
model = pickle.load(open ('attrition_model.pkl','rb'))
@recruiter.route ('/predict',methods=['POST','GET'])
def predict_attritiom():
    
    """
    For rendering results on HTML GUI
    """
    
    json_data = request.get_json()
    
    Age = json_data.get("Age")
    BusinessTravel = json_data.get("BusinessTravel")
    DailyRate = json_data.get("DailyRate")
    Department = json_data.get("Department")
    DistanceFromHome = json_data.get("DistanceFromHome")
    Education = json_data.get("Education")
    EducationField = json_data.get("EducationField")
    EnvironmentSatisfaction = json_data.get("EnvironmentSatisfaction")
    Gender = json_data.get("Gender")
    HourlyRate = json_data.get("HourlyRate")
    JobInvolvement = json_data.get("JobInvolvement")
    JobLevel = json_data.get("JobLevel")
    JobRole = json_data.get("JobRole")
    JobSatisfaction = json_data.get("JobSatisfaction")
    MaritalStatus = json_data.get("MaritalStatus")
    MonthlyIncome = json_data.get("MonthlyIncome")
    NumCompaniesWorked = json_data.get("NumCompaniesWorked")
    OverTime = json_data.get("OverTime")
    PerformanceRating = json_data.get("PerformanceRating")
    RelationshipSatisfaction = json_data.get("RelationshipSatisfaction")
    StockOptionLevel = json_data.get("StockOptionLevel")
    TotalWorkingYears = json_data.get("TotalWorkingYears")
    TrainingTimesLastYear = json_data.get("TrainingTimesLastYear")
    WorkLifeBalance = json_data.get("WorkLifeBalance")
    YearsAtCompany = json_data.get("YearsAtCompany")
    YearsInCurrentRole = json_data.get("YearsInCurrentRole")
    YearsSinceLastPromotion = json_data.get("YearsSinceLastPromotion")
    YearsWithCurrManager = json_data.get("YearsWithCurrManager")
    
    json_data['Age'] = int(json_data['Age'])
    json_data['DailyRate'] = int(json_data['DailyRate'])
    json_data['DistanceFromHome'] = int(json_data['DistanceFromHome'])
    json_data['HourlyRate'] = int(json_data['HourlyRate'])
    json_data['MonthlyIncome'] = int(json_data['MonthlyIncome'])
    json_data['EnvironmentSatisfaction'] = int(json_data['EnvironmentSatisfaction'])
    json_data['JobInvolvement'] = int(json_data['JobInvolvement'])
    json_data['JobLevel'] = int(json_data['JobLevel'])
    json_data['JobSatisfaction'] = int(json_data['JobSatisfaction'])
    json_data['PerformanceRating'] = int(json_data['PerformanceRating'])
    json_data['RelationshipSatisfaction'] =       int(json_data['RelationshipSatisfaction'])
    json_data['TotalWorkingYears'] = int(json_data['TotalWorkingYears'])
    json_data['WorkLifeBalance'] = int(json_data['WorkLifeBalance'])
    json_data['YearsAtCompany'] = int(json_data['YearsAtCompany'])
    json_data['YearsInCurrentRole'] = int(json_data['YearsInCurrentRole'])
    json_data['YearsSinceLastPromotion'] = int(json_data['YearsSinceLastPromotion'])
    json_data['YearsWithCurrManager'] = int(json_data['YearsWithCurrManager'])
    json_data['NumCompaniesWorked'] = int(json_data['NumCompaniesWorked'])

    print("JSON data received:", json_data)

     # Create DataFrame from JSON data
    df = pd.DataFrame([json_data])
    print("df is ", df)

    df['Total_Satisfaction'] = (df['EnvironmentSatisfaction'] +
df['JobInvolvement'] + df['JobSatisfaction'] + df['RelationshipSatisfaction'] +  df['WorkLifeBalance']) / 5

    # Drop Columns
    df.drop (
['EnvironmentSatisfaction','JobInvolvement','JobSatisfaction','RelationshipSatisfaction','WorkLifeBalance'],
        axis=1,inplace=True)

    # Convert Total satisfaction into boolean
    df['Total_Satisfaction_bool'] = df['Total_Satisfaction'].apply (lambda x: 1 if x >= 2.8 else 0)
    df.drop ('Total_Satisfaction',axis=1,inplace=True)

    # It can be observed that the rate of attrition of employees below age of 35 is high
    df['Age_bool'] = df['Age'].apply (lambda x: 1 if x < 35 else 0)
    df.drop ('Age',axis=1,inplace=True)

    # It can be observed that the employees are more likey the drop the job if dailyRate less than 800
    df['DailyRate_bool'] = df['DailyRate'].apply (lambda x: 1 if x < 800 else 0)
    df.drop ('DailyRate',axis=1,inplace=True)

    # Employees working at R&D Department have higher attrition rate
    df['Department_bool'] = df['Department'].apply (lambda x: 1 if x == 'Research & Development' else 0)
    df.drop ('Department',axis=1,inplace=True)

    # Rate of attrition of employees is high if DistanceFromHome > 10
    df['DistanceFromHome_bool'] = df['DistanceFromHome'].apply (lambda x: 1 if x > 10 else 0)
    df.drop ('DistanceFromHome',axis=1,inplace=True)

    # Employees are more likey to drop the job if the employee is working as Laboratory Technician
    df['JobRole_bool'] = df['JobRole'].apply (lambda x: 1 if x == 'Laboratory Technician' else 0)
    df.drop ('JobRole',axis=1,inplace=True)

    # Employees are more likey to the drop the job if the employee's hourly rate < 65
    df['HourlyRate_bool'] = df['HourlyRate'].apply (lambda x: 1 if x < 65 else 0)
    df.drop ('HourlyRate',axis=1,inplace=True)

    # Employees are more likey to the drop the job if the employee's MonthlyIncome < 4000
    df['MonthlyIncome_bool'] = df['MonthlyIncome'].apply (lambda x: 1 if x < 4000 else 0)
    df.drop ('MonthlyIncome',axis=1,inplace=True)

    # Rate of attrition of employees is high if NumCompaniesWorked < 3
    df['NumCompaniesWorked_bool'] = df['NumCompaniesWorked'].apply (lambda x: 1 if x > 3 else 0)
    df.drop ('NumCompaniesWorked',axis=1,inplace=True)

    # Employees are more likey to the drop the job if the employee's TotalWorkingYears < 8
    df['TotalWorkingYears_bool'] = df['TotalWorkingYears'].apply (lambda x: 1 if x < 8 else 0)
    df.drop ('TotalWorkingYears',axis=1,inplace=True)

    # Employees are more likey to the drop the job if the employee's YearsAtCompany < 3
    df['YearsAtCompany_bool'] = df['YearsAtCompany'].apply (lambda x: 1 if x < 3 else 0)
    df.drop ('YearsAtCompany',axis=1,inplace=True)

    # Employees are more likey to the drop the job if the employee's YearsInCurrentRole < 3
    df['YearsInCurrentRole_bool'] = df['YearsInCurrentRole'].apply (lambda x: 1 if x < 3 else 0)
    df.drop ('YearsInCurrentRole',axis=1,inplace=True)

    # Employees are more likely to the drop the job if the employee's YearsSinceLastPromotion < 1
    df['YearsSinceLastPromotion_bool'] = df['YearsSinceLastPromotion'].apply (lambda x: 1 if x < 1 else 0)
    df.drop ('YearsSinceLastPromotion',axis=1,inplace=True)

    # Employees are more likely to the drop the job if the employee's YearsWithCurrManager < 1
    df['YearsWithCurrManager_bool'] = df['YearsWithCurrManager'].apply (lambda x: 1 if x < 1 else 0)
    df.drop ('YearsWithCurrManager',axis=1,inplace=True)

    # Convert Categorical to Numerical
    # Buisness Travel
    if BusinessTravel == 'Rarely':
        df['BusinessTravel_Rarely'] = 1
        df['BusinessTravel_Frequently'] = 0
        df['BusinessTravel_No_Travel'] = 0
    elif BusinessTravel == 'Frequently':
        df['BusinessTravel_Rarely'] = 0
        df['BusinessTravel_Frequently'] = 1
        df['BusinessTravel_No_Travel'] = 0
    else:
        df['BusinessTravel_Rarely'] = 0
        df['BusinessTravel_Frequently'] = 0
        df['BusinessTravel_No_Travel'] = 1
    df.drop ('BusinessTravel',axis=1,inplace=True)

    # Education
    if Education == 1:
        df['Education_1'] = 1
        df['Education_2'] = 0
        df['Education_3'] = 0
        df['Education_4'] = 0
        df['Education_5'] = 0
    elif Education == 2:
        df['Education_1'] = 0
        df['Education_2'] = 1
        df['Education_3'] = 0
        df['Education_4'] = 0
        df['Education_5'] = 0
    elif Education == 3:
        df['Education_1'] = 0
        df['Education_2'] = 0
        df['Education_3'] = 1
        df['Education_4'] = 0
        df['Education_5'] = 0
    elif Education == 4:
        df['Education_1'] = 0
        df['Education_2'] = 0
        df['Education_3'] = 0
        df['Education_4'] = 1
        df['Education_5'] = 0
    else:
        df['Education_1'] = 0
        df['Education_2'] = 0
        df['Education_3'] = 0
        df['Education_4'] = 0
        df['Education_5'] = 1
    df.drop ('Education',axis=1,inplace=True)

    # EducationField
    if EducationField == 'Life Sciences':
        df['EducationField_Life_Sciences'] = 1
        df['EducationField_Medical'] = 0
        df['EducationField_Marketing'] = 0
        df['EducationField_Technical_Degree'] = 0
        df['Education_Human_Resources'] = 0
        df['Education_Other'] = 0
    elif EducationField == 'Medical':
        df['EducationField_Life_Sciences'] = 0
        df['EducationField_Medical'] = 1
        df['EducationField_Marketing'] = 0
        df['EducationField_Technical_Degree'] = 0
        df['Education_Human_Resources'] = 0
        df['Education_Other'] = 0
    elif EducationField == 'Marketing':
        df['EducationField_Life_Sciences'] = 0
        df['EducationField_Medical'] = 0
        df['EducationField_Marketing'] = 1
        df['EducationField_Technical_Degree'] = 0
        df['Education_Human_Resources'] = 0
        df['Education_Other'] = 0
    elif EducationField == 'Technical Degree':
        df['EducationField_Life_Sciences'] = 0
        df['EducationField_Medical'] = 0
        df['EducationField_Marketing'] = 0
        df['EducationField_Technical_Degree'] = 1
        df['Education_Human_Resources'] = 0
        df['Education_Other'] = 0
    elif EducationField == 'Human Resources':
        df['EducationField_Life_Sciences'] = 0
        df['EducationField_Medical'] = 0
        df['EducationField_Marketing'] = 0
        df['EducationField_Technical_Degree'] = 0
        df['Education_Human_Resources'] = 1
        df['Education_Other'] = 0
    else:
        df['EducationField_Life_Sciences'] = 0
        df['EducationField_Medical'] = 0
        df['EducationField_Marketing'] = 0
        df['EducationField_Technical_Degree'] = 0
        df['Education_Human_Resources'] = 1
        df['Education_Other'] = 1
    df.drop ('EducationField',axis=1,inplace=True)

    # Gender
    if Gender == 'Male':
        df['Gender_Male'] = 1
        df['Gender_Female'] = 0
    else:
        df['Gender_Male'] = 0
        df['Gender_Female'] = 1
    df.drop ('Gender',axis=1,inplace=True)

    # Marital Status
    if MaritalStatus == 'Married':
        df['MaritalStatus_Married'] = 1
        df['MaritalStatus_Single'] = 0
        df['MaritalStatus_Divorced'] = 0
    elif MaritalStatus == 'Single':
        df['MaritalStatus_Married'] = 0
        df['MaritalStatus_Single'] = 1
        df['MaritalStatus_Divorced'] = 0
    else:
        df['MaritalStatus_Married'] = 0
        df['MaritalStatus_Single'] = 0
        df['MaritalStatus_Divorced'] = 1
    df.drop ('MaritalStatus',axis=1,inplace=True)

    # Overtime
    if OverTime == 'Yes':
        df['OverTime_Yes'] = 1
        df['OverTime_No'] = 0
    else:
        df['OverTime_Yes'] = 0
        df['OverTime_No'] = 1
    df.drop ('OverTime',axis=1,inplace=True)

    # Stock Option Level
    if StockOptionLevel == 0:
        df['StockOptionLevel_0'] = 1
        df['StockOptionLevel_1'] = 0
        df['StockOptionLevel_2'] = 0
        df['StockOptionLevel_3'] = 0
    elif StockOptionLevel == 1:
        df['StockOptionLevel_0'] = 0
        df['StockOptionLevel_1'] = 1
        df['StockOptionLevel_2'] = 0
        df['StockOptionLevel_3'] = 0
    elif StockOptionLevel == 2:
        df['StockOptionLevel_0'] = 0
        df['StockOptionLevel_1'] = 0
        df['StockOptionLevel_2'] = 1
        df['StockOptionLevel_3'] = 0
    else:
        df['StockOptionLevel_0'] = 0
        df['StockOptionLevel_1'] = 0
        df['StockOptionLevel_2'] = 0
        df['StockOptionLevel_3'] = 1
    df.drop ('StockOptionLevel',axis=1,inplace=True)

    # Training Time Last Year
    if TrainingTimesLastYear == 0:
        df['TrainingTimesLastYear_0'] = 1
        df['TrainingTimesLastYear_1'] = 0
        df['TrainingTimesLastYear_2'] = 0
        df['TrainingTimesLastYear_3'] = 0
        df['TrainingTimesLastYear_4'] = 0
        df['TrainingTimesLastYear_5'] = 0
        df['TrainingTimesLastYear_6'] = 0
    elif TrainingTimesLastYear == 1:
        df['TrainingTimesLastYear_0'] = 0
        df['TrainingTimesLastYear_1'] = 1
        df['TrainingTimesLastYear_2'] = 0
        df['TrainingTimesLastYear_3'] = 0
        df['TrainingTimesLastYear_4'] = 0
        df['TrainingTimesLastYear_5'] = 0
        df['TrainingTimesLastYear_6'] = 0
    elif TrainingTimesLastYear == 2:
        df['TrainingTimesLastYear_0'] = 0
        df['TrainingTimesLastYear_1'] = 0
        df['TrainingTimesLastYear_2'] = 1
        df['TrainingTimesLastYear_3'] = 0
        df['TrainingTimesLastYear_4'] = 0
        df['TrainingTimesLastYear_5'] = 0
        df['TrainingTimesLastYear_6'] = 0
    elif TrainingTimesLastYear == 3:
        df['TrainingTimesLastYear_0'] = 0
        df['TrainingTimesLastYear_1'] = 0
        df['TrainingTimesLastYear_2'] = 0
        df['TrainingTimesLastYear_3'] = 1
        df['TrainingTimesLastYear_4'] = 0
        df['TrainingTimesLastYear_5'] = 0
        df['TrainingTimesLastYear_6'] = 0
    elif TrainingTimesLastYear == 4:
        df['TrainingTimesLastYear_0'] = 0
        df['TrainingTimesLastYear_1'] = 0
        df['TrainingTimesLastYear_2'] = 0
        df['TrainingTimesLastYear_3'] = 0
        df['TrainingTimesLastYear_4'] = 1
        df['TrainingTimesLastYear_5'] = 0
        df['TrainingTimesLastYear_6'] = 0
    elif TrainingTimesLastYear == 5:
        df['TrainingTimesLastYear_0'] = 0
        df['TrainingTimesLastYear_1'] = 0
        df['TrainingTimesLastYear_2'] = 0
        df['TrainingTimesLastYear_3'] = 0
        df['TrainingTimesLastYear_4'] = 0
        df['TrainingTimesLastYear_5'] = 1
        df['TrainingTimesLastYear_6'] = 0
    else:
        df['TrainingTimesLastYear_0'] = 0
        df['TrainingTimesLastYear_1'] = 0
        df['TrainingTimesLastYear_2'] = 0
        df['TrainingTimesLastYear_3'] = 0
        df['TrainingTimesLastYear_4'] = 0
        df['TrainingTimesLastYear_5'] = 0
        df['TrainingTimesLastYear_6'] = 1
    df.drop ('TrainingTimesLastYear',axis=1,inplace=True)

    # df.to_csv ('features.csv',index=False)
    print("data sent to model for training")

    prediction = model.predict (df)
    print("Response Recieved")
    print("prediction is: ", prediction)

    if prediction == 0:
       prediction_text = 'Employee Might Not Leave The Job'
    else:
       prediction_text = 'Employee Might Leave The Job'
       
    print(df.columns)
    additional_info = {
        'Age': Age,
        'BusinessTravel': BusinessTravel,
        'DailyRate': DailyRate,
        'Department': Department,
        'DistanceFromHome': DistanceFromHome,
        'Education': Education,
        'EducationField': EducationField,
        'EnvironmentSatisfaction': EnvironmentSatisfaction,
        'Gender': Gender,
        'HourlyRate': HourlyRate,
        'JobInvolvement': JobInvolvement,
        'JobLevel': JobLevel,
        'JobRole': JobRole,
        'JobSatisfaction': JobSatisfaction,
        'MaritalStatus': MaritalStatus,
        'MonthlyIncome': MonthlyIncome,
        'NumCompaniesWorked': NumCompaniesWorked,
        'OverTime': OverTime,
        'PerformanceRating': PerformanceRating,
        'RelationshipSatisfaction': RelationshipSatisfaction,
        'StockOptionLevel': StockOptionLevel,
        'TotalWorkingYears': TotalWorkingYears,
        'TrainingTimesLastYear': TrainingTimesLastYear,
        'WorkLifeBalance': WorkLifeBalance,
        'YearsAtCompany': YearsAtCompany,
        'YearsInCurrentRole': YearsInCurrentRole,
        'YearsSinceLastPromotion': YearsSinceLastPromotion,
        'YearsWithCurrManager': YearsWithCurrManager
    }    

    # Prepare the response JSON
    response_data = {
        'prediction': prediction.tolist(),
        'prediction_text': prediction_text,
        'additional_info': additional_info
    }


    # Convert the response data to JSON format
    response_json = json.dumps(response_data)
    
    # Return the response JSON
    return response_json

# /////////////////////// Generating Question //////////////////////
client = OpenAI(api_key=API_KEY)
@recruiter.route('/generate_questions', methods=['GET'])
def generate_questions():
    try:
        with get_connection().cursor() as cursor:
            sql = "SELECT Job_description FROM Jobs"
            cursor.execute(sql)
            job_description = cursor.fetchone()[0]
            print(job_description)
            
        prompt = f"Generate 2 different short interview questions for candidates applying for the following job description:\n\n{job_description}\n\n. donot add label of question and donot add question number before each question"
        
        
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        
        # Extract the generated text from the response
        generated_text = response.choices[0].text.strip()
        
        # Remove numbered prefixes before each question
        modified_text = re.sub(r'^\d+\.\s*|^Question \d+:\s*', '', generated_text, flags=re.MULTILINE)
        
        # Split the modified text into individual questions
        questions = modified_text.split('\n')
        formatted_questions = [f"Question {i+1}: {q.strip()}" for i, q in enumerate(questions)]
        
        return jsonify({'questions': formatted_questions})
    except Exception as e:
        print("Error on OpenAi:", str(e))
        return jsonify({'error': str(e)}), 500