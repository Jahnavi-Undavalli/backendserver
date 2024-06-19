import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;
const DB_FILE = 'db.json';

app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.send(true);
});


interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}


app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time }: Submission = req.body;
    
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
      return res.status(400).send('All fields are required');
    }
  
    const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };
  
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    data.submissions.push(newSubmission);
  
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  
    res.status(201).send('Submission saved');
  });



  app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);
  
    if (isNaN(index) || index < 0) {
      return res.status(400).send('Invalid index');
    }
  
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  
    if (index >= data.submissions.length) {
      return res.status(404).send('Submission not found');
    }
  
    res.json(data.submissions[index]);
  });


  
app.put('/update', (req, res) => {
    const updatedSubmission = req.body as Submission; 

   
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

    
    const indexToUpdate = data.submissions.findIndex((sub: Submission) => sub.email === updatedSubmission.email);

    if (indexToUpdate === -1) {
        return res.status(404).send('Submission not found');
    }

    
    data.submissions[indexToUpdate] = updatedSubmission;

    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

    res.status(200).send('Submission updated successfully');
});




let submissions: Submission[] = [];

app.delete('/delete', (req, res) => {
    const index = req.query.index as string; 

    try {
        const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
        submissions = data.submissions;
        const submissionIndex = parseInt(index, 10);
        if (isNaN(submissionIndex) || submissionIndex < 0 || submissionIndex >= submissions.length) {
            return res.status(400).json({ message: 'Invalid index provided' });
        }

        submissions.splice(submissionIndex, 1);

        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

        res.json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting submission:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
