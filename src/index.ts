import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(morgan('combined'));

const dbFilePath = path.join(__dirname, 'db.json');

// Helper function to read the database
const readDatabase = (): any[] => {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
};

// Helper function to write to the database
const writeDatabase = (data: any[]): void => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// /ping endpoint
app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
});

// /submit endpoint
app.post('/submit', (req: Request, res: Response) => {
    const { Name, Email, Phone, Github_Link, Stopwatch_Time } = req.body;

    if (!Name || !Email || !Phone || !Github_Link || !Stopwatch_Time) {
        console.log('Missing required fields');
        return res.status(400).send('Missing required fields');
        
    }

    const newSubmission = { Name, Email, Phone, Github_Link, Stopwatch_Time };
    const submissions = readDatabase();
    submissions.push(newSubmission);
    writeDatabase(submissions);

    res.status(200).send('Submission saved successfully');
});

//DELETE ENDPOINT
app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file');
            return;
        }
        let submissions = JSON.parse(data);
        if (index >= 0 && index < submissions.length) {
            submissions.splice(index, 1);
            fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing to database file');
                    return;
                }
                res.status(200).send('Submission deleted');
            });
        } else {
            res.status(404).send('Submission not found');
        }
    });
});

//EDIT ENDPOINT
app.put('/edit', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    const { Name, Email, Phone, Github_Link, Stopwatch_Time } = req.body;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file');
            return;
        }
        let submissions = JSON.parse(data);
        if (index >= 0 && index < submissions.length) {
            submissions[index] = { Name, Email, Phone, Github_Link, Stopwatch_Time };
            fs.writeFile(dbFilePath, JSON.stringify(submissions, null, 2), (err) => {
                if (err) {
                    res.status(500).send('Error writing to database file');
                    return;
                }
                res.status(200).send('Submission edited');
            });
        } else {
            res.status(404).send('Submission not found');
        }
    });
});

app.get('/search', (req, res) => {
    let email = req.query.email as string;
    email = email.trim();  // Trim any unexpected whitespace or newline characters

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database file');
            return;
        }
        try {
            const submissions = JSON.parse(data);

            const result = submissions.filter((submission: { Email: string }) => {
                return submission.Email.toLowerCase() === email.toLowerCase();
            });

            if (result.length > 0) {
                res.json(result);
            } else {
                res.status(404).send('No submissions found with that email');
            }
        } catch (parseError) {
            res.status(500).send('Error parsing database file');
        }
    });
});

// /read endpoint
app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);

    if (isNaN(index)) {
        return res.status(400).send('Invalid index');
    }

    const submissions = readDatabase();
    if (index < 0 || index >= submissions.length) {
        return res.status(404).send('Submission not found');
    }

    res.status(200).json(submissions[index]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
