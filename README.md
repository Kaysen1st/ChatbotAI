# Mental-Health-Chatbot
A conversational AI system designed to provide initial mental health support, resources, and guidance while maintaining clear boundaries about its non-therapeutic nature.


Prerequisites

Python 3.8+
Ollama installed and running
Neural Chat model downloaded

Setup Instructions

1. Clone the repository
2. Create a virtual environment

bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. Install dependencies

bash
pip install flask flask-cors langchain ollama

4. Ensure Ollama is running and the Neural Chat model is downloaded

bash
ollama pull neural-chat

Run the application

bash
python app.py

Open a web browser and navigate to http://localhost:5000

Project Structure

app.py: Flask backend server
templates/index.html: HTML template
static/styles.css: CSS styles
static/script.js: Frontend JavaScript

