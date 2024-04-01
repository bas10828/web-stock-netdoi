const express = require('express');
const cors = require('cors');  // เพิ่มการ import โมดูล cors
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

// Serve update.html
app.get('/update/update.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'update', 'update.html'));
});

// // Serve globalVariables.json
// app.get('/globalVariables.json', (req, res) => {
//     res.sendFile(path.join(__dirname, 'globalVariables.json'));
// });

// // Serve .env
// app.get('/.env', (req, res) => {
//     res.sendFile(path.join(__dirname, '.env'));
// });




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
