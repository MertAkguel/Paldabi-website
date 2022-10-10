from flask import Flask, render_template


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('main.html')


@app.route('/<name>')
def subpages(name="info"):
    return render_template('main.html', tag=name)

if __name__ == "__main__":
    app.run(debug=True)