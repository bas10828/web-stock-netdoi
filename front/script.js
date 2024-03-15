document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById('tableBody');

    fetch('http://192.168.114.134:5000/data')
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
        row.id = `row-${item.id}`; // Add id to the row
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
        `;
        tableBody.appendChild(row);
    }

    // Add event listener for the "Delete" buttons
    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteBtn')) {
            const id = event.target.closest('tr').id.split('-')[1];
            deleteData(id);
        }
    });

    // Function to delete data
    function deleteData(id) {
        if (confirm('Are you sure you want to delete this data?')) {
            fetch(`http://192.168.114.134:5000/data/${id}`, {
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

});
