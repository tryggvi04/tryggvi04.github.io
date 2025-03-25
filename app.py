from flask import Flask, jsonify, request, render_template, send_from_directory
from ajikan_scraper.playlist_scraper import playlist_scraper
from dotenv import load_dotenv
import os

try:
    API_KEY = os.environ.get('sheets_api_key')
except:
    load_dotenv()
    API_KEY = os.getenv('sheets_api_key')

app = Flask(__name__)

ps = playlist_scraper()

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


@app.route('/get_current_song_id', methods=['GET'])
def get_current_song():

    # 0 is the ID column in the google sheet
    csv_song_link = ps.get_song_by_id(sheet_song[0], only_link=True)

    # 4 is the link of the song, we're getting the id of the song, which is in the link
    spotify_song_id = {"song_id":csv_song_link}

    return wrap_up(spotify_song_id)

if __name__ == '__main__':
    app.run()