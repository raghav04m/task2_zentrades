const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const dataFolderPath = path.join(__dirname, 'data');
const productsFilePath = path.join(dataFolderPath, 'products.json');

const readOrCreateProductsFile = () => {
    if (!fs.existsSync(dataFolderPath)) {
        fs.mkdirSync(dataFolderPath);
    }

    if (!fs.existsSync(productsFilePath)) {
        fs.writeFileSync(productsFilePath, JSON.stringify({ products: {} }));
    }

    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeProductsToFile = (data) => {
    fs.writeFileSync(productsFilePath, JSON.stringify(data));
};

const fetchData = async () => {
    try {
        const localData = readOrCreateProductsFile();

        if (Object.keys(localData.products).length === 0) {
            const response = await fetch('https://s3.amazonaws.com/open-to-cors/assignment.json');
            const apiData = await response.json();

            localData.products = apiData.products;
            writeProductsToFile(localData);
        }

        return localData.products;
    } catch (error) {
        console.error('Error fetching or reading data:', error.message);
        throw error;
    }
};

module.exports = fetchData;
