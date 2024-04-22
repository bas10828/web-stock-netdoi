from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

# เชื่อมต่อกับ MySQL Server
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)

@app.route('/data', methods=['GET'])
def get_data():
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM ribraly")
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
