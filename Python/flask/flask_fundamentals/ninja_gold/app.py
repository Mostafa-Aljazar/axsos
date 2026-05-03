from flask import Flask, render_template, request, redirect, session
import random
import datetime

app = Flask(__name__)
app.secret_key = "ninja_gold_secret_key"

@app.route('/')
def index():
    if 'gold' not in session:
        session['gold'] = 0
        session['activities'] = []
    
    return render_template('index.html', 
                         gold=session['gold'],
                         activities=session['activities'])

@app.route('/process_money', methods=['POST'])
def process_money():
    building = request.form.get('building')
    now = datetime.datetime.now().strftime("%Y/%m/%d %I:%M %p")
    
    if building == 'farm':
        gold_earned = random.randint(10, 20)
        message = f"Earned {gold_earned} golds from the farm! ({now})"
        color = 'green'
    elif building == 'cave':
        gold_earned = random.randint(5, 10)
        message = f"Earned {gold_earned} golds from the cave! ({now})"
        color = 'green'
    elif building == 'house':
        gold_earned = random.randint(2, 5)
        message = f"Earned {gold_earned} golds from the house! ({now})"
        color = 'green'
    elif building == 'casino':
        gold_earned = random.randint(-50, 50)
        if gold_earned >= 0:
            message = f"Entered a casino and won {gold_earned} golds... Sweet! ({now})"
            color = 'green'
        else:
            message = f"Entered a casino and lost {abs(gold_earned)} golds... Ouch. ({now})"
            color = 'red'
    
    session['gold'] += gold_earned
    session['activities'].insert(0, {'message': message, 'color': color})  # Most recent first
    
    return redirect('/')

@app.route('/reset')
def reset():
    session.clear()
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)