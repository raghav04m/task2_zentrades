document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the local products.json file in the data folder
    fetch('/data/products.json')
        .then(response => response.json())
        .then(data => {
            // Process and display the data
            displayProductTable(data.products);
            populateColumnOptions(Object.keys(data.products[Object.keys(data.products)[0]]));
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to display product table
function displayProductTable(products) {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    // Extract product data and create table rows
    Object.keys(products).forEach(productId => {
        const product = products[productId];
        const row = `<tr>
                        <td>${product.subcategory}</td>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                        <td>${product.popularity}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to populate column selection options
function populateColumnOptions(columnNames) {
    const availableFieldsSelect = document.getElementById('availableFields');
    const displayFieldsSelect = document.getElementById('displayFields');

    // Populate available fields select
    columnNames.forEach(columnName => {
        const option = document.createElement('option');
        option.value = columnName;
        option.text = columnName;
        availableFieldsSelect.add(option);
    });

    // Optional: Pre-select some columns
    ['Title', 'Price'].forEach(selectedColumn => {
        const option = availableFieldsSelect.querySelector(`option[value="${selectedColumn}"]`);
        availableFieldsSelect.remove(option);
        displayFieldsSelect.add(option);
    });
}

// Function to add selected fields to the display list
function addSelectedFields() {
    moveOptionsBetweenSelects('availableFields', 'displayFields');
}

// Function to remove selected fields from the display list
function removeSelectedFields() {
    moveOptionsBetweenSelects('displayFields', 'availableFields');
}

// Helper function to move selected options between two selects
function moveOptionsBetweenSelects(sourceId, destinationId) {
    const sourceSelect = document.getElementById(sourceId);
    const destinationSelect = document.getElementById(destinationId);

    Array.from(sourceSelect.selectedOptions).forEach(option => {
        sourceSelect.remove(option);
        destinationSelect.add(option);
    });
}
