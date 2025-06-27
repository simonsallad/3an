import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    res.sendStatus(200);


});

app.post('/', async (req, res) => {
    const playerEntries = Object.values(req.body.gameStats);

    try {
        for (const entry of playerEntries) {
            const insertName = entry.name;
            const insertScore = entry.score;
            const currentDate = new Date();

            await pool.query(`
                INSERT INTO scoreboard (name, score, created_at)
                VALUES ($1, $2, $3)
            `, [insertName, insertScore, currentDate]);
        }

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/get-score', async (req, res) => {
    try {
        const getScores = await pool.query(`SELECT score, name FROM scoreboard WHERE score = (SELECT MAX(score) FROM scoreboard)`)
        console.log(getScores.rows[0].name); // Name of player
        console.log(getScores.rows[0].score); // Highscore
        res.status(200).sendFile(__dirname + '/public/index.html'); 
    } catch (err) {
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
