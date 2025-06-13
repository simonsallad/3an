import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
    console.log(`Body: ${req.body}`);
    res.status(200);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
