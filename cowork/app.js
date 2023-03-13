const express =require('express');

const app = express();

const members = require('./members');

app.get('/api/members', (req, res) => {
    res.send(members);
});

app.get('/api/members/:id', (req, res) => {
    // const id = req.params.id;
    const { id } = req.params;
    const member = members.find((e) => e.id === Number(id));

    if (member) {
        res.send(member);
    } else {
        // if there isn't member header's status : 404
        res.status(404).send({ message : 'There is no such member' });
    }
});

app.listen(3000, () => {
    console.log('Server is running...');
});