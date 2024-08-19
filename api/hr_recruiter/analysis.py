from celery import Celery
import numpy as np
from numpy.core.numeric import NaN
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import json
import time
import cv2
from .video_analysis import analyze_tone, extract_text 
import pandas as pd
import json
import os
from .facial_recognition import perform_facial_recognition

celery = Celery(__name__)

@celery.task
def video_analysis(user_id, user_folder_path, path1, path2, path3):
    
    # speech to text response for each question - AWS
    responses = {'Question 1: Tell something about yourself': [] , 'Question 2: Why should we hire you?': [] , 'Question 3: Where Do You See Yourself Five Years From Now?': []}
    ques = list(responses.keys())

    text1, data1 = extract_text(user_folder_path, "question1.webm")
    time.sleep(15)
    responses[ques[0]].append(text1)

    text2, data2 = extract_text(user_folder_path, "question2.webm")
    time.sleep(15)
    responses[ques[1]].append(text2)

    text3, data3 = extract_text(user_folder_path, "question3.webm")
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
    neutral_tone = []

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
        elif sentiment == "Neutral":  # Handle neutral tone
            neutral_tone.append(score)
            


    values = np.array([0,1,2])*3
    fig = plt.figure(figsize=(12, 6))
    sns.set_style("whitegrid")
    plt.xlim(-1.5, 10)

    plt.bar(values , analytical_tone , width = 0.4 , label = 'Analytical')
    plt.bar(values+0.4 , confident_tone , width = 0.4 , label = 'Confidence')
    plt.bar(values+0.8 , fear_tone , width = 0.4 , label = 'Fear')
    plt.bar(values-0.4 , joy_tone , width = 0.4 , label = 'Joy')
    plt.bar(values-0.8 , tentative_tone , width = 0.4 , label = 'Tentative')
    plt.bar(values - 1.2, neutral_tone, width=0.4, label='Neutral')

    plt.xticks(ticks = values , labels = ['Question 1','Question 2','Question 3'] , fontsize = 15 , fontweight = 60)
    plt.yticks(fontsize = 12 , fontweight = 90)
    ax = plt.gca()
    ax.xaxis.set_ticks_position('none')
    ax.yaxis.set_ticks_position('none')                    
    ax.xaxis.set_tick_params(pad = 5)
    ax.yaxis.set_tick_params(pad = 5)
    plt.legend()
    plt.savefig(os.path.join(user_folder_path, f'{user_id}_tone_analysis.jpg'), bbox_inches='tight')

    # save all resposnses
    result_filename = f'{user_id}_answers.json'
    result_filepath = os.path.join(user_folder_path, result_filename)
    with open(result_filepath, 'w') as file:
        json.dump(responses, file)

    with open('./static/answers.json' , 'w') as file:
        json.dump(responses , file)

    # face emotion recognition - plotting the emotions against time in the video
    videos = ["question1.webm", "question2.webm", "question3.webm"]
    frame_per_sec = 100
    size = (1280, 720)
    
    
    combined_video_path = os.path.join(user_folder_path, 'combined.webm')
    video = cv2.VideoWriter(combined_video_path, cv2.VideoWriter_fourcc(*"VP90"), int(frame_per_sec), size)

    # Write all the frames sequentially to the new video
    for v in videos:
        video_path = os.path.join(user_folder_path, v)
        print(video_path)
        curr_v = cv2.VideoCapture(video_path)
        while curr_v.isOpened():
            r, frame = curr_v.read()    
            if not r:
                break
            video.write(frame)         
    video.release()
    print("video saved succesfully")
    print(combined_video_path)
    print("Combined video for loop save successfully")
       
    video_path = combined_video_path
    perform_facial_recognition(video_path, user_folder_path)
    
    pass