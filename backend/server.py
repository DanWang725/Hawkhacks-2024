from flask import Flask, request, abort
from flask_cors import CORS 
import json
app = Flask(__name__)
CORS(app)