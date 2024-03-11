import requests

# ข้อมูลที่ต้องการเพิ่ม
data = {
    "proid": "PRO123",
    "serial": "SER456",
    "mac": "MAC789",
    "status_stock": "in stock",
    "lot_stock": "LOT456",
    "price": 1000,
    "brand": "BrandX",
    "model": "ModelY",
    "project": "ProjectA"
}

# ทำการ POST ข้อมูลไปยังเส้นทาง URL '/data' ของแอปพลิเคชัน Flask
response = requests.post('http://192.168.114.107:5000/data', json=data)

# ตรวจสอบว่าสร้างข้อมูลสำเร็จหรือไม่
if response.status_code == 201:
    print('Data created successfully')
else:
    print('Failed to create data')
