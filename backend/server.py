from flask import Flask, request, abort
from flask_cors import CORS 
import json
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

