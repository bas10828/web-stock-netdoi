import requests
import json

# เรียกใช้ API
response = requests.get('http://192.168.114.134:5000/data')

# ตรวจสอบสถานะของการเรียก API
if response.status_code == 200:
    # แปลงข้อมูล JSON เป็นโครงสร้างข้อมูล Python
    data = response.json()

    # เริ่มสร้าง HTML สำหรับตาราง
    html_table = '<table border="1">'
    html_table += '<tr><th>ID</th><th>Brand</th><th>Model</th><th>Price</th><th>Serial</th></tr>'

    # วนลูปเพื่อเพิ่มข้อมูลในตาราง
    for item in data:
        html_table += '<tr>'
        html_table += f'<td>{item["id"]}</td>'
        html_table += f'<td>{item["brand"]}</td>'
        html_table += f'<td>{item["model"]}</td>'
        html_table += f'<td>{item["price"]}</td>'
        html_table += f'<td>{item["serial"]}</td>'
        html_table += '</tr>'

    html_table += '</table>'

    # พิมพ์ HTML สำหรับตาราง
    print(html_table)
else:
    print('Error fetching data:', response.status_code)
