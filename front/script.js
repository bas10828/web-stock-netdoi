document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById('tableBody');

    fetch('http://192.168.114.134:5000/data')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log data to console for debugging
            
            // Loop through each item in the data array and create a table row for it
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.brand}</td>
                    <td>${item.model}</td>
                    <td>${item.price}</td>
                    <td>${item.serial}</td>
                    <td>${item.project ? item.project : ''}</td>
                    <td>${item.lot_stock}</td>
                    <td>${item.status_stock}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
