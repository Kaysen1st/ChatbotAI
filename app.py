from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

app = Flask(__name__, 
            static_folder='static', 
            static_url_path='/static')
CORS(app)

template = """
You are a helpful mental health support chatbot. Provide compassionate and supportive responses.

Conversation History: {context}

User's Latest Question: {question}

Please provide a thoughtful and empathetic response:
"""

model = OllamaLLM(model="neural-chat")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def handle_chat():
    try:
        # Get JSON data from the request
        data = request.get_json()
        
        # Extract context and question
        context = data.get('context', '')
        question = data.get('question', '')

        # Validate input
        if not question:
            return jsonify({"error": "No question provided"}), 400

        # Invoke the model
        result = chain.invoke({
            "context": context, 
            "question": question
        })

        # Return the result
        return jsonify(result)

    except Exception as e:
        # Log the error and return an error response
        print(f"Error processing chat request: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request"}), 500

if __name__ == '__main__':
    app.run(debug=True)