from flask import Flask, render_template ,redirect

app = Flask(__name__)


# @app.route('/')
# def index():
#     return redirect("/play")


@app.route('/play')
def index():
    return render_template("index.html", times=3)


@app.route('/play/<num>')
def repeate(num):
    return render_template("index.html", times=int(num))


@app.route('/play/<num>/<color>')
def change_color(num, color):
    return render_template("index.html", times=int(num) , color_name=color)



if __name__ == "__main__":
    app.run(debug=True)