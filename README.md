# Telent Fussion

## Overview

Talent Fusion is a Resume Analyzer and Job-Based Recruitment System designed to enhance resumes according to ATS (Applicant Tracking System) criteria and provide personalized job recommendations. The system uses advanced algorithms and web scraping techniques to help users improve their resume visibility and find relevant job opportunities.

![App Screenshot](public/UIss/1.jpg)

## Basic Information

### Front-End Technology Stack
- HTML
- CSS
- JavaScript
- Tailwind CSS
- Bootstrap
- Material UI

### Back-End Technology
- Python
- Framework: Flask

### Environments
- Anaconda + Jupyter Notebook (for scraping)
- VS Code + XAMPP Apache Server + MySQL Database (for the whole project)

### Python Libraries
- Streamlit (for creating the UI of the web application)
- Pandas (Python data analysis library)
- Pyresparser (for extracting data from images)
- PDFMiner (for extracting data from PDFs)
- PIL (for image processing)
- PyMySQL (Database interaction)
- Pafy (for downloading YouTube content and retrieving metadata)
- Plotly (for creating visual charts and dashboards for admins)
- Scikit-learn (machine learning library)
- NLTK (Natural Language Toolkit)
- Selenium (for web scraping)
- BeautifulSoup (for web scraping)
- Regex (for pattern matching)
- ftfy (for text cleaning)

## User Portal

### Steps Involved
1. Get the resume from the user.
2. Save the resume into the system.
3. PDF Extraction
   - Libraries: Pyresparser, PDFMiner
4. Resume Parsing
5. Display the Statistics
   - Name
   - Email
   - Phone Number
   - Expertise Level (Beginner, Intermediate, Expert)
   - Defined Skills
   - Recommended Skills
   - Issues
   - Resume Score
   - Courses
   - Recommended Changes in Resume
   - Latest Jobs according to CV (optional)

### Algorithms and Methodology
- NLP Algorithms
- KNN Algorithm
- N-gram Technique
- Vectorization
- Pattern Matching

### Modules and Features
1. ATS and Resume Analyzing
2. Job Recommendations System

## HR Recruiter Portal

### Steps Involved
1. Find Deployment Attrition from the Dataset.
2. Apply Classifier Algorithm.
3. Analyze and Visualize Data.
4. Email Automation.
5. Collect Resumes.
6. Resume Analysis
   - Pattern matching with job descriptions.
   - Libraries: Pyresparser, PDFMiner
7. AI Recommendations

### Modules and Features
1. Candidate Employee Attrition
2. Recent Applications
3. Ongoing Hiring Process
4. Company Profile

## AI Interview Platforms
1. AI Assessments: Analyzing video interviews using AI technology.
2. Conversational HR Chatbots: Guiding candidates through interviews with AI chatbots.

## DataSet
- Kaggle Dataset: [Resume Dataset](https://www.kaggle.com/datasets/gauravduttakiit/resume-dataset)
- Online Dataset: [Indeed Resumes](https://resumes.indeed.com/)
- Web Scraping Tools:
  - Selenium
  - BeautifulSoup
  - Python (version 3.11)

## Code References
1. [Smart Resume Analyser App Commit](https://github.com/Spidy20/Smart_Resume_Analyser_App/commit/b81aade0784c0a3a0d9b2e6a1d814852bb50423f)
2. [Resume Screening with Python](https://towardsdatascience.com/resume-screening-with-python-1dea360be49b)

## Getting Started

### Prerequisites
1. Install Redis.
2. Start Redis server: `redis-server`.

### Running the Project

#### Start Celery Worker Server
Use the following command:
```bash
celery -A api.app.celery worker --loglevel=info
