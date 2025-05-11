from flask import Flask, send_from_directory, send_file, url_for
import os

app = Flask(__name__, static_folder='build', static_url_path='')

# Serve the main index.html at the root path
@app.route('/')
def index():
    return send_file('build/index.html')

# Serve static files from the out directory
@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join('build', path)):
        return send_from_directory('build', path)
    else:
        return send_file('build/index.html')  # For SPA routing, return index.html for non-existent paths

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
