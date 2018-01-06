from flask import Flask, render_template, make_response, redirect, Response, request, jsonify
from flask.views import MethodView




class Index(MethodView):
    def get(self):

        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html'), 200, headers)
