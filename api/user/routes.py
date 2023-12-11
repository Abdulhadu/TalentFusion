import functools
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from flask import Flask, request, jsonify
from pyresparser import ResumeParser
import random
import nltk
nltk.download('stopwords')
import pandas as pd
import base64,random
import time,datetime
from pyresparser import ResumeParser
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import TextConverter
import numpy as np
import pandas as pd
import re
from ftfy import fix_text
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import io,random
from streamlit_tags import st_tags
from PIL import Image
import pymysql
import pafy
import os
os.environ["PAFY_BACKEND"] = "internal"
import plotly.express as px
import nltk
import spacy
nltk.download('stopwords')
spacy.load('en_core_web_sm')
from os.path import abspath
import os
from api.static.Courses import ds_course,web_course,android_course,ios_course,uiux_course,resume_videos,interview_videos
from spacy.matcher import Matcher
from spacy.lang.en import English
from api.user.services.infoExtraction import infoExtraction

user = Blueprint('user', __name__, url_prefix='/user')


# Configure your MySQL connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Password for your MySQL server
    'db': 'telentfussion',  # Your database name
}

# Create a connection to the MySQL database
connection = pymysql.connect(**db_config)
print("MySQL connection established successfully")

cursor = connection.cursor()

def pdf_reader(file):
    resource_manager = PDFResourceManager()
    fake_file_handle = io.StringIO()
    converter = TextConverter(resource_manager, fake_file_handle, laparams=LAParams())
    page_interpreter = PDFPageInterpreter(resource_manager, converter)
    with open(file, 'rb') as fh:
        for page in PDFPage.get_pages(fh,
                                      caching=True,
                                      check_extractable=True):
            page_interpreter.process_page(page)
            print(page)
        text = fake_file_handle.getvalue()

    # close open handles
    converter.close()
    fake_file_handle.close()
    return text


# ///////////////// Save Data to database ////////////////////////////////
def insert_data(name,email,res_score,timestamp,no_of_pages,reco_field,cand_level,skills,recommended_skills,courses):
    DB_table_name = 'user_data'
    insert_sql = "insert into " + DB_table_name + """
    values (0,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
    rec_values = (name, email, str(res_score), timestamp,str(no_of_pages), reco_field, cand_level, skills,recommended_skills,courses)
    cursor.execute(insert_sql, rec_values)
    connection.commit()



# ///////////////// Compute the Recomendation ////////////////////////////////
def compute_recommendations(resume_text):
    recommendations = []
    resume_score = 0

    if 'Objective' in resume_text:
        resume_score = resume_score+20
        recommendations.append("Awesome! You have added Objective")
    else:
        recommendations.append("According to our recommendation please add your career objective, it will give your career intension to the Recruiters.")

    if 'Declaration'  in resume_text:
        resume_score = resume_score + 20
        recommendations.append("Awesome! You have added Delcaration✍")
    else:
        recommendations.append("According to our recommendation please add Declaration✍. It will give the assurance that everything written on your resume is true and fully acknowledged by you")

    if 'Hobbies' or 'Interests'in resume_text:
        resume_score = resume_score + 20
        recommendations.append("Awesome! You have added your Hobbies⚽")
    else:
        recommendations.append("According to our recommendation please add Hobbies⚽. It will show your persnality to the Recruiters and give the assurance that you are fit for this role or not.")

    if 'Achievements' in resume_text:
        resume_score = resume_score + 20
        recommendations.append("Awesome! You have added your Achievements🏅")
    else:
        recommendations.append("According to our recommendation please add Achievements🏅. It will show that you are capable for the required position.")

    if 'Projects' in resume_text:
        resume_score = resume_score + 20
        recommendations.append("Awesome! You have added your Projects👨‍💻")
    else:
        recommendations.append("According to our recommendation please add Projects👨‍💻. It will show that you have done work related the required position or not.")

    return resume_score, recommendations

# ///////////////// Compute the Candidate Level /////////////////////////
def compute_candidateLevel(resume_data):
    cand_level = ''
    if resume_data['no_of_pages'] == 1:
        cand_level = "Fresher"
    
    elif resume_data['no_of_pages'] == 2:
        cand_level = "Intermediate"
    
    elif resume_data['no_of_pages'] >=3:
        cand_level = "Experienced"
        
    return cand_level


# //////////////////////// Course Recomendatiom //////////////////////
def course_recommender(course_list):
    c = 0
    rec_course = []
    random.shuffle(course_list)
    for c_name, c_link in course_list:
        rec_course.append(c_name)
        break
    return rec_course


# //////////////////////// Skill Recomdenation ///////////////////
# Skill recommendation data
ds_keyword = ['tensorflow', 'keras', 'pytorch', 'machine learning', 'deep Learning', 'flask', 'streamlit']
web_keyword = ['react', 'django', 'node jS', 'react js', 'php', 'laravel', 'magento', 'wordpress',
              'javascript', 'angular js', 'c#', 'flask']
android_keyword = ['android', 'android development', 'flutter', 'kotlin', 'xml', 'kivy']
ios_keyword = ['ios', 'ios development', 'swift', 'cocoa', 'cocoa touch', 'xcode']

# Skill recommendation function
def recommend_skills(user_skills):
    recommended_skills = []
    reco_field = ''
    rec_course = ''
    
 

    for skill in user_skills:
        if skill.lower() in ds_keyword:
            reco_field = 'Data Science'
            recommended_skills.extend(['Data Visualization', 'Predictive Analysis', 'Statistical Modeling', 'Data Mining',
                                       'Clustering & Classification', 'Data Analytics', 'Quantitative Analysis', 'Web Scraping',
                                       'ML Algorithms', 'Keras', 'Pytorch', 'Probability', 'Scikit-learn', 'Tensorflow', "Flask", 'Streamlit'])
            rec_course = course_recommender(ds_course)
            break

        elif skill.lower() in web_keyword:
            reco_field = 'Web Developer'
            recommended_skills.extend(['React', 'Django', 'Node JS', 'React JS', 'php', 'laravel', 'Magento', 'wordpress', 'Javascript', 'Angular JS', 'c#', 'Flask', 'SDK'])
            rec_course = course_recommender(web_course)
            break

        elif skill.lower() in android_keyword:
            reco_field = 'Android developer'
            recommended_skills.extend(['Android', 'Android development', 'Flutter', 'Kotlin', 'XML', 'Java', 'Kivy', 'GIT', 'SDK', 'SQLite'])
            rec_course = course_recommender(android_course)
            break

        elif skill.lower() in ios_keyword:
            reco_field = 'App Developer'
            recommended_skills.extend(['IOS', 'IOS Development', 'Swift', 'Cocoa', 'Cocoa Touch', 'Xcode', 'Objective-C', 'SQLite', 'Plist', 'StoreKit', "UI-Kit", 'AV Foundation', 'Auto-Layout'])
            rec_course = course_recommender(ios_course)
            break

    return recommended_skills, reco_field, rec_course

# ////////////////////////////////////////////////////////////

@user.route('/')
def hello():
    return "Hello World!"



def extractDegree(cleaned_tx):
    degrees_patterns_path = 'api/user/Resources/data/specifydegree.jsonl'
    majors_patterns_path = 'api/user/Resources/data/majors.jsonl'
    resume = pd.DataFrame({'parsedData': [cleaned_tx]})
    resume[['parsedData']]

    resume = resume[['parsedData']]
    resume_extraction =  infoExtraction(majors_patterns_path, degrees_patterns_path, resume)
    resume = resume_extraction.extract_entities(resume)
    for i, row in resume.iterrows():
        minimum_degree_level = resume['Minimum degree level'][i]
        acceptable_majors = resume['Acceptable majors'][i]

        print("Degree Level: ", minimum_degree_level)
        print("Acceptable Majors: " ,acceptable_majors)
        print(resume_extraction)
        
    return minimum_degree_level, acceptable_majors
  

@user.route('/analyze_resume', methods=['POST'])
def analyze_resume():
    try:
        # Create the database if it doesn't exist
        db_sql = """CREATE DATABASE IF NOT EXISTS SRA;"""
        cursor.execute(db_sql)

        # Create the user_data table if it doesn't exist
        DB_table_name = 'user_data'
        table_sql = "CREATE TABLE IF NOT EXISTS " + DB_table_name + """
                        (ID INT NOT NULL AUTO_INCREMENT,
                         Name varchar(100) NOT NULL,
                         Email_ID VARCHAR(50) NOT NULL,
                         resume_score VARCHAR(8) NOT NULL,
                         Timestamp VARCHAR(50) NOT NULL,
                         Page_no VARCHAR(5) NOT NULL,
                         Predicted_Field VARCHAR(25) NOT NULL,
                         User_level VARCHAR(30) NOT NULL,
                         Actual_skills VARCHAR(300) NOT NULL,
                         Recommended_skills VARCHAR(300) NOT NULL,
                         Recommended_courses VARCHAR(600) NOT NULL,
                         PRIMARY KEY (ID));
                        """
        cursor.execute(table_sql)

        if 'resume' in request.files:
            resume_file = request.files['resume']
            print("Reume Name is : ", resume_file.filename)
            directory_path = './Uploaded_Resumes/'
            if os.access(directory_path, os.W_OK):
               print(f"The directory '{directory_path}' has write permissions.")
            else:
               print(f"The directory '{directory_path}' does not have write permissions.")

            save_image_path = './Uploaded_Resumes/'+resume_file.filename
            print("Savve image pathe is :", save_image_path)
            try:
                with open(save_image_path, "wb") as f:
                    f.write(resume_file.read())#getbuffer() shared a memory between the object
                    print("Resume Opem")
            except:
                print("Fail to open File")

            resume_data = ResumeParser(save_image_path).get_extracted_data()
            
            if resume_data:
                resume_text = pdf_reader(save_image_path)
                tx = " ".join(resume_text.split('\n'))
                cleaned_tx = re.sub(r'[^A-Za-z0-9\s]', '', tx).lower()
                print(cleaned_tx)
                minimum_degree_level, acceptable_majors = extractDegree(cleaned_tx)
                print("Minimum degree level is : ", minimum_degree_level)
                print("acceptable majors : ", acceptable_majors)
                print("calculating candidate")
                cand_level = compute_candidateLevel(resume_data)
                resume_score, recommendations = compute_recommendations(resume_text)
                print("calculated candidate")

                
                try:
                    user_skills = resume_data['skills']
                    recommended_skills, reco_field, rec_course = recommend_skills(user_skills)
                except:
                    pass   
                print("calculating skills")
                
                # Saving parse Resume to database 
                ts = time.time()
                cur_date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
                cur_time = datetime.datetime.fromtimestamp(ts).strftime('%H:%M:%S')
                timestamp = str(cur_date+'_'+cur_time)
                insert_data(resume_data['name'], resume_data['email'], str(resume_score), timestamp,str(resume_data['no_of_pages']), reco_field, cand_level, str(resume_data['skills']),str(recommended_skills),str(rec_course))
                print("Data saved Successfully")
                
                
                
                time.sleep(2)

                response_data = {
                  'resume_data': resume_data,
                  'cand_level': cand_level,
                  'resume_score': resume_score,
                  'recommended_skills': recommended_skills,
                  'reco_field': reco_field,
                  'rec_course': rec_course,
                  'recommendations': recommendations,
                  'Degree': minimum_degree_level,
                  'Major_Subject': acceptable_majors
                }
                return jsonify(response_data), 200
                
            else:
                return jsonify({"error": "No Resume Data"}), 400
        else:
            return jsonify({"error": "No file uploaded"}), 400
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        print(f"Problematic resume file details: {resume_file.filename}, Size: {len(resume_file.getbuffer())} bytes")

        return jsonify({"error": str(e)}), 500


# ///////////////////////// JOB Recomendation //////////////////////

def ngrams(string, n=3):
    string = fix_text(string) # fix text
    string = string.encode("ascii", errors="ignore").decode() #remove non ascii chars
    string = string.lower()
    chars_to_remove = [")","(",".","|","[","]","{","}","'"]
    rx = '[' + re.escape(''.join(chars_to_remove)) + ']'
    string = re.sub(rx, '', string)
    string = string.replace('&', 'and')
    string = string.replace(',', ' ')
    string = string.replace('-', ' ')
    string = string.title() # normalise case - capital at start of each word
    string = re.sub(' +',' ',string).strip() # get rid of multiple spaces and replace with a single
    string = ' '+ string +' ' # pad names for ngrams...
    string = re.sub(r'[,-./]|\sBD',r'', string)
    ngrams = zip(*[string[i:] for i in range(n)])
    return [''.join(ngram) for ngram in ngrams]


stopw  = set(stopwords.words('english'))
df = pd.read_csv('jobs.csv') 


df['test']=df['Job_Description'].apply(lambda x: ' '.join([word for word in str(x).split() if len(word)>2 and word not in (stopw)]))
 

# ///////////////////////////For Resume INput ////////////////////////
@user.route('/Job_Recomendation', methods=['POST'])
def job_recommendation():
    try:
        if 'resume' in request.files:
            resume_file = request.files['resume']
            save_image_path = './Uploaded_Resumes/'+resume_file.filename
            print("Savve image pathe is :", save_image_path)
            with open(save_image_path, "wb") as f:
                f.write(resume_file.getbuffer())
                print("Resume Opem")

            resume_data = ResumeParser(save_image_path).get_extracted_data()
            print("Reume Name is : ", resume_file.filename)
            fetch_resume=resume_data['skills']
            print("hello" , fetch_resume)
            
            skills=[]
            skills.append(' '.join(word for word in fetch_resume))
            print (skills)
            org_name_clean = skills
            print('Skill Extracted...', skills)
           
            vectorizer = TfidfVectorizer(min_df=1, analyzer=ngrams, 
lowercase=False)
            tfidf = vectorizer.fit_transform(org_name_clean)
            print('Vecorizing completed...')
            
            def getNearestN(query):  
                queryTFIDF_ = vectorizer.transform(query)
                distances, indices = nbrs.kneighbors(queryTFIDF_)
                return distances, indices
            nbrs = NearestNeighbors(n_neighbors=1, n_jobs=-1).fit(tfidf)
            unique_org = list(set(df['test'].values))
            distances, indices = getNearestN(unique_org)
            
            
            matches = []
            for i,j in enumerate(indices):
                dist=round(distances[i][0],2)
                temp = [dist]
                matches.append(temp)
                
            matches = pd.DataFrame(matches, columns=['Match confidence'])
            df['match']=matches['Match confidence']
            df1=df.sort_values('match')
            df1['url'] = df1['url'].apply(lambda x: f'<a href="{x}" target="_blank">[LINK]</a>')
            df2 = df1[['url', 'Position', 'Company', 'Location']].head(10).reset_index(drop=True)
            df2_dict = df2.to_dict(orient='records')
            return jsonify(df2_dict), 200
        
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
    
    
    
# ///////////////////////////For Skill Input ////////////////////////
@user.route('/Skill_based_recomendation', methods=['POST'])
def skill_based_recomendation():
    try:    
        if 'skills' in request.form:
            resume=list(request.form['skills'])
            print(type(resume))
            skills=[]
            skills.append(' '.join(word for word in resume))
            org_name_clean = skills
            print('Skill Extracted...', skills)
           
            vectorizer = TfidfVectorizer(min_df=1, analyzer=ngrams, 
lowercase=False)
            tfidf = vectorizer.fit_transform(org_name_clean)
            print('Vecorizing completed...')
            
            def getNearestN(query):  
                queryTFIDF_ = vectorizer.transform(query)
                distances, indices = nbrs.kneighbors(queryTFIDF_)
                return distances, indices
            nbrs = NearestNeighbors(n_neighbors=1, n_jobs=-1).fit(tfidf)
            unique_org = list(set(df['test'].values))
            distances, indices = getNearestN(unique_org)
            
            
            matches = []
            for i,j in enumerate(indices):
                dist=round(distances[i][0],2)
                temp = [dist]
                matches.append(temp)
                
            matches = pd.DataFrame(matches, columns=['Match confidence'])
            df['match']=matches['Match confidence']
            df1=df.sort_values('match')
            df1['url'] = df1['url'].apply(lambda x: f'<a href="{x}" target="_blank">[LINK]</a>')
            df2 = df1[['url', 'Position', 'Company', 'Location']].head(10).reset_index(drop=True)
            df2_dict = df2.to_dict(orient='records')
            return jsonify(df2_dict), 200
        
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

