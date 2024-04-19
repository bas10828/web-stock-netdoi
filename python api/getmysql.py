import mysql.connector

# เชื่อมต่อกับ MySQL Server ที่ใช้ IP Address: 192.168.114.107 และพอร์ต 8080

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)



print(connection)

if connection.is_connected():
    print("เชื่อมต่อกับ MySQL Server สำเร็จ")

    # ดำเนินการกับฐานข้อมูล
    # ตัวอย่าง: สร้าง Cursor object
    cursor = connection.cursor()

    # ตัวอย่าง: ดึงข้อมูลจากตาราง
    cursor.execute("SELECT * FROM ribraly")

    records = cursor.fetchall()
    for row in records:
        print(row)

    # ปิด Cursor object และเชื่อมต่อกับฐานข้อมูล
    cursor.close()
    connection.close()
    print("ปิดการเชื่อมต่อกับ MySQL Server")

else:
    print("การเชื่อมต่อกับ MySQL Server ไม่สำเร็จ")

