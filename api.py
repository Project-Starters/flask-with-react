from flask import Flask, g, render_template, make_response, redirect
from flask.views import View


app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SESSION_TYPE'] = 'filesystem'



from views import Index


app.add_url_rule('/', view_func=Index.as_view('index'))

if __name__ == '__main__':
    app.run(debug=True)

