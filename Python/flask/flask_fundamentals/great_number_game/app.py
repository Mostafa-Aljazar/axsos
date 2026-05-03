from flask import Flask, render_template, request, redirect, session
import random

app = Flask(__name__)
app.secret_key = 'super_secret_key'  # Required for sessions

@app.route('/')
def index():
    if 'number' not in session:
        session['number'] = random.randint(1, 100)
        session['attempts'] = 0
        session['message'] = None
        session['color'] = None
    
    return render_template('index.html', 
                         message=session.get('message'),
                         color=session.get('color'),
                         attempts=session.get('attempts'))

@app.route('/guess', methods=['POST'])
def guess():
    guess = int(request.form.get('guess'))
    session['attempts'] = session.get('attempts', 0) + 1
    
    target = session['number']
    
    if guess < target:
        session['message'] = "Too low!"
        session['color'] = "red"
    elif guess > target:
        session['message'] = "Too high!"
        session['color'] = "red"
    else:
        session['message'] = f"{guess} was the number!"
        session['color'] = "green"
    
    return redirect('/')

@app.route('/reset')
def reset():
    session.clear()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)