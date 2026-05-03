from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello World!"

@app.route('/success')
def success():
    return "success"

@app.route('/hello/<name>')
def hello(name):
    print(name)
    return "Hello, " + name
    
if __name__ == "__main__":
    app.run(debug=True)