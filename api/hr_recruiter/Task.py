
import numpy as np
from numpy.core.numeric import NaN
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import json
import time
import cv2
from .video_analysis import analyze_tone, extract_text
from .facial_recognition import perform_facial_recognition
import pandas as pd
import json
import os
from celery import shared_task

@shared_task
def task(user_id, user_folder_path, *video_paths, questions):
    print("hello worlds")
    print(user_id)
    print(user_folder_path)
    responses = {question: [] for question in questions}
    print("responses are", responses)

    
    for i, video_path in enumerate(video_paths, start=1):
        # Extract text from each video
        text, data = extract_text(user_folder_path, f"question{i}.webm")
        time.sleep(15)  
        
    #   Append the extracted text to the respective question
        responses[questions[i-1]].append(text)
    
    
    # save all resposnses
    result_filename = f'{user_id}_answers.json'
    result_filepath = os.path.join(user_folder_path, result_filename)
    with open(result_filepath, 'w') as file:
        json.dump(responses, file)
        
        
    # Tone Analysis code after opening the anser.json file --------------------
    with open(result_filepath, 'r', encoding='utf-8') as f:
        responses = json.load(f)
    
    print("Responses loaded from 1_answer.json:", responses)
    
    num_questions = len(responses)
    bar_width = 0.2  
    values = np.arange(num_questions) * 3
    
    analytical_tones = []
    tentative_tones = []
    fear_tones = []
    joy_tones = []
    confident_tones = []
    neutral_tones = []
    for i, (question, answer_list) in enumerate(responses.items()):
        # Extract the text of the answer
        answer_text = answer_list[0]
    
        # Analyze tone for the extracted text
        res = analyze_tone(answer_text)
        tones_doc = []
    
        if 'document_tone' in res and 'tones' in res['document_tone']:
            for tone in res['document_tone']['tones']:
                tones_doc.append((tone['tone_name'], round(tone['score'] * 100, 2)))
    
        # Ensure all possible tones are included in the tones_doc list
        for tone_name in ['Tentative', 'Analytical', 'Fear', 'Confident', 'Joy', 'Neutral']:
            if tone_name not in [key for key, val in tones_doc]:
                tones_doc.append((tone_name, 0.0))
    
        tones_doc = dict(tones_doc)
    
        # Append tones for each question to respective lists
        analytical_tones.append(tones_doc.get('Analytical', 0.0))
        tentative_tones.append(abs(tones_doc.get('Tentative', 0.0)))
        fear_tones.append(tones_doc.get('Fear', 0.0))
        joy_tones.append(tones_doc.get('Joy', 0.0))
        confident_tones.append(tones_doc.get('Confident', 0.0))
        neutral_tones.append(abs(tones_doc.get('Neutral', 0.0)))
    
    # Plot the tones for all questions
    fig = plt.figure(figsize=(12, 6))
    sns.set_style("whitegrid")
    plt.xlim(-1.5, 10)
    plt.bar(values , analytical_tones, width=0.4, label='Analytical')
    plt.bar(values , confident_tones, width=0.4, label='Confidence')
    plt.bar(values , fear_tones, width=0.4, label='Fear')
    plt.bar(values , joy_tones, width=0.4, label='Joy')
    plt.bar(values , tentative_tones, width=0.4, label='Tentative')
    plt.bar(values , neutral_tones , width=0.4, label='Neutral')
   
    # Customize the plot
    plt.xticks(ticks=values, labels=[f'Question {i+1}' for i in     range(num_questions)], fontsize=15, fontweight=60)
    plt.yticks(fontsize=12, fontweight=90)
    plt.ylabel('Tone Score', fontsize=15)
    ax = plt.gca()
    ax.xaxis.set_ticks_position('none')
    ax.yaxis.set_ticks_position('none')
    ax.xaxis.set_tick_params(pad=5)
    ax.yaxis.set_tick_params(pad=5)
    plt.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(user_folder_path, f'{user_id}_tone_analysis.jpg'))



    # face emotion recognition ------------------------------------------------
    num_questions = len(responses)

    videos = [f"question{i}.webm" for i in range(1, num_questions + 1)]
    frame_per_sec = 100
    size = (1280, 720)
    
    combined_video_path = os.path.join(user_folder_path, 'combined.webm')
    video = cv2.VideoWriter(combined_video_path,cv2.VideoWriter_fourcc(*"VP90"),int(frame_per_sec), size)
    
    # Write all the frames sequentially to the new video and perform facial emotion recognition
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