import subprocess

# ระบุข้อมูลการเชื่อมต่อ MySQL
db_user = 'root'
db_name = 'networkequipment'
db_password = 'your_password'

# ระบุชื่อไฟล์ SQL ที่ต้องการสร้าง
output_file = 'testnetworkequipment.sql'

# รันคำสั่ง mysqldump เพื่อ export ข้อมูลเป็นไฟล์ SQL
command = f"mysqldump -u {db_user} -p{db_password} {db_name} > {output_file}"
try:
    subprocess.run(command, shell=True, check=True)
    print(f"Exported data from database '{db_name}' to SQL file '{output_file}' successfully.")
except subprocess.CalledProcessError as e:
    print(f"An error occurred: {e}")
