// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql'); 
// Create an instance of Express app
const app = express();

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());
const connection = mysql.createConnection({
    host: 'MacBook-Air', // Change this to your MySQL host
    user: 'root', // Change this to your MySQL username
    password: 'Pr@vallu123', // Change this to your MySQL password
    database: 'PortfolioDB' // Change this to your MySQL database name
});

// Define your endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { fullname, email, message } = req.body;

    connection.query('INSERT INTO form_submissions (fullname, email, message) VALUES (?, ?, ?)', [fullname, email, message], (error, results) => {
        if (error) {
            console.error('Error submitting form:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Form submitted successfully' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
