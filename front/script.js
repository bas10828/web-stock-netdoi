const url_api = 'http://192.168.114.134'

// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function closesearchByBrand() {
    document.getElementById('searchBrand').style.display = 'none'; // Hide search input field
    document.getElementById('searchBrandall').style.display = 'none'; // Hide search input field
}

// หาจำนวนของ brand
function searchByBrand() {

    const brandInput = document.getElementById('brandInput').value.trim(); // รับค่า brand และลบช่องว่างที่อยู่ด้านหน้าและด้านหลัง
    if (brandInput !== '') { // ตรวจสอบว่าค่า brand ไม่เป็นค่าว่าง
        fetch(`${url_api}:5000/countmodel/${brandInput}`) // เรียกใช้ API สำหรับการค้นหาจำนวน model โดยใส่ brandInput เป็นพารามิเตอร์
            .then(response => response.json())
            .then(data => {
                // Clear the table
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = '';

                // Set table header
                const tableHead = document.querySelector('thead tr');
                tableHead.innerHTML = `
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Total Model</th>
                    <th>In Stock</th>
                    <th>Sold Out</th>
                `;

                // Loop through each item in the data array and create a table row for it
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.brand}</td>
                        <td>${item.model}</td>
                        <td>${item.total_model}</td>
                        <td>${item.in_stock}</td>
                        <td>${item.sold_out}</td>                       
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Please try again.');
            });
    } else {
        alert('Please enter a brand name');
    }
}

function searchByBrandall() {

    const brandInput = document.getElementById('brandallInput').value.trim(); // รับค่า brand และลบช่องว่างที่อยู่ด้านหน้าและด้านหลัง
    if (brandInput !== '') { // ตรวจสอบว่าค่า brand ไม่เป็นค่าว่าง
        fetch(`${url_api}:5000/countmodelall/${brandInput}`) // เรียกใช้ API สำหรับการค้นหาจำนวน model โดยใส่ brandInput เป็นพารามิเตอร์
            .then(response => response.json())
            .then(data => {
                // Clear the table
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = '';

                // Set table header
                const tableHead = document.querySelector('thead tr');
                tableHead.innerHTML = `
                    <th>ID</th>
                    <th>product id</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>Serial</th>
                    <th>mac</th>
                    <th>Project</th>
                    <th>Lot Stock</th>
                    <th>Status Stock</th>
                    <th>Del</th>
                    <th>edit</th>
                `;

                // Loop through each item in the data array and create a table row for it
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.proid}</td>
                    <td>${item.brand}</td>
                    <td>${item.model}</td>
                    <td>${item.price}</td>
                    <td>${item.serial}</td>
                    <td>${item.mac}</td>
                    <td>${item.project ? item.project : ''}</td>
                    <td>${item.lot_stock}</td>
                    <td>${item.status_stock}</td>
                    <td><button class="deleteBtn">Delete</button></td>
                    <td><button class="updateBtn">Edit</button></td>                      
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Please try again.');
            });
    } else {
        alert('Please enter a brand name');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById('tableBody');
    const pageSelector = document.getElementById('pageSelector');
    const searchBrandDiv = document.getElementById('searchBrand'); // Add this line
    const searchBrandallDiv = document.getElementById('searchBrandall'); // Add this line


    fetch(`${url_api}:5000/instock`)
        .then(response => response.json())
        .then(data => {
            // Loop through each item in the data array and create a table row for it
            data.forEach(item => {
                appendTableRow(item);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to append a new row to the table
    function appendTableRow(item) {
        const row = document.createElement('tr');

        // Set id attribute for the row
        row.setAttribute('id', `row-${item.id}`);
        // or row.dataset.id = item.id;

        if (pageSelector.value === 'countmodel') {
            row.innerHTML = `
            <td>${item.brand}</td>
            <td>${item.model}</td>
            <td>${item.total_model}</td>
            <td>${item.in_stock}</td>
            <td>${item.sold_out}</td>
        `;
        } else {
            row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.proid}</td>
            <td>${item.brand}</td>
            <td>${item.model}</td>
            <td>${item.price}</td>
            <td>${item.serial}</td>
            <td>${item.mac}</td>
            <td>${item.project ? item.project : ''}</td>
            <td>${item.lot_stock}</td>
            <td>${item.status_stock}</td>
            <td><button class="deleteBtn">Delete</button></td>
            <td><button class="updateBtn">Edit</button></td>
        `;
        }
        tableBody.appendChild(row);
    }



    // Add event listener for the "Delete" and "edit" buttons
    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteBtn')) {
            const id = event.target.closest('tr').id.split('-')[1];
            console.log("id=", id)
            deleteData(id);
        } else if (event.target.classList.contains('updateBtn')) {
            const row = event.target.closest('tr');
            const rowData = {
                id: row.querySelector('td:nth-child(1)').textContent,
                proid: row.querySelector('td:nth-child(2)').textContent,
                brand: row.querySelector('td:nth-child(3)').textContent,
                model: row.querySelector('td:nth-child(4)').textContent,
                price: row.querySelector('td:nth-child(5)').textContent,
                serial: row.querySelector('td:nth-child(6)').textContent,
                mac: row.querySelector('td:nth-child(7)').textContent,
                project: row.querySelector('td:nth-child(8)').textContent,
                lot_stock: row.querySelector('td:nth-child(9)').textContent,
                status_stock: row.querySelector('td:nth-child(10)').textContent
            };

            // Store rowData in sessionStorage to pass to update.html
            sessionStorage.setItem('rowData', JSON.stringify(rowData));

            // Redirect to update.html with the id as parameter
            const id = rowData.id;
            // console.log(rowData)
            window.location.href = `${url_api}:3000/update/update.html?id=${id}`;
        }
    });

    // Function to delete data
    function deleteData(id) {
        console.log(id)
        if (confirm('Are you sure you want to delete this data?')) {
            fetch(`${url_api}:5000/data/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Remove the row from the table if deletion is successful
                        const row = document.getElementById(`row-${id}`);
                        row.parentNode.removeChild(row);
                    } else {
                        throw new Error('Failed to delete data');
                    }
                })
                .catch(error => {
                    console.error('Error deleting data:', error);
                    alert('Failed to delete data. Please try again.');
                });
        }
    }

    // Add event listener for the "Add Data" button
    const addDataBtn = document.getElementById('addDataBtn');
    addDataBtn.addEventListener('click', function () {
        // Redirect to create.html when "Add Data" button is clicked
        window.location.href = 'create/create.html';
    });


    // Add event listener for the page selector
    pageSelector.addEventListener('change', function () {
        const selectedPage = pageSelector.value;
        navigateToPage(selectedPage);
    });

    // Fetch data based on the selected option
    function navigateToPage(page) {
        let apiUrl;
        const tableHead = document.querySelector('thead tr');
        if (page === 'all') {
            apiUrl = `${url_api}:5000/data`;
            tableHead.innerHTML = `
                <th>ID</th>
                <th>product id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Serial</th>
                <th>mac</th>
                <th>Project</th>
                <th>Lot Stock</th>
                <th>Status Stock</th>
                <th>Del</th>
                <th>edit</th>
            `;
        } else if (page === 'instock') {
            apiUrl = `${url_api}:5000/instock`;
            tableHead.innerHTML = `
                <th>ID</th>
                <th>product id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Serial</th>
                <th>mac</th>
                <th>Project</th>
                <th>Lot Stock</th>
                <th>Status Stock</th>
                <th>Del</th>
                <th>edit</th>
            `;
        } else if (page === 'soldout') {
            apiUrl = `${url_api}:5000/soldout`;
            tableHead.innerHTML = `
                <th>ID</th>
                <th>product id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Serial</th>
                <th>mac</th>
                <th>Project</th>
                <th>Lot Stock</th>
                <th>Status Stock</th>
                <th>Del</th>
                <th>edit</th>
            `;
        } else if (page === 'countmodel') {
            apiUrl = `${url_api}:5000/countmodel`;
            tableHead.innerHTML = `
                <th>Brand</th>    
                <th>Model</th>
                <th>Total Model</th>
                <th>In Stock</th>
                <th>Sold Out</th>
            `;
        } else if (page === 'searchBrand') {
            searchBrandDiv.style.display = 'block'; // Show search input field            
            return; // Stop execution as we don't need to fetch data for search page
        } else if (page === 'searchBrandall') {
            searchBrandallDiv.style.display = 'block'; // Show search input field            
            return; // Stop execution as we don't need to fetch data for search page
        }

        // Fetch data based on the selected option
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Clear the table
                tableBody.innerHTML = '';
                // Loop through each item in the data array and create a table row for it
                data.forEach(item => {
                    appendTableRow(item);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    // Function to search data by brand name


    // Fetch initial data when the page loads
    navigateToPage('instock');

});