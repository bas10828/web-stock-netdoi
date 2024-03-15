from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/data/*": {"origins": "http://192.168.114.134:3000"}})


# เชื่อมต่อกับ MySQL Server
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)

# Create (สร้างข้อมูลใหม่)
@app.route('/data', methods=['POST'])
def create_data():
    data = request.json  # รับข้อมูลที่ส่งมาจากแอปพลิเคชัน
    cursor = connection.cursor()
    query = "INSERT INTO equipment (proid, serial, mac, status_stock, lot_stock, price, brand, model, project) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(query, (data['proid'], data['serial'], data['mac'], data['status_stock'], data['lot_stock'], data['price'], data['brand'], data['model'], data['project']))
    connection.commit()
    cursor.close()
    return 'Data created successfully', 201, {'Access-Control-Allow-Origin': 'http://192.168.114.134:3000'}

# Read (อ่านข้อมูล)
@app.route('/data', methods=['GET'])
def get_data():
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM equipment")
    records = cursor.fetchall()
    cursor.close()
    return jsonify(records)

# Update (อัปเดตข้อมูล)
@app.route('/data/<int:id>', methods=['PUT'])
def update_data(id):
    data = request.json  # รับข้อมูลที่ส่งมาจากแอปพลิเคชัน
    cursor = connection.cursor()
    query = "UPDATE equipment SET proid=%s, serial=%s, mac=%s, status_stock=%s, lot_stock=%s, price=%s, brand=%s, model=%s, project=%s WHERE id=%s"
    cursor.execute(query, (data['proid'], data['serial'], data['mac'], data['status_stock'], data['lot_stock'], data['price'], data['brand'], data['model'], data['project'], id))
    connection.commit()
    cursor.close()
    return 'Data updated successfully', 200, {'Access-Control-Allow-Origin': 'http://192.168.114.134:3000'}

# Delete (ลบข้อมูล)
@app.route('/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    cursor = connection.cursor()
    query = "DELETE FROM equipment WHERE id=%s"
    cursor.execute(query, (id,))
    connection.commit()
    cursor.close()
    return 'Data deleted successfully', 200, {'Access-Control-Allow-Origin': 'http://192.168.114.134:3000'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


# ปิดการเชื่อมต่อ
connection.close()
