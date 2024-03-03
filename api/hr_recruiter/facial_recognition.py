from fer import Video
from fer import FER # Assuming Video class is defined in video.py
import matplotlib
import matplotlib.pyplot as plt
import os


def perform_facial_recognition(video_path, user_folder_path):
    
    print(user_folder_path)
    face_detector = FER(mtcnn=True)
    print("Starting Emotional Analysis")
    input_video = Video(video_path)
    processing_data = input_video.analyze(face_detector, display=False, save_frames=False, save_video=False, annotate_frames=False, zip_images=False)
    vid_df = input_video.to_pandas(processing_data)
    vid_df = input_video.get_first_face(vid_df)
    vid_df = input_video.get_emotions(vid_df)
    pltfig = vid_df.plot(figsize=(12, 6), fontsize=12).get_figure()
    plt.legend(fontsize='large', loc=1)
    pltfig.savefig(os.path.join(user_folder_path, f'fer_output.png'))
 
    # pltfig.savefig('./static/fer_output.png')
    print("Emotional Analysis Completed")
