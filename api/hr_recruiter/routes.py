import datetime
from flask import (
    Blueprint, render_template, request
)
from pyresparser import ResumeParser
import numpy as np
from numpy.core.numeric import NaN
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import json
import re
import time
import cv2
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from flask import Flask , render_template , request , url_for , jsonify , Response
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
from api.hr_recruiter.services.JobInfoExtraction import JobInfoExtraction
from api.hr_recruiter.services.cvinfoExtraction import cvinfoExtraction
from api.hr_recruiter.services.Rules import Rules
from api.hr_recruiter.source.db_helpers.db_connection import database
from api.hr_recruiter.source.schemas.matched_resume import ResumeMatchedModel
from api.hr_recruiter.source.schemas.jobextracted import JobExtractedModel
import ast
import os
import sys
import fitz

# Access the environment variables stored in .env file
MYSQL_USER = config('mysql_user')
MYSQL_PASSWORD = config('mysql_password')

# To send mail (By interviewee)
MAIL_USERNAME = config('mail_username')
MAIL_PWD = config('mail_pwd')

# For logging into the interview portal
COMPANY_MAIL = config('company_mail')
COMPANY_PSWD = config('company_pswd')

# Create a Flask app
app = Flask(__name__)
CORS(app) 
# App configurations
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'telentfussion' 
# user_db = MySQL(app)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Password for your MySQL server
    'db': 'telentfussion',  # Your database name
}

# Create a connection to the MySQL database
connection = pymysql.connect(**db_config)
print("MySQL connection established successfully")


mail = Mail(app)              
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_PASSWORD'] = MAIL_PWD
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_ASCII_ATTACHMENTS'] = True
mail = Mail(app)


recruiter = Blueprint('recruiter', __name__, url_prefix='/recruiter')

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
           
            if connection:
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
        with connection.cursor() as cursor:
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

        if connection:
            cursor = connection.cursor()

            # Raw SQL query to insert a new job record
            cursor.execute("INSERT INTO extractjobs VALUES (NULL, %s, %s, %s, %s, %s)", (job_title, job_description, minimum_degree_level, acceptable_majors_str, skills_str))
            connection.commit()

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
        with connection.cursor() as cursor:
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
        with connection.cursor() as cursor:
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

def insert_matched_resume(id_resume,job_index,degree_matching,major_matching,skills_semantic_matching,matching_score):
    cursor = connection.cursor()
    cursor.execute("INSERT INTO `matchedresume` VALUES ('NULL','%s','%s','%s','%s','%s','%s')",(id_resume,job_index, degree_matching, major_matching, skills_semantic_matching, matching_score))
    connection.commit()


@recruiter.route("/matching", methods=['GET'])
def matching():
    with open('api/hr_recruiter/Resources/data/labels.json') as fp:
        labels = json.load(fp)
    # Extract and cleaning data 
    resumes = get_extracted_resumes()
    jobs = get_extracted_jobs()
    # modifying string literal 
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
    result = []
    cursor = connection.cursor()
    query = """
        SELECT
            ecv.ID,
            ecv.name,
            ecv.email,
            ecv.skills,
            ecv.degree,
            ecv.majors,
            mr.job_index AS matched_job
        FROM
            extract_cv ecv
        JOIN
            matchedresume mr ON ecv.ID = mr.id_resume
        ORDER BY
            mr.matching_score DESC
        LIMIT 3;
    """
    cursor.execute(query)
    connection.close()
    result = cursor.fetchall()
    top_resumes_json = jsonable_encoder(result)
    return top_resumes_json


# ------------------------------- AI INterview Section starts ----------------
# ------------------------------------------------------------------------------
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
        if connection:
            cursor = connection.cursor()

            # Raw SQL query to insert a new job record
            cursor.execute("INSERT INTO jobs VALUES (NULL, %s, %s, %s, %s, %s)", (job_title, description, salary, location, formatted_date))
            connection.commit()

            # Return success response
            return jsonify({'message': 'Job posted successfully'}), 201
        else:
            return jsonify({'error': 'Failed to establish a database connection'}), 500

    except Exception as e:
        # Handle exceptions and return an error response
        return jsonify({'error': str(e)}), 500
    
    
    
    
# Interviewee signup 
@recruiter.route('/signup' , methods=['POST' , 'GET'])
def interviewee():
    if request.method == 'POST' and 'username' in request.form and 'usermail' in request.form and 'userpassword' in request.form:
        username = request.form['username']
        usermail = request.form['usermail']
        userpassword = request.form['userpassword']

        cursor = connection.cursor()

        cursor.execute("SELECT * FROM candidates WHERE candidatename = %s AND email = %s", (username, usermail))
        account = cursor.fetchone()

        if account:
            err = "Account Already Exists"
            return render_template('index.html' , err = err)
        elif not re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', usermail):
            err = "Invalid Email Address !!"
            return render_template('index.html' , err = err)
        elif not re.fullmatch(r'[A-Za-z0-9\s]+', username):
            err = "Username must contain only characters and numbers !!"
            return render_template('index.html' , err = err)
        elif not username or not userpassword or not usermail:
            err = "Please fill out all the fields"
            return render_template('index.html' , err = err)
        else:
            cursor.execute("INSERT INTO candidates VALUES (NULL, % s, % s, % s)" , (username, usermail, userpassword,))
            connection.commit()
            reg = "You have successfully registered !!"
            return render_template('FirstPage.html' , reg = reg)
    else:
        return render_template('index.html')


# Interviewer signin 
@recruiter.route('/signin' , methods=['POST' , 'GET'])
def interviewer():
    if request.method == 'POST' and 'company_mail' in request.form and 'password' in request.form:
        company_mail = request.form['company_mail']
        password = request.form['password']

        if company_mail == COMPANY_MAIL and password == COMPANY_PSWD:
            return render_template('candidateSelect.html')
        else:
            return render_template("index.html" , err = "Incorrect Credentials")
    else:
        return render_template("index.html")


# personality trait prediction using Logistic Regression and parsing resume
@recruiter.route('/prediction' , methods = ['GET' , 'POST'])
def predict():
  
    if request.method == 'POST':
        fname = request.form['firstname'].capitalize()
        lname = request.form['lastname'].capitalize()
        age = int(request.form['age'])
        gender = request.form['gender']
        email = request.form['email']
        file = request.files['resume']
        path = './static/{}'.format(file.filename)
        file.save(path)
        val1 = float(request.form['openness'])
        val2 = float(request.form['neuroticism'])
        val3 = float(request.form['conscientiousness'])
        val4 = float(request.form['agreeableness'])
        val5 = float(request.form['extraversion'])

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
            # 'Degree': data.get('degree', None)[0],
            # 'Designation': data.get('designation', None)[0],
            'Total Experience': data.get('total_experience'),
            'Predicted Personality': pred
        }

        with open('./static/result.json', 'w') as file:
            json.dump(result, file)

    return render_template('questionPage.html')


# Record candidate's interview for face emotion and tone analysis
@recruiter.route('/analysis', methods = ['POST'])
def video_analysis():

    # get videos using media recorder js and save
    quest1 = request.files['question1']
    quest2 = request.files['question2']
    quest3 = request.files['question3']
    path1 = "./static/{}.{}".format("question1","webm")
    path2 = "./static/{}.{}".format("question2","webm")
    path3 = "./static/{}.{}".format("question3","webm")
    quest1.save(path1)
    quest2.save(path2)
    quest3.save(path3)

    # speech to text response for each question - AWS
    responses = {'Question 1: Tell something about yourself': [] , 'Question 2: Why should we hire you?': [] , 'Question 3: Where Do You See Yourself Five Years From Now?': []}
    ques = list(responses.keys())

    text1 , data1 = extract_text("question1.webm")
    time.sleep(15)
    responses[ques[0]].append(text1)

    text2 , data2 = extract_text("question2.webm")
    time.sleep(15)
    responses[ques[1]].append(text2)

    text3 , data3 = extract_text("question3.webm")
    time.sleep(15)
    responses[ques[2]].append(text3)

    # tone analysis for each textual answer - IBM
    res1 = analyze_tone(text1)
    tones_doc1 = []

    for tone in res1['document_tone']['tones']:
        tones_doc1.append((tone['tone_name'] , round(tone['score']*100, 2)))

    if 'Tentative' not in [key for key, val in tones_doc1]:
        tones_doc1.append(('Tentative', 0.0))
    if 'Analytical' not in [key for key, val in tones_doc1]:
        tones_doc1.append(('Analytical', 0.0))
    if 'Fear' not in [key for key, val in tones_doc1]:
        tones_doc1.append(('Fear', 0.0))
    if 'Confident' not in [key for key, val in tones_doc1]:
        tones_doc1.append(('Confident', 0.0))
    if 'Joy' not in [key for key, val in tones_doc1]:
        tones_doc1.append(('Joy', 0.0))
        
    tones_doc1 = sorted(tones_doc1)

    res2 = analyze_tone(text2)
    tones_doc2 = []

    for tone in res2['document_tone']['tones']:
        tones_doc2.append((tone['tone_name'] , round(tone['score']*100, 2)))
        
    if 'Tentative' not in [key for key, val in tones_doc2]:
        tones_doc2.append(('Tentative', 0.0))
    if 'Analytical' not in [key for key, val in tones_doc2]:
        tones_doc2.append(('Analytical', 0.0))
    if 'Fear' not in [key for key, val in tones_doc2]:
        tones_doc2.append(('Fear', 0.0))
    if 'Confident' not in [key for key, val in tones_doc2]:
        tones_doc2.append(('Confident', 0.0))
    if 'Joy' not in [key for key, val in tones_doc2]:
        tones_doc2.append(('Joy', 0.0))
        
    tones_doc2 = sorted(tones_doc2)

    res3 = analyze_tone(text3)
    tones_doc3 = []

    for tone in res3['document_tone']['tones']:
        tones_doc3.append((tone['tone_name'] , round(tone['score']*100, 2)))
        
    if 'Tentative' not in [key for key, val in tones_doc3]:
        tones_doc3.append(('Tentative', 0.0))
    if 'Analytical' not in [key for key, val in tones_doc3]:
        tones_doc3.append(('Analytical', 0.0))
    if 'Fear' not in [key for key, val in tones_doc3]:
        tones_doc3.append(('Fear', 0.0))
    if 'Confident' not in [key for key, val in tones_doc3]:
        tones_doc3.append(('Confident', 0.0))
    if 'Joy' not in [key for key, val in tones_doc3]:
        tones_doc3.append(('Joy', 0.0))
        
    tones_doc3 = sorted(tones_doc3)

    # plot tone analysis 
    document_tones = tones_doc1 + tones_doc2 + tones_doc3

    analytical_tone = []
    tentative_tone = []
    fear_tone = []
    joy_tone = []
    confident_tone = []

    for sentiment, score in document_tones:
        if sentiment == "Analytical":
            analytical_tone.append(score)
        elif sentiment == "Tentative":
            tentative_tone.append(score)
        elif sentiment == "Fear":
            fear_tone.append(score)
        elif sentiment == "Joy":
            joy_tone.append(score)
        elif sentiment == "Confident":
            confident_tone.append(score)

    values = np.array([0,1,2])*3
    fig = plt.figure(figsize=(12, 6))
    sns.set_style("whitegrid")
    plt.xlim(-1.5, 10)

    plt.bar(values , analytical_tone , width = 0.4 , label = 'Analytical')
    plt.bar(values+0.4 , confident_tone , width = 0.4 , label = 'Confidence')
    plt.bar(values+0.8 , fear_tone , width = 0.4 , label = 'Fear')
    plt.bar(values-0.4 , joy_tone , width = 0.4 , label = 'Joy')
    plt.bar(values-0.8 , tentative_tone , width = 0.4 , label = 'Tentative')

    plt.xticks(ticks = values , labels = ['Question 1','Question 2','Question 3'] , fontsize = 15 , fontweight = 60)
    plt.yticks(fontsize = 12 , fontweight = 90)
    ax = plt.gca()
    ax.xaxis.set_ticks_position('none')
    ax.yaxis.set_ticks_position('none')                    
    ax.xaxis.set_tick_params(pad = 5)
    ax.yaxis.set_tick_params(pad = 5)
    plt.legend()
    plt.savefig(f'./static/tone_analysis.jpg' , bbox_inches = 'tight')

    # save all responses
    with open('./static/answers.json' , 'w') as file:
        json.dump(responses , file)

    # face emotion recognition - plotting the emotions against time in the video
    videos = ["question1.webm", "question2.webm", "question3.webm"]
    frame_per_sec = 100
    size = (1280, 720)

    video = cv2.VideoWriter(f"./static/combined.webm", cv2.VideoWriter_fourcc(*"VP90"), int(frame_per_sec), size)

    # Write all the frames sequentially to the new video
    for v in videos:
        curr_v = cv2.VideoCapture(f'./static/{v}')
        while curr_v.isOpened():
            r, frame = curr_v.read()    
            if not r:
                break
            video.write(frame)         
    video.release()

    face_detector = FER(mtcnn=True)
    input_video = Video(r"./static/combined.webm")
    processing_data = input_video.analyze(face_detector, display = False, save_frames = False, save_video = False, annotate_frames = False, zip_images = False)
    vid_df = input_video.to_pandas(processing_data)
    vid_df = input_video.get_first_face(vid_df)
    vid_df = input_video.get_emotions(vid_df)
    pltfig = vid_df.plot(figsize=(12, 6), fontsize=12).get_figure()
    plt.legend(fontsize = 'large' , loc = 1)
    pltfig.savefig(f'./static/fer_output.png')

    return "success"


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


# Send job confirmation mail to selected candidate
@recruiter.route('/accept' , methods=['GET'])
def accept():

    with open('./static/result.json' , 'r') as file:
        output = json.load(file)
    
    name = output['Name']
    email = output['Email']
    position = "Software Development Engineer"

    msg = Message(f'Job Confirmation Letter', sender = MAIL_USERNAME, recipients = [email])
    msg.body = f"Dear {name},\n\n" + f"Thank you for taking the time to interview for the {position} position. We enjoyed getting to know you. We have completed all of our interviews.\n\n"+ f"I am pleased to inform you that we would like to offer you the {position} position. We believe your past experience and strong technical skills will be an asset to our organization. Your starting salary will be $15,000 per year with an anticipated start date of July 1.\n\n"+ f"The next step in the process is to set up meetings with our CEO, Rahul Dravid\n\n."+ f"Please respond to this email by June 23 to let us know if you would like to accept the SDE position.\n\n" + f"I look forward to hearing from you.\n\n"+ f"Sincerely,\n\n"+ f"Harsh Verma\nHuman Resources Director\nPhone: 555-555-1234\nEmail: feedbackmonitor123@gmail.com"
    mail.send(msg)

    return "success"

# Send mail to rejected candidate
@recruiter.route('/reject' , methods=['GET'])
def reject():

    with open('./static/result.json' , 'r') as file:
        output = json.load(file)
    
    name = output['Name']
    email = output['Email']
    position = "Software Development Engineer"

    msg = Message(f'Your application to Smart Hire', sender = MAIL_USERNAME, recipients = [email])
    msg.body = f"Dear {name},\n\n" + f"Thank you for taking the time to consider Smart Hire. We wanted to let you know that we have chosen to move forward with a different candidate for the {position} position.\n\n"+ f"Our team was impressed by your skills and accomplishments. We think you could be a good fit for other future openings and will reach out again if we find a good match.\n\n"+ f"We wish you all the best in your job search and future professional endeavors.\n\n"+ f"Regards,\n\n"+ f"Harsh Verma\nHuman Resources Director\nPhone: 555-555-1234\nEmail: feedbackmonitor123@gmail.com"
    mail.send(msg)

    return "success"

