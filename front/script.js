console.log("API URL:", window.apiUrl);
// const url_api = 'http://192.168.114.136'
const url_api = window.apiUrl

// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function closesearch() {
    document.getElementById('searchBrand').style.display = 'none'; // Hide search input field
    document.getElementById('searchBrandall').style.display = 'none'; // Hide search input field
    document.getElementById('searchProject').style.display = 'none'; // Hide search input field
}

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
                    if (row && row.parentNode) { // Check if row exists and has parent node
                        row.parentNode.removeChild(row);
                    }
                    // Reload the page to update the table
                    location.reload();
                } else {
                    throw new Error('Failed to delete data');
                }
            })
            .catch(error => {
                console.error('Error deleting data:', error);
                if (error.message.includes('Not Found')) {
                    alert('Data not found. It might have already been deleted.');
                } else {
                    alert('Failed to delete data. Please try again.');
                }
            });
    }
}

// หาอุปกรณ์ทั้งหมดของ project
function searchByProject() {
    const projectInput = document.getElementById('projectInput').value.trim();
    console.log(projectInput)
    if (projectInput !== '') {
        fetch(`${url_api}:5000/searchproject/${projectInput}`)
            .then(response => response.json())
            .then(data => {
                // Clear the table
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = '';

                // Set table header
                const tableHead = document.querySelector('thead tr');
                tableHead.innerHTML = `
                    <th>Toggle</th>
                    <th>ID</th>
                    <th>product id</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>Serial</th>
                    <th>mac</th>
                    <th>Project</th>
                    <th>In Stock</th>
                    <th>Sale Out</th>
                    <th>Status Stock</th>
                    <th>Delete</th>
                    <th>Edit</th>
                `;

                // Loop through each item in the data array and create a table row for it
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><button class="toggleBtn" data-row-id="${item.id}"></button></td>
                        <td>${item.id}</td>
                        <td>${item.proid}</td>
                        <td>${item.brand}</td>
                        <td>${item.model}</td>
                        <td>${item.price}</td>
                        <td>${item.serial}</td>
                        <td>${item.mac}</td>
                        <td>${item.project ? item.project : ''}</td>
                        <td>${item.into_stock}</td>
                        <td>${item.out_stock}</td>
                        <td>${item.status_stock}</td>
                        <td><button class="deleteBtnIN" data-id-IN="${item.id}">Delete</button></td>
                        <td><button class="updateBtn">Edit</button></td>
                    `;
                    tableBody.appendChild(row);
                });

                // Add event listener for the "Delete" button in searchByBrandall function
                tableBody.addEventListener('click', function (event) {
                    if (event.target.classList.contains('deleteBtnIN')) {
                        const id = event.target.getAttribute('data-id-IN'); // Get the id from data-id attribute
                        deleteData(id);
                    }
                });

            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch data. Please try again.');
            });
    } else {
        alert('Please enter a project name');
    }
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

// Array to store IDs of selected rows
const selectedRowIds = [];


// Function to handle toggling of checkbox
function toggleCheckbox(event) {
    const button = event.target; // Get the clicked button
    const row = button.closest('tr'); // Find the closest table row to the clicked button
    console.log("console", row)

    if (row) {
        const id = row.querySelector('td:nth-child(2)').textContent; // Get the ID from the second column of the row

        if (row.classList.contains('selected')) {
            row.classList.remove('selected');
            button.textContent = ''; // Change button content to 'Toggle' when unchecked

            // Remove the ID from the selectedRowIds array
            const index = selectedRowIds.indexOf(id);
            if (index !== -1) {
                selectedRowIds.splice(index, 1);
            }
        } else {
            row.classList.add('selected');
            button.textContent = '✓'; // Change button content to checkmark when checked

            // Add the ID to the selectedRowIds array
            selectedRowIds.push(id);
        }
    } else {
        console.error('Error: Unable to find table row');
    }

    console.log("Selected Row IDs:", selectedRowIds);
}

//หา brand ทั้งหมดตามข้อมูลที่ป้อน
function searchByBrandall() {
    const brandInput = document.getElementById('brandallInput').value.trim();
    if (brandInput !== '') {
        fetch(`${url_api}:5000/countmodelall/${brandInput}`)
            .then(response => response.json())
            .then(data => {
                // Clear the table
                const tableBody = document.getElementById('tableBody');
                tableBody.innerHTML = '';

                // Set table header
                const tableHead = document.querySelector('thead tr');
                tableHead.innerHTML = `
                    <th>Toggle</th>
                    <th>ID</th>
                    <th>product id</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>Serial</th>
                    <th>mac</th>
                    <th>Project</th>
                    <th>In Stock</th>
                    <th>Sale Out</th>
                    <th>Status Stock</th>
                    <th>Delete</th>
                    <th>Edit</th>
                `;

                // Loop through each item in the data array and create a table row for it
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><button class="toggleBtn" data-row-id="${item.id}"></button></td>
                        <td>${item.id}</td>
                        <td>${item.proid}</td>
                        <td>${item.brand}</td>
                        <td>${item.model}</td>
                        <td>${item.price}</td>
                        <td>${item.serial}</td>
                        <td>${item.mac}</td>
                        <td>${item.project ? item.project : ''}</td>
                        <td>${item.into_stock}</td>
                        <td>${item.out_stock}</td>
                        <td>${item.status_stock}</td>
                        <td><button class="deleteBtnIN" data-id-IN="${item.id}">Delete</button></td>
                        <td><button class="updateBtn">Edit</button></td>
                    `;
                    tableBody.appendChild(row);
                });



                // Add event listener for the "Delete" button in searchByBrandall function
                tableBody.addEventListener('click', function (event) {
                    if (event.target.classList.contains('deleteBtnIN')) {
                        const id = event.target.getAttribute('data-id-IN'); // Get the id from data-id attribute
                        deleteData(id);
                    }
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
    const searchprojectDiv = document.getElementById('searchProject');

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
            <td><button class="toggleBtn" data-row-id="${item.id}"></button></td>
            <td>${item.id}</td>
            <td>${item.proid}</td>
            <td>${item.brand}</td>
            <td>${item.model}</td>
            <td>${item.price}</td>
            <td>${item.serial}</td>
            <td>${item.mac}</td>
            <td>${item.project ? item.project : ''}</td>
            <td>${item.into_stock}</td>
            <td>${item.out_stock}</td>
            <td>${item.status_stock}</td>
            <td><button class="deleteBtn">Delete</button></td>
            <td><button class="updateBtn">Edit</button></td>
        `;
        }
        tableBody.appendChild(row);
    }

    // Add event listener for the "Toggle" button in searchByBrandall function
    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('toggleBtn')) {
            // console.log("toggle")
            toggleCheckbox(event);

        }
    });

    // Add event listener for the "Delete" and "edit" buttons
    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteBtn')) {
            const id = event.target.closest('tr').id.split('-')[1];
            console.log("id=", id)
            deleteData(id);
        } if (event.target.classList.contains('updateBtn')) {
            const row = event.target.closest('tr');
            const rowData = {
                id: row.querySelector('td:nth-child(2)').textContent,
                proid: row.querySelector('td:nth-child(3)').textContent,
                brand: row.querySelector('td:nth-child(4)').textContent,
                model: row.querySelector('td:nth-child(5)').textContent,
                price: row.querySelector('td:nth-child(6)').textContent,
                serial: row.querySelector('td:nth-child(7)').textContent,
                mac: row.querySelector('td:nth-child(8)').textContent,
                project: row.querySelector('td:nth-child(9)').textContent,
                into_stock: row.querySelector('td:nth-child(10)').textContent,
                out_stock: row.querySelector('td:nth-child(11)').textContent,
                status_stock: row.querySelector('td:nth-child(12)').textContent
            };

            // Store rowData in sessionStorage to pass to update.html
            sessionStorage.setItem('rowData', JSON.stringify(rowData));

            // Redirect to update.html with the id as parameter
            const id = rowData.id;
            // console.log(rowData)
            window.location.href = `${url_api}:3000/update/update.html?id=${id}`;
        }
    });



    // Add event listener for the "Add Data" button
    const addDataBtn = document.getElementById('addDataBtn');
    addDataBtn.addEventListener('click', function () {
        // Redirect to create.html when "Add Data" button is clicked
        window.location.href = 'create/create.html';
    });

    // Add event listener for the "Add Data Dynamic" button
    const addDatadynaminBtn = document.getElementById('addDatadynaminBtn');
    addDatadynaminBtn.addEventListener('click', function () {
        // Redirect to create.html when "Add Data" button is clicked
        window.location.href = 'create/create_dynamic.html';
    });

    // Add event listener for the "Add Data Dynamic" button
    const managestockBtn = document.getElementById('managestockBtn');
    managestockBtn.addEventListener('click', function () {
        // Redirect to create.html when "Add Data" button is clicked
        sessionStorage.setItem('selectedRowIds', JSON.stringify(selectedRowIds));
        window.location.href = 'manage_stock/manage.html';
    });


    // Add event listener for the page selector
    pageSelector.addEventListener('change', function () {
        const selectedPage = pageSelector.value;
        navigateToPage(selectedPage);
    });

    // Fetch data based on the selected option
    function navigateToPage(page) {
        // Clear selectedRowIds array
        // selectedRowIds.length = 0;

        let apiUrl;
        const tableHead = document.querySelector('thead tr');
        if (page === 'all') {
            selectedRowIds.length = 0;
            apiUrl = `${url_api}:5000/data`;
            tableHead.innerHTML = `
                <th>Toggle</th>                
                <th>ID</th>
                <th>product id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Serial</th>
                <th>mac</th>
                <th>Project</th>
                <th>In Stock</th>
                <th>Sale Date</th>
                <th>Status Stock</th>
                <th>Del</th>
                <th>edit</th>
            `;
        } else if (page === 'instock') {
            selectedRowIds.length = 0;
            apiUrl = `${url_api}:5000/instock`;
            tableHead.innerHTML = `
                <th>Toggle</th>                
                <th>ID</th>
                <th>product id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Serial</th>
                <th>mac</th>
                <th>Project</th>
                <th>In Stock</th>
                <th>Sale Date</th>
                <th>Status Stock</th>
                <th>Del</th>
                <th>edit</th>
            `;
        } else if (page === 'soldout') {
            selectedRowIds.length = 0;
            apiUrl = `${url_api}:5000/soldout`;
            tableHead.innerHTML = `
                <th>Toggle</th>                
                <th>ID</th>
                <th>product id</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Serial</th>
                <th>mac</th>
                <th>Project</th>
                <th>in Stock</th>
                <th>Sale Date</th>
                <th>Status Stock</th>
                <th>Del</th>
                <th>edit</th>
            `;
        } else if (page === 'countmodel') {
            selectedRowIds.length = 0;
            apiUrl = `${url_api}:5000/countmodel`;
            tableHead.innerHTML = `
                <th>Brand</th>    
                <th>Model</th>
                <th>Total Model</th>
                <th>In Stock</th>
                <th>Sold Out</th>
            `;
        } else if (page === 'searchBrand') {
            selectedRowIds.length = 0;

            document.getElementById('searchBrandall').style.display = 'none'; // Hide search input field
            document.getElementById('searchProject').style.display = 'none'; // Hide search input field

            searchBrandDiv.style.display = 'block'; // Show search input field            
            return; // Stop execution as we don't need to fetch data for search page
        } else if (page === 'searchBrandall') {
            selectedRowIds.length = 0;

            document.getElementById('searchBrand').style.display = 'none'; // Hide search input field
            document.getElementById('searchProject').style.display = 'none'; // Hide search input field

            searchBrandallDiv.style.display = 'block'; // Show search input field            
            return; // Stop execution as we don't need to fetch data for search page
        }
        else if (page === 'searchProject') {
            selectedRowIds.length = 0;

            document.getElementById('searchBrand').style.display = 'none'; // Hide search input field
            document.getElementById('searchBrandall').style.display = 'none'; // Hide search input field

            searchprojectDiv.style.display = 'block'; // Show search input field            
            return; // Stop execution as we don't need to fetch data for search page
        }
        else if (page === '') {
            selectedRowIds.length = 0;
            document.getElementById('searchBrand').style.display = 'none'; // Hide search input field
            document.getElementById('searchBrandall').style.display = 'none'; // Hide search input field
            document.getElementById('searchProject').style.display = 'none'; // Hide search input field
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