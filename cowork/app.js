const express =require('express');

const app = express();

const members = require('./members');

// if there is a json data in request's body, this middleware will set property of request body with json 
app.use(express.json());

// ...?query=value;
app.get('/api/members', (req, res) => {
    //const team = req.query.team;
    const { team } = req.query;
    
    if ( team ) {
        const teamMembers = members.filter((e) => e.team === team);
        res.send(teamMembers);
    } else {
        res.send(members);;
    }
});

// /:value
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

app.post('/api/members', (req, res) => {
    const newMember = req.body;
    members.push(newMember);
    res.send(newMember);
    console.log(req.body);
  });


app.listen(3000, () => {
    console.log('Server is running...');
});