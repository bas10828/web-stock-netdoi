document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById('tableBody');

    fetch('http://127.0.0.1:5000/data')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log data to console for debugging

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
        `;
        tableBody.appendChild(row);
    }

    // Add event listener for the "Add Data" button
    const addDataBtn = document.getElementById('addDataBtn');
    addDataBtn.addEventListener('click', function () {
        // Redirect to create.html when "Add Data" button is clicked
        window.location.href = 'create/create.html';
    });


});
