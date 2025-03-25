from flask import Flask, jsonify, request, render_template, send_from_directory
from dotenv import load_dotenv
import os

app = Flask(__name__)


###### Helper functions ######
def wrap_up(item):
    response = jsonify(item)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

###### Templates ######
@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/translations')
def translations():
    return render_template('translations.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    app.run()