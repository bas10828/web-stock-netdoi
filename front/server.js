const express = require('express');
const cors = require('cors');  // เพิ่มการ import โมดูล cors
const app = express();
const path = require('path');

// ใช้ cors middleware เพื่ออนุญาตการเข้าถึงจากโดเมนอื่น
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Serve static files from the 'front' directory
app.use(express.static(path.join(__dirname, 'front')));

// Serve index.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'index.html'));
});

// Serve script.js
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname,  'script.js'), { 'Content-Type': 'application/javascript' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
