import pandas as pd
import pymysql

# อ่านข้อมูลจากไฟล์ Excel
df = pd.read_excel('test.xlsx')
print(df)
# เชื่อมต่อกับ MySQL Server
connection = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="networkequipment"
)

if connection:
    print("เชื่อมต่อกับ MySQL Server สำเร็จ")

    # สร้าง Cursor object
    cursor = connection.cursor()

    # สร้างคำสั่ง SQL สำหรับเพิ่มข้อมูล
    sql = "INSERT INTO equipment (proid, serial, mac,status_stock,lot_stock,price,brand,model,project ) VALUES (%s, %s, %s, %s,%s,%s,%s,%s,%s)"

    # วนลูปเพื่อเพิ่มข้อมูลจาก DataFrame
    for index, row in df.iterrows():
        values = tuple(row)  # แปลงแถวข้อมูลให้เป็น tuple
        cursor.execute(sql, values)  # ทำการ execute คำสั่ง SQL

    # commit การเปลี่ยนแปลงข้อมูลลงในฐานข้อมูล
    connection.commit()

    # ปิด Cursor object และเชื่อมต่อกับฐานข้อมูล
    cursor.close()
    connection.close()
    print("ปิดการเชื่อมต่อกับ MySQL Server")
else:
    print("การเชื่อมต่อกับ MySQL Server ไม่สำเร็จ")
