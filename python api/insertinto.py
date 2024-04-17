import mysql.connector
import json

# เชื่อมต่อกับ MySQL Server
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)

if connection.is_connected():
    print("เชื่อมต่อกับ MySQL Server สำเร็จ")

    # สร้าง Cursor object
    cursor = connection.cursor()

    # JSON object ที่ต้องการเพิ่มข้อมูลเข้าฐานข้อมูล
    data_to_insert = [
        {"proid": "8859206718224", "brand": "LINK", "model": "UFP962D31-03"},
        {"proid": "8859206714639", "brand": "LINK", "model": "UF-2200"},
        {"proid": "8859206714592", "brand": "LINK", "model": "UF-2166SM"},
        {"proid": "8859206714400", "brand": "LINK", "model": "UF-2012A"},
        {"proid": "8859206718026", "brand": "LINK", "model": "UFP960S01-1.5"},
        {"proid": "8859206752921", "brand": "LINK", "model": "UT-9114WD-20"},
        {"proid": "6971693270411", "brand": "Reyee", "model": "RG-ES218GC-P"},
        {"proid": "6971693278172", "brand": "Reyee", "model": "RG-NBS3100-24GT4SFP-P"},
        {"proid": "810084691090", "brand": "UniFi", "model": "U6+"}
    ]

    # วนลูปผ่าน JSON object และเพิ่มข้อมูลลงในฐานข้อมูล
    for item in data_to_insert:
        sql = "INSERT INTO ribraly (proid, brand, model) VALUES (%s, %s, %s)"
        val = (item["proid"], item["brand"], item["model"])
        cursor.execute(sql, val)

    # ทำการยืนยันการเปลี่ยนแปลงในฐานข้อมูล
    connection.commit()

    print("เพิ่มข้อมูลเรียบร้อยแล้ว")

    # ปิด Cursor object และเชื่อมต่อกับฐานข้อมูล
    cursor.close()
    connection.close()
    print("ปิดการเชื่อมต่อกับ MySQL Server")

else:
    print("การเชื่อมต่อกับ MySQL Server ไม่สำเร็จ")
