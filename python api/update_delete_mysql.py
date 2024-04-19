#update delete
import mysql.connector

# เชื่อมต่อกับ MySQL Server
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)

if connection.is_connected():
    print("เชื่อมต่อกับ MySQL Server สำเร็จ")

# สร้าง cursor object
cursor = connection.cursor()

# คำสั่ง SQL สำหรับลบข้อมูล
sql_delete = "UPDATE `equipment` SET price = 1551.5 WHERE id IN (279, 280);"

# ดำเนินการลบข้อมูลในฐานข้อมูล
cursor.execute(sql_delete)

# ยืนยันการเปลี่ยนแปลง
connection.commit()

# ปิดการเชื่อมต่อ
connection.close()
