const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = {
    'user1': { password: 'password1', checklist: [] }
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        res.json({ success: true, checklist: users[username].checklist });
    } else {
        res.json({ success: false });
    }
});

app.post('/save', (req, res) => {
    const { username, items } = req.body;
    if (users[username]) {
        users[username].checklist = items;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
