const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// Middleware to parse JSON request bodies
app.use(express.json());

// Example student data
const students = [
  { name: "Alice Johnson", total: 433 },
  { name: "Bob Smith", total: 410 },
  { name: "Charlie Brown", total: 395 },
  { name: "Diana Prince", total: 478 }
];

// Serve static files
app.use(express.static('static'));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API: Retrieve students above a threshold
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: "Invalid threshold. Please provide a numeric value." });
  }

  // Filter students whose total marks exceed the threshold
  const filteredStudents = students.filter(student => student.total > threshold);

  // Respond with the count and the filtered students
  res.json({
    count: filteredStudents.length,
    students: filteredStudents
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
