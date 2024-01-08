const express = require('express');
const path = require('path');
const fetchData = require('./script');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    try {
        const products = await fetchData();
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
