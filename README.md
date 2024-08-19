# Telent Fussion

## Overview

Talent Fusion is a Resume Analyzer and Job-Based Recruitment System designed to enhance resumes according to ATS (Applicant Tracking System) criteria and provide personalized job recommendations. The system uses advanced algorithms and web scraping techniques to help users improve their resume visibility and find relevant job opportunities.

![UI Screenshot](public/UI%20ss/1.jpg)

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
![user portal](public/UI%20ss/ui%20%281%29.png)

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
![user portal](public/UI%20ss/ui%20%2825%29.png)
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

To get started with the Telent Fussion project, follow these steps:

### 1. Set Up the Environment

#### Install Flask and Next.js

1. **Install Python and Flask:**
   - Ensure Python is installed on your system. Download it from [Python's official website](https://www.python.org/downloads/).
   - Install Flask using pip:
     ```bash
     pip install Flask
     ```

2. **Install Node.js and Next.js:**
   - Download and install Node.js from [Node.js official website](https://nodejs.org/).
   - Create a Next.js application or navigate to your existing Next.js project directory:
     ```bash
     npx create-next-app@latest
     ```

2. **Start the Development Servers**
   -***Front-End (Next.js)***
   - Open a new terminal and navigate to the front-end project directory:
     ```bash
     cd path/to/your/nextjs/project
     ```

   ***Start the Next.js development server:***
      ```bash
      npm run dev
      ```


   ***Back-End (Flask)***
   - Open another terminal and navigate to the back-end project directory:
bash
    ```bash
    cd path/to/your/flask/project
    ```
    Start the Flask server:
    ```bash
    npm run flask-dev
    ```
3. **Install and Configure Redis**
   - Download and install Redis from the Redis official website. Follow the installation instructions for your operating system.
   - Start the Redis server:
     ```bash
     redis-server
     ```


   - Ensure that the Redis server is accessible at redis://localhost:6379/0.
4. **Set Up and Run Celery**
    - In the terminal where you have your Flask project, start the Celery worker server:
     ```bash
     celery -A api.app.celery worker --loglevel=info
     ```

- **Install Front-End Packages:**
     ```bash
     npm install
     ```

- **Install Back-End Packages:**
     ```bash
     pip install -r requirements.txt
     ```
- **Start Next.js Server:**
     ```bash
     npm run dev
     ```
- **Start Flask Server:**
     ```bash
     npm run flask-dev
     ```

- **Start Redis:**
     ```bash
     redis-server
     ```

- **Start Celery Worker:**
     ```bash
     celery -A api.app.celery worker --loglevel=info
     ```

   - For further instructions or troubleshooting, refer to the respective documentation for Flask, Next.js, Redis, and Celery.


