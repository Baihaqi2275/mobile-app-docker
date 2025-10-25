from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/gameover')
def gameover():
    return render_template('gameover.html')

if __name__ == '__main__':
    app.run(debug=True)
