# pdf_doc_processing.py

import fitz  # PyMuPDF for PDF processing
from docx import Document  # python-docx for DOC processing

def extract_information(file_path):
    if file_path.endswith('.pdf'):
        return extract_information_from_pdf(file_path)
    elif file_path.endswith('.docx'):
        return extract_information_from_docx(file_path)
    else:
        return None

def extract_information_from_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def extract_information_from_docx(file_path):
    doc = Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text
    return text
