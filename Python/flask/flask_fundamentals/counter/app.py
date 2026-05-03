from flask import Flask, render_template, session, redirect, request

app = Flask(__name__)
app.secret_key = "secret_key"

@app.route('/')
def index():

    if 'count' not in session:
        session['count'] = 1
    else:
        session['count'] += 1

    return render_template('index.html', count=session['count'])



@app.route('/destroy_session')
def destroy():
    session.clear()
    return redirect('/')


@app.route('/add2')
def add2():
    if 'count' in session:
        session['count'] += 2
    return redirect('/')


@app.route('/reset')
def reset():
    session['count'] = 0
    return redirect('/')


@app.route('/increment', methods=['POST'])
def increment():
    number = request.form.get('number', '0').strip()
    
    if number:
        try:
            value = int(number)
            if 'count' in session:
                session['count'] += value
        except ValueError:
            pass

    return redirect('/')


if __name__ == "__main__":
    app.run(debug=True)