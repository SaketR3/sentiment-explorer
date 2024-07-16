from flask import Flask, request, jsonify
import flask_cors
from flask_cors import CORS
import tensorflow as tf 
import pandas as pd 
import os

app = Flask(__name__)
CORS(app)

script_dir = os.path.dirname(os.path.realpath(__file__))


model_file_path = os.path.join(script_dir, 'sentiment_analysis_model_tf')
data_file_path = os.path.join(script_dir, 'cleaned_2022_twitter_data.csv')
model = tf.keras.models.load_model(model_file_path)
data = pd.read_csv(data_file_path)     

@app.route("/api/analysis", methods=["GET"])
def message():
    search = request.args.get('search') 

    search_data_df = pd.DataFrame()
    search_data_df = data[data['content'].str.contains(search)]
    if (search_data_df.empty):
        return jsonify({'analysis': -1})
    search_data_df.columns = ['text_vectorization_input']

    model_input = tf.data.Dataset.from_tensor_slices(search_data_df.to_dict(orient="list"))
    analysis = model.predict(model_input.batch(32))

    num_p = 0
    num_n = 0

    for prediction in analysis:
        if prediction[0] >= 0.5:
            prediction[0] = 1
            num_p += 1
        else:
            prediction[0] = 0
            num_n += 1

    percent_p = num_p / (num_p + num_n)

    return jsonify({'analysis': percent_p})

