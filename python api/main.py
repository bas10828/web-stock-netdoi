from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
# import json

# with open('globalVariables.json') as json_file:
#     data = json.load(json_file)

# url_api = data['ip']
url_api = "http://192.168.114.153"
 
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# เชื่อมต่อกับ MySQL Server
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = url_api + ':3000'
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


# Create (สร้างข้อมูลใหม่)
@app.route('/data', methods=['POST'])
def create_data():
    data = request.json  # รับข้อมูลที่ส่งมาจากแอปพลิเคชัน

    # วน loop เพื่อเพิ่มข้อมูลทีละรายการ
    for item in data:
        cursor = connection.cursor()
        query = "INSERT INTO equipment (proid, serial, mac, status_stock, into_stock, out_stock, price, brand, model, project, purchase) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (item['proid'], item['serial'], item['mac'], item['status_stock'], item['into_stock'], item['out_stock'], item['price'], item['brand'], item['model'], item['project'], item['purchase']))
        connection.commit()
        cursor.close()
    
    return 'Data created successfully', 201, {'Access-Control-Allow-Origin': url_api + ':3000'}


# Read (อ่านข้อมูลที่มี status_stock เป็น "in stock")
@app.route('/instock', methods=['GET'])
def get_instock_data():
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM equipment WHERE status_stock = 'in stock'")
    instock_records = cursor.fetchall()
    cursor.close()
    return jsonify(instock_records)

# Read (อ่านข้อมูลที่มี status_stock เป็น "sold out")
@app.route('/soldout', methods=['GET'])
def get_soldout_data():
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM equipment WHERE status_stock = 'sold out'")
    instock_records = cursor.fetchall()
    cursor.close()
    return jsonify(instock_records)

# Read (นับ model ทั้งหมด ที่อยู่ใน stock และ sold out)
@app.route('/countmodel', methods=['GET'])
def get_countmodel_data():
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            brand,model,
            COUNT(*) AS total_model,
            SUM(CASE WHEN status_stock = 'in stock' THEN 1 ELSE 0 END) AS in_stock,
            SUM(CASE WHEN status_stock = 'sold out' THEN 1 ELSE 0 END) AS sold_out
        FROM 
            equipment 
        GROUP BY 
            model
    """)
    countmodel_records = cursor.fetchall()
    cursor.close()
    return jsonify(countmodel_records)

# Read (อ่านข้อมูลจาก brand)
@app.route('/searchbrand/<brand>', methods=['GET'])
def get_countmodelall_data_by_brand(brand):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            *
        FROM 
            equipment 
        WHERE
            brand LIKE %s
        
    """, ('%' + brand + '%',))
    countmodel_records = cursor.fetchall()
    cursor.close()
    return jsonify(countmodel_records)

# Read (อ่านข้อมูลจาก model)
@app.route('/searchmodel/<model>', methods=['GET'])
def get_data_by_model(model):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            *
        FROM 
            equipment 
        WHERE
            model LIKE %s
        
    """, ('%' + model + '%',))
    countmodel_records = cursor.fetchall()
    cursor.close()
    return jsonify(countmodel_records)


# Read (อ่านข้อมูลจาก proid แสดง proid, brand, model นำไปใช้กรอกข้อมูลตอน add data)
@app.route('/createbyproid/<proid>', methods=['GET'])
def get_create_by_proid(proid):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            proid, brand, model
        FROM 
            equipment 
        WHERE
            proid = %s
        LIMIT 1
        
    """, (proid,))
    createbyproid_records = cursor.fetchall()
    cursor.close()
    return jsonify(createbyproid_records)


# Read (อ่านข้อมูลจาก project)
@app.route('/searchproject/<project>', methods=['GET'])
def get_search_data_by_project(project):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            *
        FROM 
            equipment 
        WHERE
            project LIKE  %s
        
    """, ('%' + project + '%',))
    search_records = cursor.fetchall()
    cursor.close()
    return jsonify(search_records)

# Read (อ่านข้อมูลจาก serail)
@app.route('/searchserial/<serial>', methods=['GET'])
def get_search_data_by_serial(serial):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            *
        FROM 
            equipment 
        WHERE
            serial LIKE %s
        
    """, ('%' + serial + '%',))
    search_records = cursor.fetchall()
    cursor.close()
    return jsonify(search_records)

# Read (อ่านข้อมูลจาก proid)
@app.route('/searchproid/<proid>', methods=['GET'])
def get_search_data_by_proid(proid):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            *
        FROM 
            equipment 
        WHERE
            proid = %s
        
    """, (proid,))
    search_records = cursor.fetchall()
    cursor.close()
    return jsonify(search_records)

# Read (อ่านข้อมูลจาก proid แบบ limit)
@app.route('/searchproid/<proid>/<int:limit>', methods=['GET'])
def get_search_data_by_proid_limit(proid,limit):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            *
        FROM 
            equipment 
        WHERE
            proid = %s AND status_stock = 'in stock'
        LIMIT %s
    """, (proid,limit))
    search_records = cursor.fetchall()
    cursor.close()
    return jsonify(search_records)

# Read (อ่านข้อมูลจาก brand)
@app.route('/countmodel/<brand>', methods=['GET'])
def get_countmodel_data_by_brand(brand):
    cursor = connection.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            brand,model,
            COUNT(*) AS total_model,
            SUM(CASE WHEN status_stock = 'in stock' THEN 1 ELSE 0 END) AS in_stock,
            SUM(CASE WHEN status_stock = 'sold out' THEN 1 ELSE 0 END) AS sold_out
        FROM 
            equipment 
        WHERE
            brand LIKE  %s
        GROUP BY 
            model
    """, ('%' + brand + '%',))
    countmodel_records = cursor.fetchall()
    cursor.close()
    return jsonify(countmodel_records)

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
    query = "UPDATE equipment SET proid=%s, serial=%s, mac=%s, status_stock=%s, into_stock=%s, out_stock=%s, price=%s, brand=%s, model=%s, project=%s, purchase=%s WHERE id=%s"
    cursor.execute(query, (data['proid'], data['serial'], data['mac'], data['status_stock'], data['into_stock'], data['out_stock'], data['price'], data['brand'], data['model'], data['project'], data['purchase'], id))
    connection.commit()
    cursor.close()
    return 'Data updated successfully', 200, {'Access-Control-Allow-Origin':url_api + ':3000'}

# Update (อัปเดตข้อมูลสำหรับหลาย ID)
@app.route('/managestock', methods=['PUT'])
def update_managestock():
    data = request.json  # รับข้อมูลที่ส่งมาจากแอปพลิเคชัน

    # วน loop เพื่ออัปเดตข้อมูลสำหรับแต่ละ ID
    for item_data in data:
        cursor = connection.cursor()
        query = "UPDATE equipment SET project=%s, out_stock=%s, status_stock=%s WHERE id=%s"
        cursor.execute(query, (item_data['project'], item_data['out_stock'], item_data['status_stock'], item_data['id']))
        connection.commit()
        cursor.close()

    return 'Data updated successfully', 200, {'Access-Control-Allow-Origin': url_api + ':3000'}



# Delete (ลบข้อมูล)
@app.route('/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    cursor = connection.cursor()
    query = "DELETE FROM equipment WHERE id=%s"
    cursor.execute(query, (id,))
    connection.commit()
    cursor.close()
    return 'Data deleted successfully', 200, {'Access-Control-Allow-Origin': url_api + ':3000'}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


# ปิดการเชื่อมต่อ
connection.close()
