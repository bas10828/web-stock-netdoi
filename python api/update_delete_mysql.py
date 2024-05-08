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
sql = "UPDATE `equipment` SET model = 'UFP920S01-1.5' WHERE model = 'AUFP920S01-1.5';"

# ดำเนินการลบข้อมูลในฐานข้อมูล
cursor.execute(sql)

# ยืนยันการเปลี่ยนแปลง
connection.commit()

# ปิดการเชื่อมต่อ
connection.close()
