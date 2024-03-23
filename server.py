# server.py

from flask import Flask, request, jsonify
import pdf_doc_processing

app = Flask(__name__)

@app.route('/extract_information', methods=['POST'])
def extract_information():
    file_path = request.form.get('file_path')
    information = pdf_doc_processing.extract_information(file_path)
    return jsonify(information)

if __name__ == '__main__':
    app.run()
