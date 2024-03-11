from estdsogoods_private.SQL import edsg_mysql

# host = "192.168.114.107"
host = "localhost"
port = "8080"
user = "admin"
password = "XfQyy.ShnWguwQ(i"

sql = edsg_mysql(host,user,password)
check = sql.edsg_connect_mysql()
if check != False:
    print("Login ok!")
else:
    print("can not login")