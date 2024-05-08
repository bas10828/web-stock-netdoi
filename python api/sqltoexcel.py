import mysql.connector
import pandas as pd

# เชื่อมต่อกับ MySQL Server ที่ใช้ IP Address: 192.168.114.107 และพอร์ต 8080

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)

# connection = mysql.connector.connect(
#     host="192.168.114.107",
#     # host="localhost",
#     port="80",
#     user="admin",
#     password="admin",
#     # database="networkequipment"
# )

print(connection)

if connection.is_connected():
    print("เชื่อมต่อกับ MySQL Server สำเร็จ")

    # ดำเนินการกับฐานข้อมูล
    # ตัวอย่าง: สร้าง Cursor object
    cursor = connection.cursor()

    # ตัวอย่าง: ดึงข้อมูลจากตาราง
    cursor.execute("SELECT * FROM `equipment` WHERE project='โรงเรียนปงรัชดาภิเษก'")
    records = cursor.fetchall()
    for row in records:
        print(row)

    # สร้าง DataFrame จากข้อมูลที่ได้รับ
    df = pd.DataFrame(records, columns=cursor.column_names)

    # ปิด Cursor object และเชื่อมต่อกับฐานข้อมูล
    cursor.close()
    connection.close()
    print("ปิดการเชื่อมต่อกับ MySQL Server")

     # สร้างไฟล์ Excel
    df.to_excel('โรงเรียนปงรัชดาภิเษก.xlsx', index=False)
    print("สร้างไฟล์ Excel สำเร็จ")

else:
    print("การเชื่อมต่อกับ MySQL Server ไม่สำเร็จ")

