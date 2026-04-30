from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello World!"


@app.route('/champion')
def champion():
    return "Champion!"

@app.route('/say/<name>')
def print_name(name):
    print(name)
    return "Hi " + name

@app.route('/repeat/<int:repeated>/<name>')
def repeat_name(name, repeated):
    return f"{name}  " * int(repeated)


@app.route('/*')
def not_found(name, repeated):
    return "Sorry! No response. Try again."

@app.errorhandler(404)
def not_found(e):
     return "Sorry! No response. Try again."
   
if __name__ == "__main__":
    app.run(debug=True)