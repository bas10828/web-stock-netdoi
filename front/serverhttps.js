const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const app = express();
const path = require('path');

// ใช้ cors middleware เพื่ออนุญาตการเข้าถึงจากโดเมนอื่น
app.use(cors());

// Serve static files from the 'front' directory
app.use(express.static(path.join(__dirname, 'front')));

// Serve index.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve script.js
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'), { 'Content-Type': 'application/javascript' });
});

// Serve create.html
app.get('/create/create.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'create', 'create.html'));
});

// Serve create_dynamic.html
app.get('/create/create_dynamic.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'create', 'create_dynamic.html'));
});

// Serve manage.html
app.get('/manage_stock/manage.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'manage_stock', 'manage.html'));
});

// Serve exportexcel.html
app.get('/export_excel/exportexcel.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'export_excel', 'exportexcel.html'));
});

// Serve update.html
app.get('/update/update.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'update', 'update.html'));
});

// อ่าน SSL certificate และ private key
const privateKey = fs.readFileSync('your-private-key.pem', 'utf8');
const certificate = fs.readFileSync('your-certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// สร้างเซิร์ฟเวอร์ HTTPS โดยใช้ IP และ Port ของคุณ
const PORT = 3000;
const HOST = '192.168.114.153'; // แทนที่ด้วย IP address ของคุณ
const httpsServer = https.createServer(credentials, app);

// เริ่มเซิร์ฟเวอร์ HTTPS
httpsServer.listen(PORT, HOST, () => {
    console.log(`Server is running on https://${HOST}:${PORT}`);
});
